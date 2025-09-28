import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// Simple scoring knobs
const DAYS_WINDOW = 21; // only last 21 days
const SKILL_WEIGHT = 5;
const MODE_BOOST = 2;

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
    const { user_id, limit = 10, prefer_remote = true } = await req.json();
    if (!user_id) return new Response(JSON.stringify({ error: "user_id required" }), { status: 400 });

    // Get latest parsed skills for user
    const { data: parsed, error: pErr } = await supabase
      .from("parsed_data")
      .select("skills, created_at")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (pErr) throw pErr;

    const userSkills: string[] = Array.isArray(parsed?.skills)
      ? parsed!.skills.map((s: any) => (s.name ? String(s.name).toLowerCase() : String(s).toLowerCase()))
      : [];

    // Optional: read candidate location preference if you store it
    let preferLocation: string | null = null;
    const { data: prof } = await supabase
      .from("candidate_profiles")
      .select("preferred_location")
      .eq("user_id", user_id)
      .maybeSingle();
    preferLocation = prof?.preferred_location ?? null;

    // Fetch recent active jobs
    const since = new Date(Date.now() - DAYS_WINDOW * 24 * 3600 * 1000).toISOString();
    const { data: jobs, error: jErr } = await supabase
      .from("jobs_live")
      .select("*")
      .eq("is_active", true)
      .gte("posted_at", since)
      .order("posted_at", { ascending: false });
    if (jErr) throw jErr;

    // Score by skill overlap (+ optional boosts)
    const scored = (jobs ?? []).map((j: any) => {
      const jSkills: string[] = Array.isArray(j.skills) ? j.skills.map((s: any) => String(s).toLowerCase()) : [];
      const overlap = userSkills.filter(s => jSkills.includes(s));
      let score = overlap.length * SKILL_WEIGHT;

      if (prefer_remote && j.work_mode && String(j.work_mode).toLowerCase() === "remote") score += MODE_BOOST;
      if (preferLocation && j.location && j.location.toLowerCase().includes(preferLocation.toLowerCase())) score += MODE_BOOST;

      return { ...j, overlap, score };
    })
    .filter((x: any) => x.overlap.length > 0)   // require at least 1 skill match
    .sort((a: any, b: any) => b.score - a.score)
    .slice(0, limit);

    return new Response(JSON.stringify({ items: scored, userSkills }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
});
