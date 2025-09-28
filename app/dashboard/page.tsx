'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../src/integrations/supabase/client';
import Navigation from '../../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Button } from '../../src/components/ui/button';
import { 
  Briefcase, 
  Calculator, 
  BookOpen, 
  Search,
  Users,
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

interface User {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
  };
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    jobsViewed: 0,
    roiCalculations: 0,
    skillsAssessed: 0,
    coursesRecommended: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    if (!user) return;
    try {
      const { data: candidate } = await supabase
        .from('candidates')
        .select('name, email')
        .eq('id', user.id)
        .maybeSingle();

      if (candidate) {
        setUserProfile({
          name: candidate.name || 'User',
          email: candidate.email || user.email || ''
        });
      } else {
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
  }, [user]);

  const fetchDashboardStats = useCallback(async () => {
    if (!user) return;
    try {
      const [jobsCount, roiCount, coursesCount, skillsCount] = await Promise.all([
        supabase.from('job_matches').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('enhanced_roi_calculations').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('course_recommendations').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('analysis_results').select('*', { count: 'exact', head: true }).eq('user_id', user.id)
      ]);

      setStats({
        jobsViewed: jobsCount.count || 0,
        roiCalculations: roiCount.count || 0,
        skillsAssessed: skillsCount.count || 0,
        coursesRecommended: coursesCount.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }, [user]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchDashboardStats();
    }
  }, [user, fetchUserData, fetchDashboardStats]);

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-20">Loading...</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome back, {userProfile?.name}!</h1>
            <p className="text-blue-100">Your career intelligence overview</p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-100">Jobs Viewed</CardTitle>
                <Briefcase className="h-4 w-4 text-blue-300" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.jobsViewed}</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-100">ROI Calculations</CardTitle>
                <Calculator className="h-4 w-4 text-blue-300" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.roiCalculations}</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-100">Skills Assessed</CardTitle>
                <BarChart3 className="h-4 w-4 text-blue-300" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.skillsAssessed}</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-100">Courses Recommended</CardTitle>
                <BookOpen className="h-4 w-4 text-blue-300" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.coursesRecommended}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-300" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Link href="/jobs">
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                        <Search className="h-4 w-4 mr-2" />
                        Find Jobs
                      </Button>
                    </Link>
                    <Link href="/roi">
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700">
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculate ROI
                      </Button>
                    </Link>
                    <Link href="/skills">
                      <Button className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Skills Test
                      </Button>
                    </Link>
                    <Link href="/mentors">
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                        <Users className="h-4 w-4 mr-2" />
                        Find Mentor
                      </Button>
                    </Link>
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