"use client";
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
  if(!mounted) return null;

  const Card=({title,value}:{title:string;value:string})=>(
    <div className="rounded-2xl shadow p-5 border bg-white">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold mt-1" suppressHydrationWarning>{value}</div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full p-6 md:p-10 bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold">ROI Dashboard</h1>
          <span className="text-sm text-gray-600">/roi-dashboard</span>
        </header>

        {/* Inputs */}
        <section className="grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl shadow p-6 border bg-white">
            <h2 className="text-lg font-semibold mb-4">Inputs</h2>
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm text-gray-600">Current Salary (₹/year)</span>
                <input type="number" className="mt-1 w-full rounded-xl border px-3 py-2"
                       value={inputs.currentSalary} onChange={set("currentSalary")} min={0}/>
              </label>
              <label className="block">
                <span className="text-sm text-gray-600">Target Salary (₹/year)</span>
                <input type="number" className="mt-1 w-full rounded-xl border px-3 py-2"
                       value={inputs.potentialSalary} onChange={set("potentialSalary")} min={0}/>
              </label>
              <label className="block">
                <span className="text-sm text-gray-600">Investment Cost (₹ one-time)</span>
                <input type="number" className="mt-1 w-full rounded-xl border px-3 py-2"
                       value={inputs.investmentCost} onChange={set("investmentCost")} min={0}/>
              </label>
              <label className="block">
                <span className="text-sm text-gray-600">Time to Target Role (months)</span>
                <input type="number" className="mt-1 w-full rounded-xl border px-3 py-2"
                       value={inputs.timeToROI} onChange={set("timeToROI")} min={0}/>
              </label>
            </div>
          </div>

          {/* Metrics */}
          <div className="rounded-2xl shadow p-6 border bg-white">
            <h2 className="text-lg font-semibold mb-4">Quick Metrics</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card title="Annual Increase" value={fmtINR(m.annualIncrease)} />
              <Card title="Monthly Increase" value={fmtINR(m.monthlyIncrease)} />
              <Card title="Payback Period" value={m.paybackMonths===Infinity?"—":`${m.paybackMonths} months`} />
              <Card title="5-Year ROI" value={`${m.roiPct}%`} />
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Simple model: 5-year gain = (Target − Current) × 5. ROI = (Gain − Investment) ÷ Investment.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

