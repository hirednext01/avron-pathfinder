"use client"
import { useEffect, useState } from "react"
import { supabase } from "../../src/integrations/supabase/client"
import Navigation from "../../components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "../../src/components/ui/card"
import { Button } from "../../src/components/ui/button"
import { Input } from "../../src/components/ui/input"
import { Search, MapPin, DollarSign, Calendar, Calculator, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Job {
  id: string;
  title: string;
  company: string;
  location?: string;
  salary?: string;
  posted_at: string;
  url?: string;
  description?: string;
  tags?: string[];
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")

  useEffect(() => {
    loadJobs()
  }, [])

  useEffect(() => {
    filterJobs()
  }, [jobs, searchTerm, locationFilter])

  const loadJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("job_listings")
        .select("*")
        .order("posted_at", { ascending: false })
        .limit(50)

      if (error) {
        console.error(error)
        // Fallback to demo data if no real jobs
        setJobs([
          {
            id: "1",
            title: "Senior Software Engineer",
            company: "TechCorp Inc",
            location: "San Francisco, CA",
            salary: "$120,000 - $180,000",
            posted_at: new Date().toISOString(),
            description: "Join our dynamic team building next-generation applications.",
            tags: ["React", "TypeScript", "Node.js"]
          },
          {
            id: "2", 
            title: "Data Scientist",
            company: "DataWorks",
            location: "Remote",
            salary: "$100,000 - $150,000",
            posted_at: new Date().toISOString(),
            description: "Use machine learning to drive business insights.",
            tags: ["Python", "SQL", "Machine Learning"]
          },
          {
            id: "3",
            title: "Product Manager",
            company: "InnovateCo",
            location: "New York, NY", 
            salary: "$110,000 - $160,000",
            posted_at: new Date().toISOString(),
            description: "Lead product strategy and development initiatives.",
            tags: ["Strategy", "Analytics", "Leadership"]
          }
        ])
      } else {
        setJobs(data || [])
      }
    } catch (error) {
      console.error("Error loading jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterJobs = () => {
    let filtered = jobs

    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (locationFilter) {
      filtered = filtered.filter(job =>
        job.location && job.location.toLowerCase().includes(locationFilter.toLowerCase())
      )
    }

    setFilteredJobs(filtered)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-20">
              <div className="text-xl text-blue-100">Loading job opportunities...</div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              Smart Job Matching
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Discover {jobs.length} opportunities with AI-powered recommendations and ROI insights
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm mb-8">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-blue-300" />
                  <Input
                    placeholder="Search jobs, companies, skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-blue-300" />
                  <Input
                    placeholder="Location"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200"
                  />
                </div>
                <Button 
                  onClick={() => { setSearchTerm(""); setLocationFilter(""); }}
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-blue-200">
              Showing {filteredJobs.length} of {jobs.length} opportunities
            </p>
          </div>

          {/* Job Listings */}
          <div className="grid gap-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-semibold text-white mb-2">{job.title}</CardTitle>
                      <p className="text-blue-200 text-lg">{job.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-blue-300 mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">{formatDate(job.posted_at)}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {job.location && (
                      <div className="flex items-center text-blue-200">
                        <MapPin className="h-4 w-4 mr-2 text-blue-300" />
                        <span>{job.location}</span>
                      </div>
                    )}
                    {job.salary && (
                      <div className="flex items-center text-emerald-300">
                        <DollarSign className="h-4 w-4 mr-2" />
                        <span>{job.salary}</span>
                      </div>
                    )}
                  </div>
                  
                  {job.description && (
                    <p className="text-blue-100 mb-4 line-clamp-2">{job.description}</p>
                  )}

                  {job.tags && job.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.tags.slice(0, 5).map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-sm border border-blue-400/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    {job.url ? (
                      <a href={job.url} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex items-center">
                          Apply Now
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    ) : (
                      <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                        Apply Now
                      </Button>
                    )}
                    
                    <Link href={`/roi?job=${encodeURIComponent(job.title)}&company=${encodeURIComponent(job.company)}`}>
                      <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 flex items-center">
                        <Calculator className="mr-2 h-4 w-4" />
                        Calculate ROI
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Search className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Jobs Found</h3>
                <p className="text-blue-200 mb-6">Try adjusting your search criteria or clear the filters</p>
                <Button 
                  onClick={() => { setSearchTerm(""); setLocationFilter(""); }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Reset Search
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Load More */}
          {jobs.length >= 50 && (
            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 px-8"
                onClick={() => {/* TODO: Load more jobs */}}
              >
                Load More Jobs
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}