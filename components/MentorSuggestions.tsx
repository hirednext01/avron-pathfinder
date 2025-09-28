"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
type Row={id:string;name?:string;display_name?:string;title?:string;specialties?:string[];rate?:number;currency?:string;rating?:number;overlap?:string[];score?:number;};
export default function MentorSuggestions(){
  const [rows,setRows]=useState<Row[]>([]),[loading,setLoading]=useState(true),[err,setErr]=useState<string|null>(null);
  useEffect(()=>{(async()=>{try{
    const {data:{user}}=await supabase.auth.getUser(); if(!user){setErr("Please sign in."); setLoading(false); return;}
    const {data,error}=await supabase.rpc("recommend_mentors",{p_user_id:user.id,p_limit:6}); if(error) throw error; setRows(data||[]);
  }catch(e:any){setErr(e.message);}finally{setLoading(false);}})();},[]);
  if(loading) return <div className="mt-6">Finding mentors who can bridge your gaps…</div>;
  if(err) return <div className="mt-6 text-red-600">Error: {err}</div>;
  if(!rows.length) return <div className="mt-6">No mentor matches yet.</div>;
  return (<div className="mt-8 space-y-3">
    <h2 className="text-xl font-semibold">Mentors for Your Gaps</h2>
    {rows.map(m=>(
      <div key={m.id} className="border rounded-xl p-4">
        <div className="text-lg font-medium">{m.display_name || m.name}</div>
        {m.title && <div className="text-sm opacity-70">{m.title}</div>}
        <div className="text-sm mt-1">Strong on: {(m.overlap||[]).join(", ")}</div>
        <div className="mt-2 text-sm">{m.rating?`Rating: ${m.rating} · `:""}{m.rate?`${m.rate} ${m.currency||"INR"}/30m`:""}</div>
      </div>
    ))}
  </div>);
}
