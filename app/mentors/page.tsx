'use client';

import Navigation from "../../components/Navigation";
import { Star, Calendar, MessageCircle, Video } from 'lucide-react';

const sampleMentors = [
  {
    id: 1,
    name: 'Sarah Chen',
    title: 'Senior Software Engineer at Google',
    rating: 4.9,
    reviews: 127,
    rate: '₹2,500/hour',
    specialties: ['React', 'System Design', 'Career Growth'],
    experience: '8+ years',
    image: '/api/placeholder/100/100'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    title: 'Data Science Lead at Microsoft',
    rating: 4.8,
    reviews: 89,
    rate: '₹3,000/hour',
    specialties: ['Machine Learning', 'Python', 'Statistics'],
    experience: '10+ years',
    image: '/api/placeholder/100/100'
  },
  {
    id: 3,
    name: 'Amanda Rodriguez',
    title: 'Product Manager at Meta',
    rating: 4.9,
    reviews: 156,
    rate: '₹2,800/hour',
    specialties: ['Product Strategy', 'Analytics', 'Leadership'],
    experience: '7+ years',
    image: '/api/placeholder/100/100'
  }
];

export default function MentorsPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0E1116] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#D4AF37] mb-4">Find Your Mentor</h1>
            <p className="text-xl text-[#8A98A9] max-w-2xl mx-auto">
              Connect with industry experts who can guide your career journey and help you achieve your goals
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-[#121826] p-6 rounded-xl border border-[#1C2541] mb-8">
            <div className="grid md:grid-cols-5 gap-4">
              <input 
                type="text" 
                placeholder="Search mentors..."
                className="bg-[#1C2541] border border-[#2A3441] rounded-lg px-3 py-2 md:col-span-2"
              />
              <select className="bg-[#1C2541] border border-[#2A3441] rounded-lg px-3 py-2">
                <option>All Specialties</option>
                <option>Web Development</option>
                <option>Data Science</option>
                <option>Product Management</option>
                <option>DevOps</option>
              </select>
              <select className="bg-[#1C2541] border border-[#2A3441] rounded-lg px-3 py-2">
                <option>Any Experience</option>
                <option>5-7 years</option>
                <option>7-10 years</option>
                <option>10+ years</option>
              </select>
              <button className="bg-[#D4AF37] text-black rounded-lg px-4 py-2 hover:bg-[#D4AF37]/90">
                Search
              </button>
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {sampleMentors.map(mentor => (
              <div key={mentor.id} className="bg-[#121826] rounded-xl border border-[#1C2541] p-6 hover:border-[#D4AF37] transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-[#1C2541] rounded-full flex items-center justify-center">
                    <span className="text-2xl">👨‍💼</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{mentor.name}</h3>
                    <p className="text-[#8A98A9] mb-2">{mentor.title}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span>{mentor.rating}</span>
                        <span className="text-[#8A98A9] ml-1">({mentor.reviews} reviews)</span>
                      </div>
                      <span className="text-[#D4AF37]">{mentor.experience}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#D4AF37]">{mentor.rate}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {mentor.specialties.map(specialty => (
                      <span key={specialty} className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button className="flex items-center justify-center gap-2 bg-[#1C2541] border border-[#2A3441] rounded-lg px-3 py-2 hover:border-[#D4AF37] transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">Chat</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-[#1C2541] border border-[#2A3441] rounded-lg px-3 py-2 hover:border-[#D4AF37] transition-colors">
                    <Video className="h-4 w-4" />
                    <span className="text-sm">Video</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-[#D4AF37] text-black rounded-lg px-3 py-2 hover:bg-[#D4AF37]/90">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Book</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-[#121826] border border-[#1C2541] text-white px-8 py-3 rounded-lg hover:border-[#D4AF37] transition-colors">
              Load More Mentors
            </button>
          </div>
        </div>
      </div>
    </>
  );
}