'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../src/integrations/supabase/client';
import Navigation from '../../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Button } from '../../src/components/ui/button';
import { Star, Clock, Users, ExternalLink, TrendingUp, DollarSign } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  provider: string;
  cost?: number;
  rating?: number;
  duration_weeks?: number;
  skills_covered?: string[];
  avg_employability_gain?: number;
  url?: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses_live')
        .select('*')
        .eq('is_active', true)
        .order('avg_employability_gain', { ascending: false })
        .limit(20);

      setCourses(data || []);
    } catch (err) {
      console.error('Error loading courses:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
            Smart Learning Recommendations
          </h1>
          
          {loading ? (
            <div className="text-center py-20">Loading courses...</div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {courses.map((course) => (
                <Card key={course.id} className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">{course.title}</CardTitle>
                    <p className="text-blue-200">{course.provider}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-4">
                        {course.rating && (
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm">{course.rating}</span>
                          </div>
                        )}
                        {course.duration_weeks && (
                          <div className="flex items-center text-blue-200">
                            <Clock className="h-4 w-4 mr-1" />
                            <span className="text-sm">{course.duration_weeks} weeks</span>
                          </div>
                        )}
                      </div>
                      {course.avg_employability_gain && (
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-300">
                            ROI: +{course.avg_employability_gain}%
                          </div>
                          <div className="text-xs text-blue-300">Employability</div>
                        </div>
                      )}
                    </div>

                    {course.skills_covered && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {course.skills_covered.slice(0, 5).map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-200 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      {course.cost && (
                        <div className="text-lg font-bold text-white">
                          ${course.cost.toLocaleString()}
                        </div>
                      )}
                      <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Enroll Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}