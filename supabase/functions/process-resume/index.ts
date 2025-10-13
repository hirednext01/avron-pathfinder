import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// OpenAI DISABLED to avoid costs
// import OpenAI from "https://esm.sh/openai@4";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);
// const openai = new OpenAI({ apiKey: Deno.env.get("OPENAI_API_KEY")! });

export default async (req: Request) => {
  try {
    if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
    const { resume_id } = await req.json();
    if (!resume_id) return new Response(JSON.stringify({ error: "resume_id required" }), { status: 400 });

    const { data: resume, error: rErr } = await supabase.from("resumes").select("*").eq("id", resume_id).single();
    if (rErr || !resume) throw new Error("Resume not found");

    await supabase.from("resumes").update({ status: "processing", error: null }).eq("id", resume_id);

    // Download file from Storage
    const { data: file, error: fErr } = await supabase.storage.from("resumes").download(resume.file_path);
    if (fErr || !file) throw new Error("Unable to download resume file");

    // Convert to base64 so LLM can parse PDFs/DOCX too
    const buf = await file.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
    const mime = resume.mime_type || "application/octet-stream";
    const originalName = resume.original_filename || "resume";

    // MOCK DATA - OpenAI disabled to avoid costs
    const parsed: any = {
      summary: { title: "Professional", experience: "Multiple years" },
      skills: [
        { name: "JavaScript" },
        { name: "Python" },
        { name: "React" }
      ],
      gaps: [
        { skill: "sql", priority: "high" },
        { skill: "cloud architecture", priority: "medium" }
      ],
      trajectory: { direction: "growth" },
      market_value: { estimate: "competitive" }
    };

    // Fallbacks
    const gaps = Array.isArray(parsed.gaps) && parsed.gaps.length
      ? parsed.gaps
      : (Array.isArray(parsed.skills)
          ? parsed.skills.slice(0,3).map((s:any, i:number)=>({ skill: String(s.name||s).toLowerCase(), priority: i===0?'high':(i===1?'medium':'low') }))
          : [{ skill: "sql", priority: "high" },{ skill: "excel", priority: "medium" }]
        );

    // Write analysis + parsed_data
    await supabase.from("analysis_results").insert({
      resume_id,
      user_id: resume.user_id,
      summary: parsed.summary ?? null,
      gaps,
      trajectory: parsed.trajectory ?? null,
      market_value: parsed.market_value ?? null
    });

    await supabase.from("parsed_data").insert({
      resume_id,
      user_id: resume.user_id,
      skills: parsed.skills ?? null,
      entities: parsed.entities ?? null,
      projects: parsed.projects ?? null,
      raw_text: null
    });

    await supabase.from("resumes").update({ status: "ready" }).eq("id", resume_id);

    return new Response(JSON.stringify({ ok: true, gaps }), { status: 200 });
  } catch (e:any) {
    // mark failed so UI can show retry
    try { await supabase.from("resumes").update({ status: "failed", error: String(e.message||e) }).eq("id", (await req.json()).resume_id); } catch {}
    return new Response(JSON.stringify({ error: e.message || String(e) }), { status: 500 });
  }
};
