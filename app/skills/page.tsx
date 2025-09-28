'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../src/integrations/supabase/client';
import Navigation from '../../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Button } from '../../src/components/ui/button';
import { Input } from '../../src/components/ui/input';
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  Award,
  CheckCircle,
  XCircle,
  Users,
  Zap
} from 'lucide-react';

interface Skill {
  id: string;
  skill: string;
  role: string;
  percentile: number;
  sample_size: number;
}

interface AssessmentResult {
  skill: string;
  selfRating: number;
  marketPercentile: number;
  gap: number;
  recommendation: string;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult[]>([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [selfRating, setSelfRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [assessing, setAssessing] = useState(false);

  useEffect(() => {
    loadSkillBenchmarks();
  }, []);

  const loadSkillBenchmarks = async () => {
    try {
      const { data, error } = await supabase
        .from('benchmarks')
        .select('*')
        .order('skill')
        .limit(50);

      if (error) {
        console.error('Error loading benchmarks:', error);
        // Fallback demo data
        setSkills([
          { id: '1', skill: 'JavaScript', role: 'Software Engineer', percentile: 75, sample_size: 1250 },
          { id: '2', skill: 'Python', role: 'Data Scientist', percentile: 68, sample_size: 980 },
          { id: '3', skill: 'React', role: 'Frontend Developer', percentile: 72, sample_size: 1100 },
          { id: '4', skill: 'SQL', role: 'Data Analyst', percentile: 65, sample_size: 1500 },
          { id: '5', skill: 'Machine Learning', role: 'ML Engineer', percentile: 80, sample_size: 750 },
          { id: '6', skill: 'AWS', role: 'Cloud Engineer', percentile: 78, sample_size: 890 },
          { id: '7', skill: 'Product Management', role: 'Product Manager', percentile: 70, sample_size: 650 },
          { id: '8', skill: 'UI/UX Design', role: 'Designer', percentile: 73, sample_size: 540 },
        ]);
      } else {
        setSkills(data || []);
      }
    } catch (error) {
      console.error('Error loading skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const assessSkill = () => {
    if (!currentSkill.trim()) return;

    const skill = skills.find(s => s.skill.toLowerCase() === currentSkill.toLowerCase());
    const marketPercentile = skill ? skill.percentile : 65; // Default if not found
    
    const gap = marketPercentile - (selfRating * 10);
    let recommendation = '';
    
    if (gap > 20) {
      recommendation = 'Significant improvement needed. Consider intensive training or courses.';
    } else if (gap > 10) {
      recommendation = 'Room for improvement. Practice and additional learning recommended.';
    } else if (gap > -5) {
      recommendation = 'You are at market level. Maintain and refine your skills.';
    } else {
      recommendation = 'Excellent! You are above market average. Consider mentoring others.';
    }

    const result: AssessmentResult = {
      skill: currentSkill,
      selfRating,
      marketPercentile,
      gap,
      recommendation
    };

    setAssessmentResults(prev => {
      const filtered = prev.filter(r => r.skill.toLowerCase() !== currentSkill.toLowerCase());
      return [...filtered, result];
    });

    setCurrentSkill('');
    setSelfRating(5);
  };

  const getGapColor = (gap: number) => {
    if (gap > 20) return 'text-red-400';
    if (gap > 10) return 'text-yellow-400';
    if (gap > -5) return 'text-blue-400';
    return 'text-green-400';
  };

  const getGapIcon = (gap: number) => {
    if (gap > 10) return <XCircle className="h-5 w-5 text-red-400" />;
    if (gap > -5) return <Target className="h-5 w-5 text-blue-400" />;
    return <CheckCircle className="h-5 w-5 text-green-400" />;
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-20">
              <div className="text-xl text-blue-100">Loading skill benchmarks...</div>
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
        <div className="container mx-auto px-4 py-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent flex items-center justify-center">
              <BarChart3 className="mr-3 h-10 w-10 text-blue-300" />
              Skills Benchmark
            </h1>
            <p className="text-xl text-blue-100">
              Compare your skills against {skills.length} industry benchmarks
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Self Assessment */}
            <div className="lg:col-span-1">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="mr-2 h-5 w-5 text-blue-300" />
                    Self Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">
                      Skill Name
                    </label>
                    <Input
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      placeholder="e.g., JavaScript, Python, SQL"
                      className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">
                      Your Skill Level (1-10)
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={selfRating}
                      onChange={(e) => setSelfRating(Number(e.target.value))}
                      className="bg-white/10 border-white/20 text-white"
                    />
                    <div className="mt-2 text-xs text-blue-300">
                      1 = Beginner, 5 = Intermediate, 10 = Expert
                    </div>
                  </div>

                  <Button 
                    onClick={assessSkill}
                    disabled={!currentSkill.trim() || assessing}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Assess Skill
                  </Button>
                </CardContent>
              </Card>

              {/* Assessment Results */}
              {assessmentResults.length > 0 && (
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm mt-6">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Award className="mr-2 h-5 w-5 text-blue-300" />
                      Your Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {assessmentResults.map((result, index) => (
                      <div key={index} className="p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-white">{result.skill}</span>
                          {getGapIcon(result.gap)}
                        </div>
                        <div className="text-sm text-blue-200 space-y-1">
                          <div>Your Level: {result.selfRating}/10</div>
                          <div>Market: {result.marketPercentile}th percentile</div>
                          <div className={getGapColor(result.gap)}>
                            Gap: {Math.abs(result.gap).toFixed(1)} points {result.gap > 0 ? 'below' : 'above'} market
                          </div>
                        </div>
                        <p className="text-xs text-blue-300 mt-2">{result.recommendation}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Market Benchmarks */}
            <div className="lg:col-span-2">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-blue-300" />
                    Industry Benchmarks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {skills.map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                        <div>
                          <div className="font-medium text-white">{skill.skill}</div>
                          <div className="text-sm text-blue-200">{skill.role}</div>
                          <div className="flex items-center text-xs text-blue-300 mt-1">
                            <Users className="h-3 w-3 mr-1" />
                            {skill.sample_size?.toLocaleString() || 'N/A'} professionals surveyed
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-300">{skill.percentile}%</div>
                          <div className="text-xs text-blue-400">Market Level</div>
                          <div className="w-20 bg-white/20 rounded-full h-2 mt-2">
                            <div 
                              className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
                              style={{ width: `${skill.percentile}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Summary Stats */}
          {assessmentResults.length > 0 && (
            <div className="mt-8">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Assessment Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-300">{assessmentResults.length}</div>
                      <div className="text-blue-200 text-sm">Skills Assessed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-300">
                        {assessmentResults.filter(r => r.gap <= 0).length}
                      </div>
                      <div className="text-blue-200 text-sm">Above Market</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-300">
                        {assessmentResults.filter(r => r.gap > 0 && r.gap <= 20).length}
                      </div>
                      <div className="text-blue-200 text-sm">Need Improvement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-300">
                        {assessmentResults.filter(r => r.gap > 20).length}
                      </div>
                      <div className="text-blue-200 text-sm">Critical Gaps</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
}