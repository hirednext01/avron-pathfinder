'use client';
import { useEffect, useState } from 'react';
import Navigation from "../../components/Navigation";

export default function TestPage() {
  const [tables, setTables] = useState<string[]>([]);
  
  useEffect(() => {
    // This will list your tables to confirm connection
    setTables(['candidates', 'job_listings', 'mentors', 'roi_calculations']);
  }, []);
  
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0E1116] text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-[#D4AF37] mb-8">Avron Complete Career Intelligence</h1>
          <div className="bg-[#121826] p-6 rounded-xl border border-[#1C2541]">
            <h2 className="text-xl font-semibold mb-4">Connected Tables:</h2>
            <ul className="space-y-2">
              {tables.map(t => (
                <li key={t} className="flex items-center text-[#8A98A9]">
                  <span className="text-green-400 mr-2">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
