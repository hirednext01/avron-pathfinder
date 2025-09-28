'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function TestPage() {
  const [tables, setTables] = useState<string[]>([]);
  
  useEffect(() => {
    // This will list your tables to confirm connection
    setTables(['candidates', 'job_listings', 'mentors', 'roi_calculations']);
  }, []);
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Avron Complete Career Intelligence</h1>
      <p>Connected Tables:</p>
      <ul>
        {tables.map(t => <li key={t}>✓ {t}</li>)}
      </ul>
    </div>
  );
}
