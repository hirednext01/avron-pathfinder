'use client';

import Navigation from "../../components/Navigation";
import { TrendingUp, Target, Award, BookOpen, Users, Briefcase, BarChart3, Trophy } from 'lucide-react';

export default function DashboardPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Career Dashboard</h1>
            <p className="text-blue-200 text-lg">Track your progress and career development journey</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <Target className="h-6 w-6 text-blue-300" />
                </div>
                <span className="text-green-300 text-sm font-semibold">+12%</span>
              </div>
              <h3 className="text-white text-2xl font-bold mb-1">85%</h3>
              <p className="text-blue-200 text-sm">Skill Match Score</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  <BookOpen className="h-6 w-6 text-purple-300" />
                </div>
                <span className="text-green-300 text-sm font-semibold">3 Active</span>
              </div>
              <h3 className="text-white text-2xl font-bold mb-1">12</h3>
              <p className="text-blue-200 text-sm">Courses Completed</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-pink-500/20 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-pink-300" />
                </div>
                <span className="text-green-300 text-sm font-semibold">+2 This month</span>
              </div>
              <h3 className="text-white text-2xl font-bold mb-1">8</h3>
              <p className="text-blue-200 text-sm">Mentor Sessions</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <Briefcase className="h-6 w-6 text-green-300" />
                </div>
                <span className="text-green-300 text-sm font-semibold">24 New</span>
              </div>
              <h3 className="text-white text-2xl font-bold mb-1">156</h3>
              <p className="text-blue-200 text-sm">Job Matches</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Skills Progress */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="h-6 w-6 text-blue-300" />
                <h2 className="text-xl font-bold text-white">Skills Progress</h2>
              </div>
              
              <div className="space-y-4">
                {[
                  { skill: 'React', level: 90, color: 'bg-blue-500' },
                  { skill: 'TypeScript', level: 75, color: 'bg-purple-500' },
                  { skill: 'Node.js', level: 65, color: 'bg-green-500' },
                  { skill: 'AWS', level: 50, color: 'bg-yellow-500' }
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">{item.skill}</span>
                      <span className="text-blue-200">{item.level}%</span>
                    </div>
                    <div className="bg-white/10 rounded-full h-2">
                      <div 
                        className={`${item.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="h-6 w-6 text-yellow-300" />
                <h2 className="text-xl font-bold text-white">Recent Achievements</h2>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: 'Completed React Advanced Course', date: '2 days ago', icon: Award, color: 'text-blue-300' },
                  { title: 'Applied to 5 new positions', date: '3 days ago', icon: Briefcase, color: 'text-green-300' },
                  { title: 'Mentor session with Sarah Chen', date: '1 week ago', icon: Users, color: 'text-purple-300' },
                  { title: 'Skill assessment improved by 15%', date: '2 weeks ago', icon: TrendingUp, color: 'text-yellow-300' }
                ].map((activity, idx) => {
                  const Icon = activity.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                      <Icon className={`h-5 w-5 ${activity.color} mt-1`} />
                      <div className="flex-1">
                        <p className="text-white font-medium">{activity.title}</p>
                        <p className="text-blue-200 text-sm">{activity.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Target className="h-6 w-6 text-green-300" />
              <h2 className="text-xl font-bold text-white">Recommended Next Steps</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/5 p-4 rounded-lg border border-blue-500/30">
                <div className="bg-blue-500/20 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                  <BookOpen className="h-5 w-5 text-blue-300" />
                </div>
                <h3 className="text-white font-semibold mb-2">Complete AWS Course</h3>
                <p className="text-blue-200 text-sm mb-3">Boost your cloud computing skills</p>
                <button className="text-blue-300 text-sm font-semibold hover:text-blue-200">
                  Start Learning →
                </button>
              </div>

              <div className="bg-white/5 p-4 rounded-lg border border-purple-500/30">
                <div className="bg-purple-500/20 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                  <Users className="h-5 w-5 text-purple-300" />
                </div>
                <h3 className="text-white font-semibold mb-2">Schedule Mentor Session</h3>
                <p className="text-blue-200 text-sm mb-3">Get guidance on system design</p>
                <button className="text-purple-300 text-sm font-semibold hover:text-purple-200">
                  Book Now →
                </button>
              </div>

              <div className="bg-white/5 p-4 rounded-lg border border-green-500/30">
                <div className="bg-green-500/20 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                  <Briefcase className="h-5 w-5 text-green-300" />
                </div>
                <h3 className="text-white font-semibold mb-2">Apply to Top Matches</h3>
                <p className="text-blue-200 text-sm mb-3">12 high-match jobs available</p>
                <button className="text-green-300 text-sm font-semibold hover:text-green-200">
                  View Jobs →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
