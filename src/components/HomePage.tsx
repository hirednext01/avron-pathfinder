'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'benchmark' | 'jobs' | 'roi'>('benchmark');
  
  return (
    <div>
      {/* Header */}
      <header className="text-center py-6">
        <h1 className="text-3xl font-bold">Career Intelligence Platform</h1>
        <p className="text-gray-600">AI-Powered Career Analytics & Development</p>
      </header>
      
      {/* Navigation Tabs */}
      <nav className="flex justify-center gap-6 my-4">
        <button 
          onClick={() => setActiveTab('benchmark')}
          className={`px-4 py-2 ${activeTab === 'benchmark' ? 'font-bold border-b-2 border-blue-500' : ''}`}
        >
          Benchmark
        </button>
        <button 
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2 ${activeTab === 'jobs' ? 'font-bold border-b-2 border-blue-500' : ''}`}
        >
          Jobs
        </button>
        <button 
          onClick={() => setActiveTab('roi')}
          className={`px-4 py-2 ${activeTab === 'roi' ? 'font-bold border-b-2 border-blue-500' : ''}`}
        >
          ROI
        </button>
      </nav>
      
      {/* Active Tab Section */}
      <main className="p-4">
        {activeTab === 'benchmark' && <div className="p-8 bg-gray-100 rounded">Career Benchmarking Dashboard</div>}
        {activeTab === 'jobs' && <div className="p-8 bg-gray-100 rounded">Jobs Listing</div>}
        {activeTab === 'roi' && <div className="p-8 bg-gray-100 rounded">ROI Calculator</div>}
      </main>
    </div>
  );
}
