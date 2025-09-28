'use client';

import Navigation from "../../components/Navigation";

export default function BenchmarkPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0E1116] text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-[#D4AF37] mb-8">Skills Benchmark</h1>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#121826] p-8 rounded-xl border border-[#1C2541] mb-8">
              <h2 className="text-2xl font-semibold mb-4">Compare Your Skills Against Market Standards</h2>
              <p className="text-[#8A98A9] mb-6">
                Upload your resume or manually enter your skills to see how you stack up against industry benchmarks
                and receive personalized recommendations for improvement.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#0E1116] p-6 rounded-lg border border-[#1C2541]">
                  <h3 className="text-lg font-medium mb-3">Upload Resume</h3>
                  <div className="border-2 border-dashed border-[#1C2541] rounded-lg p-8 text-center">
                    <p className="text-[#8A98A9] mb-4">Drop your resume here or click to upload</p>
                    <button className="bg-[#D4AF37] text-black px-6 py-2 rounded-lg hover:bg-[#D4AF37]/90">
                      Choose File
                    </button>
                  </div>
                </div>
                
                <div className="bg-[#0E1116] p-6 rounded-lg border border-[#1C2541]">
                  <h3 className="text-lg font-medium mb-3">Manual Entry</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Current Role</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Software Engineer"
                        className="w-full bg-[#1C2541] border border-[#2A3441] rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Years of Experience</label>
                      <input 
                        type="number" 
                        placeholder="3"
                        className="w-full bg-[#1C2541] border border-[#2A3441] rounded-lg px-3 py-2"
                      />
                    </div>
                    <button className="w-full bg-[#D4AF37] text-black py-2 rounded-lg hover:bg-[#D4AF37]/90">
                      Start Assessment
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#121826] p-6 rounded-xl border border-[#1C2541] text-center">
                <div className="text-3xl font-bold text-[#D4AF37] mb-2">25K+</div>
                <div className="text-[#8A98A9]">Professionals Benchmarked</div>
              </div>
              <div className="bg-[#121826] p-6 rounded-xl border border-[#1C2541] text-center">
                <div className="text-3xl font-bold text-[#D4AF37] mb-2">500+</div>
                <div className="text-[#8A98A9]">Skills Tracked</div>
              </div>
              <div className="bg-[#121826] p-6 rounded-xl border border-[#1C2541] text-center">
                <div className="text-3xl font-bold text-[#D4AF37] mb-2">95%</div>
                <div className="text-[#8A98A9]">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}