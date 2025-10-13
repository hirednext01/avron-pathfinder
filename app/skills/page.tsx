'use client';

import Navigation from "../../components/Navigation";
import { Target, TrendingUp, Award, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const skillsData = {
  current: [
    { name: 'React', level: 90, status: 'expert', trend: '+5%' },
    { name: 'JavaScript', level: 85, status: 'expert', trend: '+3%' },
    { name: 'TypeScript', level: 75, status: 'proficient', trend: '+10%' },
    { name: 'CSS/Tailwind', level: 80, status: 'expert', trend: '+2%' },
    { name: 'Node.js', level: 65, status: 'proficient', trend: '+8%' },
    { name: 'Python', level: 60, status: 'intermediate', trend: '+5%' }
  ],
  gaps: [
    { name: 'AWS', priority: 'high', demand: 95, impact: '+$25k salary' },
    { name: 'Kubernetes', priority: 'high', demand: 88, impact: '+$20k salary' },
    { name: 'System Design', priority: 'medium', demand: 92, impact: 'Career advancement' },
    { name: 'GraphQL', priority: 'medium', demand: 75, impact: '+$15k salary' }
  ]
};

export default function SkillsPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-900 to-blue-900">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Skills Assessment</h1>
            <p className="text-blue-200 text-lg">Comprehensive analysis of your skills and development opportunities</p>
          </div>

          {/* Overall Score */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white mb-2">Overall Skill Score</h2>
                <p className="text-blue-200">Based on market demand and your proficiency levels</p>
              </div>
              <div className="relative">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gray-900 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-white">85</span>
                    <span className="text-teal-300 text-sm">/ 100</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500/20 text-green-200 px-3 py-1 rounded-full text-sm font-semibold">
                  +7% this month
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Current Skills */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Award className="h-6 w-6 text-teal-300" />
                <h2 className="text-2xl font-bold text-white">Current Skills</h2>
              </div>

              <div className="space-y-4">
                {skillsData.current.map((skill, idx) => (
                  <div key={idx} className="bg-white/5 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-semibold">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-300 text-sm">{skill.trend}</span>
                        {skill.status === 'expert' && <CheckCircle className="h-4 w-4 text-green-400" />}
                        {skill.status === 'proficient' && <AlertCircle className="h-4 w-4 text-yellow-400" />}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-white/10 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            skill.level >= 80 ? 'bg-gradient-to-r from-green-400 to-teal-400' :
                            skill.level >= 60 ? 'bg-gradient-to-r from-blue-400 to-cyan-400' :
                            'bg-gradient-to-r from-yellow-400 to-orange-400'
                          }`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-blue-200 text-sm font-medium w-12">{skill.level}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Gaps */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Target className="h-6 w-6 text-orange-300" />
                <h2 className="text-2xl font-bold text-white">Skill Gaps to Address</h2>
              </div>

              <div className="space-y-4">
                {skillsData.gaps.map((gap, idx) => (
                  <div key={idx} className="bg-white/5 p-4 rounded-lg border border-orange-500/30 hover:border-orange-500/50 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-white font-semibold text-lg">{gap.name}</h3>
                        <p className="text-blue-200 text-sm">{gap.impact}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        gap.priority === 'high' ? 'bg-red-500/20 text-red-200' :
                        'bg-yellow-500/20 text-yellow-200'
                      }`}>
                        {gap.priority} priority
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-teal-300" />
                        <span className="text-teal-200 text-sm">Market demand: {gap.demand}%</span>
                      </div>
                      <button className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-teal-600 hover:to-blue-700 transition-all">
                        Learn Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Items */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Recommended Actions</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-teal-500/10 to-blue-500/10 border border-teal-500/30 p-5 rounded-lg">
                <div className="bg-teal-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-teal-300" />
                </div>
                <h3 className="text-white font-bold mb-2">Take Assessments</h3>
                <p className="text-blue-200 text-sm mb-4">Complete skill tests to validate your expertise</p>
                <button className="text-teal-300 font-semibold text-sm hover:text-teal-200">
                  Start Testing →
                </button>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 p-5 rounded-lg">
                <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-blue-300" />
                </div>
                <h3 className="text-white font-bold mb-2">Bridge Skill Gaps</h3>
                <p className="text-blue-200 text-sm mb-4">Enroll in courses for high-priority skills</p>
                <button className="text-blue-300 font-semibold text-sm hover:text-blue-200">
                  View Courses →
                </button>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 p-5 rounded-lg">
                <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-300" />
                </div>
                <h3 className="text-white font-bold mb-2">Track Progress</h3>
                <p className="text-blue-200 text-sm mb-4">Monitor your skill development over time</p>
                <button className="text-purple-300 font-semibold text-sm hover:text-purple-200">
                  View Analytics →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
