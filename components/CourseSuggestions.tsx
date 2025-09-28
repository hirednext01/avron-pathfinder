"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
type Row={id:string;provider:string;title:string;link:string;skills_covered:any;overlap:string[];expected_gain:number;};
export default function CourseSuggestions(){
  const [rows,setRows]=useState<Row[]>([]),[loading,setLoading]=useState(true),[err,setErr]=useState<string|null>(null);
  useEffect(()=>{(async()=>{try{
    const {data:{user}}=await supabase.auth.getUser(); if(!user){setErr("Please sign in."); setLoading(false); return;}
    const {data,error}=await supabase.rpc("recommend_courses",{p_user_id:user.id,p_limit:5}); if(error) throw error; setRows(data||[]);
  }catch(e:any){setErr(e.message);}finally{setLoading(false);}})();},[]);
  if(loading) return <div className="mt-6">Finding best-fit courses…</div>;
  if(err) return <div className="mt-6 text-red-600">Error: {err}</div>;
  if(!rows.length) return <div className="mt-6">No course matches yet.</div>;
  return (<div className="mt-6 space-y-3">
    <h2 className="text-xl font-semibold">Recommended Courses (Employability Gain)</h2>
    {rows.map(c=>(
      <a key={c.id} href={c.link} target="_blank" rel="noreferrer" className="block border rounded-xl p-4 hover:shadow">
        <div className="text-sm opacity-70">{c.provider}</div>
        <div className="text-lg font-medium">{c.title}</div>
        <div className="text-sm mt-1">Improves: {c.overlap?.join(", ")}</div>
        <div className="mt-2 inline-block rounded-lg border px-3 py-1 text-sm">+{c.expected_gain} Employability</div>
      </a>
    ))}
  </div>);
}
