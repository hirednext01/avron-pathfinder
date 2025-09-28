'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../src/integrations/supabase/client';
import Navigation from '../../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Button } from '../../src/components/ui/button';
import { 
  User, 
  Briefcase, 
  Calculator, 
  BookOpen, 
  Upload, 
  Search,
  Users,
  TrendingUp,
  Clock,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  jobsViewed: number;
  roiCalculations: number;
  skillsAssessed: number;
  coursesRecommended: number;
}

interface UserProfile {
  name: string;
  email: string;
}

interface RecentActivity {
  jobSearches: any[];
  roiCalculations: any[];
  courseViews: any[];
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    jobsViewed: 0,
    roiCalculations: 0,
    skillsAssessed: 0,
    coursesRecommended: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity>({
    jobSearches: [],
    roiCalculations: [],
    courseViews: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchDashboardStats();
      fetchRecentActivity();
      
      // Set up real-time subscriptions
      const channel = supabase
        .channel('dashboard-updates')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'job_matches',
            filter: `user_id=eq.${user.id}`
          },
          () => {
            fetchDashboardStats();
            fetchRecentActivity();
          }
        )
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'enhanced_roi_calculations',
            filter: `user_id=eq.${user.id}`
          },
          () => {
            fetchDashboardStats();
            fetchRecentActivity();
          }
        )
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'course_recommendations',
            filter: `user_id=eq.${user.id}`
          },
          () => {
            fetchDashboardStats();
            fetchRecentActivity();
          }
        )
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'analysis_results',
            filter: `user_id=eq.${user.id}`
          },
          () => {
            fetchDashboardStats();
            fetchRecentActivity();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (!user) {
        // Redirect to login if not authenticated
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error checking user:', error);
    }
  };

  const fetchUserData = async () => {
    if (!user) return;

    try {
      // Try to get user from candidates table first
      const { data: candidate } = await supabase
        .from('candidates')
        .select('name, email')
        .eq('id', user.id)
        .maybeSingle();

      if (candidate) {
        setUserProfile({
          name: candidate.name || 'User',
          email: candidate.email || user.email
        });
      } else {
        // Fallback to user email
        setUserProfile({
          name: user.user_metadata?.full_name || 'User',
          email: user.email || ''
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserProfile({
        name: 'User',
        email: user.email || ''
      });
    }
  };

  const fetchDashboardStats = async () => {
    if (!user) return;

    try {
      // Get job matches count (jobs viewed)
      const { count: jobsCount } = await supabase
        .from('job_matches')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Get ROI calculations count
      const { count: roiCount } = await supabase
        .from('enhanced_roi_calculations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Get course recommendations count
      const { count: coursesCount } = await supabase
        .from('course_recommendations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Get analysis results count (skills assessed)
      const { count: skillsCount } = await supabase
        .from('analysis_results')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      setStats({
        jobsViewed: jobsCount || 0,
        roiCalculations: roiCount || 0,
        skillsAssessed: skillsCount || 0,
        coursesRecommended: coursesCount || 0
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const fetchRecentActivity = async () => {
    if (!user) return;

    try {
      // Get recent job matches
      const { data: jobSearches } = await supabase
        .from('job_matches')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      // Get recent ROI calculations
      const { data: roiCalculations } = await supabase
        .from('enhanced_roi_calculations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      // Get recent course recommendations
      const { data: courseViews } = await supabase
        .from('course_recommendations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      setRecentActivity({
        jobSearches: jobSearches || [],
        roiCalculations: roiCalculations || [],
        courseViews: courseViews || []
      });
    } catch (error) {
      console.error('Error fetching recent activity:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-[#0E1116] text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-20">
              <div className="text-[#8A98A9]">Loading your dashboard...</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0E1116] text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#D4AF37] mb-2">
              Welcome back, {userProfile?.name}!
            </h1>
            <p className="text-[#8A98A9] text-lg">
              Here's your career intelligence overview
            </p>
            {userProfile?.email && (
              <p className="text-sm text-[#8A98A9] mt-1">
                {userProfile.email}
              </p>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-[#121826] border-[#1C2541]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#8A98A9]">Jobs Viewed</CardTitle>
                <Briefcase className="h-4 w-4 text-[#D4AF37]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.jobsViewed}</div>
                <p className="text-xs text-[#8A98A9]">Matched opportunities</p>
              </CardContent>
            </Card>

            <Card className="bg-[#121826] border-[#1C2541]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#8A98A9]">ROI Calculations</CardTitle>
                <Calculator className="h-4 w-4 text-[#D4AF37]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.roiCalculations}</div>
                <p className="text-xs text-[#8A98A9]">Career projections</p>
              </CardContent>
            </Card>

            <Card className="bg-[#121826] border-[#1C2541]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#8A98A9]">Skills Assessed</CardTitle>
                <BarChart3 className="h-4 w-4 text-[#D4AF37]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.skillsAssessed}</div>
                <p className="text-xs text-[#8A98A9]">Analysis completed</p>
              </CardContent>
            </Card>

            <Card className="bg-[#121826] border-[#1C2541]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#8A98A9]">Courses Recommended</CardTitle>
                <BookOpen className="h-4 w-4 text-[#D4AF37]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.coursesRecommended}</div>
                <p className="text-xs text-[#8A98A9]">Learning paths</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <Card className="bg-[#121826] border-[#1C2541]">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-white flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-[#D4AF37]" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Recent Job Searches */}
                    <div>
                      <h3 className="text-sm font-medium text-[#D4AF37] mb-3">Recent Job Matches</h3>
                      {recentActivity.jobSearches.length > 0 ? (
                        <div className="space-y-2">
                          {recentActivity.jobSearches.slice(0, 3).map((job, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-[#0E1116] rounded-lg">
                              <div>
                                <p className="text-sm font-medium text-white">
                                  {job.job?.title || 'Job Match'}
                                </p>
                                <p className="text-xs text-[#8A98A9]">
                                  Match Score: {job.match_score ? `${Math.round(job.match_score * 100)}%` : 'N/A'}
                                </p>
                              </div>
                              <div className="text-xs text-[#8A98A9]">
                                {new Date(job.created_at).toLocaleDateString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-[#8A98A9]">No job matches yet</p>
                      )}
                    </div>

                    {/* Recent ROI Calculations */}
                    <div>
                      <h3 className="text-sm font-medium text-[#D4AF37] mb-3">Recent ROI Calculations</h3>
                      {recentActivity.roiCalculations.length > 0 ? (
                        <div className="space-y-2">
                          {recentActivity.roiCalculations.slice(0, 3).map((roi, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-[#0E1116] rounded-lg">
                              <div>
                                <p className="text-sm font-medium text-white">
                                  ROI Projection: {roi.roi_5_year_percentage || 'N/A'}%
                                </p>
                                <p className="text-xs text-[#8A98A9]">
                                  5-year outlook
                                </p>
                              </div>
                              <div className="text-xs text-[#8A98A9]">
                                {new Date(roi.created_at).toLocaleDateString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-[#8A98A9]">No calculations yet</p>
                      )}
                    </div>

                    {/* Recent Course Views */}
                    <div>
                      <h3 className="text-sm font-medium text-[#D4AF37] mb-3">Recent Course Recommendations</h3>
                      {recentActivity.courseViews.length > 0 ? (
                        <div className="space-y-2">
                          {recentActivity.courseViews.slice(0, 3).map((course, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-[#0E1116] rounded-lg">
                              <div>
                                <p className="text-sm font-medium text-white">
                                  {course.course_name}
                                </p>
                                <p className="text-xs text-[#8A98A9]">
                                  {course.provider} • Score: {course.recommendation_score || 'N/A'}
                                </p>
                              </div>
                              <div className="text-xs text-[#8A98A9]">
                                {new Date(course.created_at).toLocaleDateString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-[#8A98A9]">No course recommendations yet</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <Card className="bg-[#121826] border-[#1C2541]">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-white flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-[#D4AF37]" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Link href="/benchmark" className="block">
                      <Button className="w-full bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90 flex items-center justify-center">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Resume
                      </Button>
                    </Link>

                    <Link href="/roi-dashboard" className="block">
                      <Button variant="outline" className="w-full border-[#1C2541] text-white hover:bg-[#1C2541] flex items-center justify-center">
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculate ROI
                      </Button>
                    </Link>

                    <Link href="/jobs" className="block">
                      <Button variant="outline" className="w-full border-[#1C2541] text-white hover:bg-[#1C2541] flex items-center justify-center">
                        <Search className="h-4 w-4 mr-2" />
                        Find Jobs
                      </Button>
                    </Link>

                    <Link href="/mentors" className="block">
                      <Button variant="outline" className="w-full border-[#1C2541] text-white hover:bg-[#1C2541] flex items-center justify-center">
                        <Users className="h-4 w-4 mr-2" />
                        Book Mentor
                      </Button>
                    </Link>
                  </div>

                  {/* Progress Insight */}
                  <div className="mt-6 p-4 bg-[#0E1116] rounded-lg">
                    <h4 className="text-sm font-medium text-[#D4AF37] mb-2">Your Progress</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#8A98A9]">Profile Completion</span>
                        <span className="text-white">
                          {Math.round(((stats.jobsViewed > 0 ? 1 : 0) + 
                                       (stats.roiCalculations > 0 ? 1 : 0) + 
                                       (stats.skillsAssessed > 0 ? 1 : 0) + 
                                       (stats.coursesRecommended > 0 ? 1 : 0)) / 4 * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-[#1C2541] rounded-full h-2">
                        <div 
                          className="bg-[#D4AF37] h-2 rounded-full transition-all duration-300" 
                          style={{
                            width: `${((stats.jobsViewed > 0 ? 1 : 0) + 
                                      (stats.roiCalculations > 0 ? 1 : 0) + 
                                      (stats.skillsAssessed > 0 ? 1 : 0) + 
                                      (stats.coursesRecommended > 0 ? 1 : 0)) / 4 * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}