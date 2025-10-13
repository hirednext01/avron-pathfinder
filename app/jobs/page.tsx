'use client';

import Navigation from "../../components/Navigation";
import { Briefcase, MapPin, DollarSign, Clock, Building } from 'lucide-react';

const mockJobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    salary: '$150k - $200k',
    type: 'Full-time',
    posted: '2 days ago',
    match: 95,
    skills: ['React', 'TypeScript', 'Node.js', 'AWS']
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'StartupXYZ',
    location: 'Remote',
    salary: '$120k - $150k',
    type: 'Full-time',
    posted: '1 week ago',
    match: 88,
    skills: ['React', 'CSS', 'JavaScript']
  },
  {
    id: 3,
    title: 'Full Stack Engineer',
    company: 'Enterprise Co',
    location: 'New York, NY',
    salary: '$140k - $180k',
    type: 'Full-time',
    posted: '3 days ago',
    match: 82,
    skills: ['Python', 'React', 'PostgreSQL']
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'Cloud Solutions',
    location: 'Austin, TX',
    salary: '$130k - $170k',
    type: 'Full-time',
    posted: '5 days ago',
    match: 75,
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD']
  }
];

export default function JobsPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Job Matches</h1>
            <p className="text-blue-200 text-lg">AI-powered job recommendations based on your skills and experience</p>
          </div>

          <div className="grid gap-6">
            {mockJobs.map((job) => (
              <div key={job.id} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-white">{job.title}</h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        job.match >= 90 ? 'bg-green-500/20 text-green-200' :
                        job.match >= 80 ? 'bg-blue-500/20 text-blue-200' :
                        'bg-yellow-500/20 text-yellow-200'
                      }`}>
                        {job.match}% Match
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-200 mb-3">
                      <Building className="h-4 w-4" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-blue-100">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-200">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm font-semibold">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-100">
                    <Briefcase className="h-4 w-4" />
                    <span className="text-sm">{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-100">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{job.posted}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-blue-200 mb-2">Required Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, idx) => (
                      <span key={idx} className="bg-blue-500/20 text-blue-100 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all">
                    Apply Now
                  </button>
                  <button className="px-6 py-3 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-all">
                    Save
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
