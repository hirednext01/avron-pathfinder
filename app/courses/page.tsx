'use client';

import Navigation from "../../components/Navigation";
import { Star, Clock, Users, ExternalLink } from 'lucide-react';

const sampleCourses = [
  {
    id: 1,
    title: 'Complete React Developer Course',
    provider: 'TechAcademy',
    rating: 4.8,
    duration: '12 weeks',
    students: '25,432',
    price: '₹12,999',
    skills: ['React', 'JavaScript', 'Redux', 'Node.js'],
    image: '/api/placeholder/300/200'
  },
  {
    id: 2,
    title: 'Data Science & Machine Learning',
    provider: 'DataLearn',
    rating: 4.9,
    duration: '16 weeks',
    students: '18,256',
    price: '₹18,999',
    skills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
    image: '/api/placeholder/300/200'
  },
  {
    id: 3,
    title: 'Full Stack Web Development',
    provider: 'CodeMasters',
    rating: 4.7,
    duration: '20 weeks',
    students: '32,180',
    price: '₹24,999',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'MongoDB'],
    image: '/api/placeholder/300/200'
  }
];

export default function CoursesPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0E1116] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#D4AF37] mb-4">Recommended Courses</h1>
            <p className="text-xl text-[#8A98A9] max-w-2xl mx-auto">
              Accelerate your career with courses tailored to your skill gaps and career goals
            </p>
          </div>

          {/* Filters */}
          <div className="bg-[#121826] p-6 rounded-xl border border-[#1C2541] mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <select className="bg-[#1C2541] border border-[#2A3441] rounded-lg px-3 py-2">
                <option>All Categories</option>
                <option>Web Development</option>
                <option>Data Science</option>
                <option>AI/ML</option>
                <option>DevOps</option>
              </select>
              <select className="bg-[#1C2541] border border-[#2A3441] rounded-lg px-3 py-2">
                <option>All Levels</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <select className="bg-[#1C2541] border border-[#2A3441] rounded-lg px-3 py-2">
                <option>Any Duration</option>
                <option>1-4 weeks</option>
                <option>1-3 months</option>
                <option>3-6 months</option>
              </select>
              <button className="bg-[#D4AF37] text-black rounded-lg px-4 py-2 hover:bg-[#D4AF37]/90">
                Filter
              </button>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {sampleCourses.map(course => (
              <div key={course.id} className="bg-[#121826] rounded-xl border border-[#1C2541] overflow-hidden hover:border-[#D4AF37] transition-colors">
                <div className="h-48 bg-[#1C2541] flex items-center justify-center">
                  <div className="text-[#8A98A9] text-center">
                    <div className="text-6xl mb-2">📚</div>
                    <div>Course Preview</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#D4AF37]">{course.provider}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm">{course.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3 line-clamp-2">{course.title}</h3>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-[#8A98A9]">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="px-2 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded text-xs">
                        {skill}
                      </span>
                    ))}
                    {course.skills.length > 3 && (
                      <span className="px-2 py-1 bg-[#1C2541] text-[#8A98A9] rounded text-xs">
                        +{course.skills.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-[#D4AF37]">{course.price}</span>
                    <button className="bg-[#D4AF37] text-black px-4 py-2 rounded-lg hover:bg-[#D4AF37]/90 flex items-center">
                      Enroll
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-[#121826] border border-[#1C2541] text-white px-8 py-3 rounded-lg hover:border-[#D4AF37] transition-colors">
              Load More Courses
            </button>
          </div>
        </div>
      </div>
    </>
  );
}