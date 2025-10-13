'use client';

import Navigation from "../../components/Navigation";
import { BookOpen, Clock, Award, TrendingUp, Star } from 'lucide-react';

const mockCourses = [
  {
    id: 1,
    title: 'Advanced React & TypeScript',
    provider: 'Udemy',
    rating: 4.8,
    students: '25,430',
    duration: '12 hours',
    level: 'Advanced',
    price: '$89.99',
    skillsGain: ['React Hooks', 'TypeScript', 'State Management'],
    matchScore: 95
  },
  {
    id: 2,
    title: 'AWS Cloud Practitioner',
    provider: 'Coursera',
    rating: 4.7,
    students: '18,920',
    duration: '16 hours',
    level: 'Intermediate',
    price: '$49.99',
    skillsGain: ['AWS', 'Cloud Computing', 'DevOps'],
    matchScore: 88
  },
  {
    id: 3,
    title: 'Python for Data Science',
    provider: 'DataCamp',
    rating: 4.9,
    students: '32,100',
    duration: '20 hours',
    level: 'Beginner',
    price: '$79.99',
    skillsGain: ['Python', 'Pandas', 'NumPy', 'Data Analysis'],
    matchScore: 82
  },
  {
    id: 4,
    title: 'System Design Masterclass',
    provider: 'Educative',
    rating: 4.8,
    students: '15,670',
    duration: '10 hours',
    level: 'Advanced',
    price: '$99.99',
    skillsGain: ['System Design', 'Scalability', 'Architecture'],
    matchScore: 91
  }
];

export default function CoursesPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Recommended Courses</h1>
            <p className="text-blue-200 text-lg">Personalized course recommendations to bridge your skill gaps</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mockCourses.map((course) => (
              <div key={course.id} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-purple-500/20 text-purple-200 px-2 py-1 rounded text-xs font-semibold">
                        {course.provider}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        course.matchScore >= 90 ? 'bg-green-500/20 text-green-200' :
                        course.matchScore >= 80 ? 'bg-blue-500/20 text-blue-200' :
                        'bg-yellow-500/20 text-yellow-200'
                      }`}>
                        {course.matchScore}% Match
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">{course.title}</h2>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1 text-yellow-300">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                  <div className="text-blue-200">
                    {course.students} students
                  </div>
                  <div className="flex items-center gap-1 text-blue-200">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-blue-500/20 text-blue-100 px-3 py-1 rounded-full text-sm">
                    {course.level}
                  </span>
                  <span className="text-green-300 font-bold text-lg">
                    {course.price}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 text-blue-200 mb-2">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">Skills you'll gain:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {course.skillsGain.map((skill, idx) => (
                      <span key={idx} className="bg-indigo-500/20 text-indigo-100 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Enroll Now
                  </button>
                  <button className="px-6 py-3 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-all">
                    <Award className="h-5 w-5" />
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
