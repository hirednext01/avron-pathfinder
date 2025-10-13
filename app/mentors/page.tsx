'use client';

import Navigation from "../../components/Navigation";
import { Users, Star, Award, MessageCircle, Video, Calendar } from 'lucide-react';

const mockMentors = [
  {
    id: 1,
    name: 'Sarah Chen',
    title: 'Senior Software Architect',
    company: 'Google',
    specialties: ['System Design', 'Cloud Architecture', 'Leadership'],
    rating: 4.9,
    reviews: 127,
    sessions: 450,
    rate: '$150/hr',
    matchScore: 95,
    availability: 'Available this week'
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    title: 'Engineering Manager',
    company: 'Amazon',
    specialties: ['Career Growth', 'Team Management', 'Technical Strategy'],
    rating: 4.8,
    reviews: 98,
    sessions: 320,
    rate: '$120/hr',
    matchScore: 88,
    availability: 'Available next week'
  },
  {
    id: 3,
    name: 'Emily Watson',
    title: 'Lead Frontend Engineer',
    company: 'Meta',
    specialties: ['React', 'TypeScript', 'Performance Optimization'],
    rating: 4.9,
    reviews: 156,
    sessions: 580,
    rate: '$130/hr',
    matchScore: 92,
    availability: 'Available this week'
  },
  {
    id: 4,
    name: 'David Kim',
    title: 'Principal DevOps Engineer',
    company: 'Netflix',
    specialties: ['AWS', 'Kubernetes', 'CI/CD', 'Infrastructure'],
    rating: 4.7,
    reviews: 89,
    sessions: 275,
    rate: '$140/hr',
    matchScore: 85,
    availability: 'Limited availability'
  }
];

export default function MentorsPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Find Your Mentor</h1>
            <p className="text-purple-200 text-lg">Connect with experienced professionals who can guide your career growth</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mockMentors.map((mentor) => (
              <div key={mentor.id} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all">
                <div className="flex gap-4 mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-bold text-white">{mentor.name}</h2>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        mentor.matchScore >= 90 ? 'bg-green-500/20 text-green-200' :
                        mentor.matchScore >= 85 ? 'bg-blue-500/20 text-blue-200' :
                        'bg-yellow-500/20 text-yellow-200'
                      }`}>
                        {mentor.matchScore}% Match
                      </span>
                    </div>
                    <p className="text-purple-200 font-medium">{mentor.title}</p>
                    <p className="text-purple-300 text-sm">{mentor.company}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1 text-yellow-300">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-semibold">{mentor.rating}</span>
                    <span className="text-purple-200">({mentor.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-purple-200">
                    <Users className="h-4 w-4" />
                    <span>{mentor.sessions} sessions</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-purple-200 text-sm mb-2 font-medium">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.specialties.map((specialty, idx) => (
                      <span key={idx} className="bg-purple-500/20 text-purple-100 px-3 py-1 rounded-full text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2 text-purple-200">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{mentor.availability}</span>
                  </div>
                  <span className="text-green-300 font-bold text-lg">{mentor.rate}</span>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all flex items-center justify-center gap-2">
                    <Video className="h-5 w-5" />
                    Book Session
                  </button>
                  <button className="px-6 py-3 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-all">
                    <MessageCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
