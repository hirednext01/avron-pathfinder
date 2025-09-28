'use client';

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0E1116] text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Avron Career Intelligence Platform</h1>
      <div className="max-w-4xl mx-auto">
        <div className="grid gap-4">
          <a href="/benchmark" className="p-6 bg-[#121826] rounded-xl hover:bg-[#1a2033]">
            <h2 className="text-2xl font-semibold mb-2">Career Benchmark</h2>
            <p className="text-gray-400">Compare your skills against market standards</p>
          </a>
          <a href="/jobs" className="p-6 bg-[#121826] rounded-xl hover:bg-[#1a2033]">
            <h2 className="text-2xl font-semibold mb-2">Job Listings</h2>
            <p className="text-gray-400">Find opportunities matched to your profile</p>
          </a>
          <a href="/roi" className="p-6 bg-[#121826] rounded-xl hover:bg-[#1a2033]">
            <h2 className="text-2xl font-semibold mb-2">ROI Calculator</h2>
            <p className="text-gray-400">Calculate your career growth potential</p>
          </a>
        </div>
      </div>
    </div>
  );
}
