'use client';

import Navigation from "../../components/Navigation";
import { useEffect, useMemo, useState } from "react";

type ROIInputs = { currentSalary:number; potentialSalary:number; investmentCost:number; timeToROI:number; };

function computeMetrics(r: ROIInputs){
  const inc=Math.max(r.potentialSalary-r.currentSalary,0);
  const monthly=inc/12;
  const payback=monthly>0?Math.round(r.investmentCost/monthly):Infinity;
  const fiveYear=inc*5;
  const roi=r.investmentCost>0?Math.round(((fiveYear-r.investmentCost)/r.investmentCost)*100):0;
  return {annualIncrease:inc, monthlyIncrease:Math.round(monthly), paybackMonths:payback, roiPct:roi};
}
const fmtINR=(n:number)=>"₹"+(Number.isFinite(n)?n:0).toLocaleString("en-IN",{maximumFractionDigits:0}).replace(/\s|\u00A0|\u202F/g,"");

export default function Page(){
  const [mounted,setMounted]=useState(false);
  useEffect(()=>setMounted(true),[]);
  const [inputs,setInputs]=useState<ROIInputs>({currentSalary:1200000,potentialSalary:1800000,investmentCost:120000,timeToROI:6});
  const m=useMemo(()=>computeMetrics(inputs),[inputs]);
  const set=(k:keyof ROIInputs)=>(e:React.ChangeEvent<HTMLInputElement>)=>setInputs(p=>({...p,[k]:Number(e.target.value)||0}));

  const Card=({title,value}:{title:string;value:string})=>(
    <div className="bg-[#0E1116] rounded-lg border border-[#1C2541] p-4">
      <div className="text-xs text-[#8A98A9] mb-1">{title}</div>
      <div className="text-lg font-bold text-[#D4AF37]" suppressHydrationWarning>{value}</div>
    </div>
  );

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0E1116] text-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {mounted ? (
            <>
              <header className="mb-8">
                <h1 className="text-4xl font-bold text-[#D4AF37]">ROI Dashboard</h1>
              </header>

              <section className="grid md:grid-cols-2 gap-8">
                <div className="bg-[#121826] rounded-xl border border-[#1C2541] p-6">
                  <h2 className="text-xl font-semibold mb-4">Inputs</h2>
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-sm text-[#8A98A9] mb-2 block">Current Salary (₹/year)</span>
                      <input type="number" className="mt-1 w-full bg-[#1C2541] border border-[#2A3441] rounded-lg px-3 py-2 text-white"
                             value={inputs.currentSalary} onChange={set("currentSalary")} min={0}/>
                    </label>
                    <label className="block">
                      <span className="text-sm text-[#8A98A9] mb-2 block">Target Salary (₹/year)</span>
                      <input type="number" className="mt-1 w-full bg-[#1C2541] border border-[#2A3441] rounded-lg px-3 py-2 text-white"
                             value={inputs.potentialSalary} onChange={set("potentialSalary")} min={0}/>
                    </label>
                    <label className="block">
                      <span className="text-sm text-[#8A98A9] mb-2 block">Investment Cost (₹ one-time)</span>
                      <input type="number" className="mt-1 w-full bg-[#1C2541] border border-[#2A3441] rounded-lg px-3 py-2 text-white"
                             value={inputs.investmentCost} onChange={set("investmentCost")} min={0}/>
                    </label>
                    <label className="block">
                      <span className="text-sm text-[#8A98A9] mb-2 block">Time to Target Role (months)</span>
                      <input type="number" className="mt-1 w-full bg-[#1C2541] border border-[#2A3441] rounded-lg px-3 py-2 text-white"
                             value={inputs.timeToROI} onChange={set("timeToROI")} min={0}/>
                    </label>
                  </div>
                </div>

                <div className="bg-[#121826] rounded-xl border border-[#1C2541] p-6">
                  <h2 className="text-xl font-semibold mb-4">Quick Metrics</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Card title="Annual Increase" value={fmtINR(m.annualIncrease)} />
                    <Card title="Monthly Increase" value={fmtINR(m.monthlyIncrease)} />
                    <Card title="Payback Period" value={m.paybackMonths===Infinity?"—":`${m.paybackMonths} months`} />
                    <Card title="5-Year ROI" value={`${m.roiPct}%`} />
                  </div>
                  <p className="text-xs text-[#8A98A9] mt-4">
                    Simple model: 5-year gain = (Target − Current) × 5. ROI = (Gain − Investment) ÷ Investment.
                  </p>
                </div>
              </section>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-[#8A98A9]">Loading...</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}