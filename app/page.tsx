'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../src/integrations/supabase/client';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/card';
import { Button } from '../src/components/ui/button';
import { 
  BarChart3Icon, 
  BriefcaseIcon, 
  CalculatorIcon, 
  TrendingUpIcon, 
  BookOpenIcon, 
  UsersIcon,
  UserIcon,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface DatabaseStats {
  totalJobs: number;
  totalMentors: number;
  totalCourses: number;
  totalCandidates: number;
  connectionStatus: boolean;
}

interface RecentJob {
  id: string;
  title: string;
  company: string;
  location?: string;
  salary?: string;
  posted_at: string;
}

export default function HomePage() {
  const [stats, setStats] = useState<DatabaseStats>({
    totalJobs: 0,
    totalMentors: 0,
    totalCourses: 0,
    totalCandidates: 0,
    connectionStatus: false
  });
  const [recentJobs, setRecentJobs] = useState<RecentJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSupabaseConnection();
  }, []);

  const checkSupabaseConnection = async () => {
    try {
      // Test connection and get stats from various tables
      const [jobsResult, mentorsResult, coursesResult, candidatesResult, jobsData] = await Promise.all([
        supabase.from('job_listings').select('*', { count: 'exact', head: true }),
        supabase.from('mentors').select('*', { count: 'exact', head: true }),
        supabase.from('courses_live').select('*', { count: 'exact', head: true }),
        supabase.from('candidates').select('*', { count: 'exact', head: true }),
        supabase.from('job_listings').select('id, title, company, location, salary, posted_at').order('posted_at', { ascending: false }).limit(5)
      ]);

      setStats({
        totalJobs: jobsResult.count || 0,
        totalMentors: mentorsResult.count || 0,
        totalCourses: coursesResult.count || 0,
        totalCandidates: candidatesResult.count || 0,
        connectionStatus: true
      });

      setRecentJobs(jobsData.data || []);
    } catch (error) {
      console.error('Supabase connection error:', error);
      setStats(prev => ({ ...prev, connectionStatus: false }));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-20">
              <div className="text-xl text-blue-100">Connecting to database...</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-12">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 bg-clip-text text-transparent">
              Avron Career Intelligence
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4">
              ROI-Driven Career Decisions
            </p>
            <p className="text-lg text-blue-200 max-w-3xl mx-auto">
              Make data-driven career moves with AI-powered insights, personalized mentorship, and ROI calculations for every decision.
            </p>
            
            {/* Connection Status */}
            <div className="mt-8 flex items-center justify-center gap-2">
              {stats.connectionStatus ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-green-300">Connected to database with {stats.totalJobs + stats.totalMentors + stats.totalCourses} resources</span>
                </>
              ) : (
                <span className="text-red-300">Database connection failed</span>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-16">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all">
              <CardContent className="p-6 text-center">
                <BriefcaseIcon className="h-10 w-10 text-blue-300 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stats.totalJobs.toLocaleString()}</div>
                <div className="text-blue-100">Job Opportunities</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all">
              <CardContent className="p-6 text-center">
                <UsersIcon className="h-10 w-10 text-purple-300 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stats.totalMentors.toLocaleString()}</div>
                <div className="text-blue-100">Expert Mentors</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all">
              <CardContent className="p-6 text-center">
                <BookOpenIcon className="h-10 w-10 text-indigo-300 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stats.totalCourses.toLocaleString()}</div>
                <div className="text-blue-100">Learning Courses</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all">
              <CardContent className="p-6 text-center">
                <UserIcon className="h-10 w-10 text-green-300 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stats.totalCandidates.toLocaleString()}</div>
                <div className="text-blue-100">Active Users</div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Boxes */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16">
            <Link href="/jobs" className="group">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group-hover:scale-105 h-full">
                <CardHeader>
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform">
                    <BriefcaseIcon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">Smart Job Matching</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-100 mb-4">AI-powered job recommendations based on your skills, experience, and career goals with ROI projections.</p>
                  <div className="flex items-center text-blue-300 group-hover:text-blue-200">
                    <span className="text-sm">Explore Jobs</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/roi" className="group">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group-hover:scale-105 h-full">
                <CardHeader>
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform">
                    <CalculatorIcon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">ROI Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-100 mb-4">Calculate the return on investment for courses, certifications, and career transitions.</p>
                  <div className="flex items-center text-purple-300 group-hover:text-purple-200">
                    <span className="text-sm">Calculate ROI</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/skills" className="group">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group-hover:scale-105 h-full">
                <CardHeader>
                  <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform">
                    <BarChart3Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">Skills Benchmark</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-100 mb-4">Compare your skills against industry standards and get personalized improvement recommendations.</p>
                  <div className="flex items-center text-indigo-300 group-hover:text-indigo-200">
                    <span className="text-sm">Test Skills</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/mentors" className="group">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group-hover:scale-105 h-full">
                <CardHeader>
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform">
                    <UsersIcon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">Expert Mentors</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-100 mb-4">Connect with industry experts for personalized career guidance and strategic advice.</p>
                  <div className="flex items-center text-emerald-300 group-hover:text-emerald-200">
                    <span className="text-sm">Find Mentors</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/courses" className="group">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group-hover:scale-105 h-full">
                <CardHeader>
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform">
                    <BookOpenIcon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">Smart Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-100 mb-4">AI-curated courses with ROI scores to maximize your learning investment returns.</p>
                  <div className="flex items-center text-orange-300 group-hover:text-orange-200">
                    <span className="text-sm">Browse Courses</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/profile" className="group">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group-hover:scale-105 h-full">
                <CardHeader>
                  <div className="p-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUpIcon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">Career Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-100 mb-4">Track your career progression, skills development, and ROI achievements over time.</p>
                  <div className="flex items-center text-pink-300 group-hover:text-pink-200">
                    <span className="text-sm">View Profile</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Recent Jobs Section */}
          {recentJobs.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Latest Job Opportunities</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentJobs.slice(0, 6).map((job) => (
                  <Card key={job.id} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-white mb-2">{job.title}</h3>
                      <p className="text-blue-200 mb-1">{job.company}</p>
                      {job.location && <p className="text-blue-300 text-sm mb-2">{job.location}</p>}
                      {job.salary && <p className="text-emerald-300 text-sm mb-3">{job.salary}</p>}
                      <Link href={`/jobs`}>
                        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/jobs">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8">
                    View All Jobs <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-blue-800/50 to-purple-800/50 border-white/20 backdrop-blur-sm">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Career?</h2>
                <p className="text-blue-100 mb-8 text-lg">Join thousands of professionals making data-driven career decisions</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/dashboard">
                    <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8">
                      Get Started Free
                    </Button>
                  </Link>
                  <Link href="/roi">
                    <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                      Calculate Your ROI
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}