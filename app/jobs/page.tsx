"use client"
import { useEffect, useState } from "react"
import Navigation from "../../components/Navigation";
import { supabase } from "../../src/integrations/supabase/client"

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadJobs() {
      const { data, error } = await supabase
        .from("job_listings_public")
        .select("*")
        .order("posted_at", { ascending: false })
        .limit(20)

      if (error) {
        console.error(error)
      } else {
        setJobs(data || [])
      }
      setLoading(false)
    }
    loadJobs()
  }, [])

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-[#0E1116] text-white">
          <div className="container mx-auto px-4 py-8">
            <p className="text-center">Loading jobs…</p>
          </div>
        </div>
      </>
    )
  }

  if (jobs.length === 0) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-[#0E1116] text-white">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-[#D4AF37] mb-8">Latest Jobs</h1>
            <div className="grid gap-6">
              <div className="bg-[#121826] p-6 rounded-xl border border-[#1C2541]">
                <h2 className="text-xl font-semibold mb-2">Frontend Engineer</h2>
                <p className="text-[#8A98A9] mb-4">TechCorp • Bangalore</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-sm">React</span>
                  <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-sm">TypeScript</span>
                </div>
                <button className="bg-[#D4AF37] text-black px-4 py-2 rounded-lg hover:bg-[#D4AF37]/90">
                  View Details
                </button>
              </div>
              <div className="bg-[#121826] p-6 rounded-xl border border-[#1C2541]">
                <h2 className="text-xl font-semibold mb-2">Data Analyst</h2>
                <p className="text-[#8A98A9] mb-4">DataWorks • Remote</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-sm">Python</span>
                  <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-sm">SQL</span>
                </div>
                <button className="bg-[#D4AF37] text-black px-4 py-2 rounded-lg hover:bg-[#D4AF37]/90">
                  View Details
                </button>
              </div>
              <div className="bg-[#121826] p-6 rounded-xl border border-[#1C2541]">
                <h2 className="text-xl font-semibold mb-2">AI Research Intern</h2>
                <p className="text-[#8A98A9] mb-4">AvronAI • Delhi</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-sm">Machine Learning</span>
                  <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-sm">Python</span>
                </div>
                <button className="bg-[#D4AF37] text-black px-4 py-2 rounded-lg hover:bg-[#D4AF37]/90">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0E1116] text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-[#D4AF37] mb-8">Latest Jobs</h1>
          <div className="grid gap-6">
            {jobs.map(job => (
              <div key={job.id} className="bg-[#121826] p-6 rounded-xl border border-[#1C2541]">
                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                <p className="text-[#8A98A9] mb-4">{job.company} • {job.location}</p>
                <p className="text-[#8A98A9] mb-4">{job.salary_range}</p>
                {job.url && (
                  <a 
                    href={job.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#D4AF37] text-black px-4 py-2 rounded-lg hover:bg-[#D4AF37]/90 inline-block"
                  >
                    View Job
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}