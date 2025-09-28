'use client';

import Link from 'next/link';
import Navigation from "../components/Navigation";
import { BarChart3Icon, BriefcaseIcon, CalculatorIcon, TrendingUpIcon, BookOpenIcon, UsersIcon } from 'lucide-react';

export default function Page() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0E1116] text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Avron Career Intelligence Platform
            </h1>
            <p className="text-xl text-[#8A98A9] max-w-3xl mx-auto">
              AI-Powered Career Analytics & Development - Transform your career trajectory with data-driven insights
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Link href="/benchmark" className="group">
              <div className="bg-[#121826] border border-[#1C2541] hover:border-[#D4AF37] rounded-xl p-8 transition-all duration-300 group-hover:scale-105">
                <div className="mb-6 p-4 bg-[#D4AF37]/10 rounded-full w-fit group-hover:bg-[#D4AF37]/20">
                  <BarChart3Icon className="h-8 w-8 text-[#D4AF37]" />
                </div>
                <h2 className="text-2xl font-semibold mb-3">Skills Benchmark</h2>
                <p className="text-[#8A98A9]">Compare your skills against market standards and get personalized improvement recommendations</p>
              </div>
            </Link>

            <Link href="/jobs" className="group">
              <div className="bg-[#121826] border border-[#1C2541] hover:border-[#D4AF37] rounded-xl p-8 transition-all duration-300 group-hover:scale-105">
                <div className="mb-6 p-4 bg-[#D4AF37]/10 rounded-full w-fit group-hover:bg-[#D4AF37]/20">
                  <BriefcaseIcon className="h-8 w-8 text-[#D4AF37]" />
                </div>
                <h2 className="text-2xl font-semibold mb-3">Job Opportunities</h2>
                <p className="text-[#8A98A9]">Find opportunities matched to your profile with AI-powered job recommendations</p>
              </div>
            </Link>

            <Link href="/roi-dashboard" className="group">
              <div className="bg-[#121826] border border-[#1C2541] hover:border-[#D4AF37] rounded-xl p-8 transition-all duration-300 group-hover:scale-105">
                <div className="mb-6 p-4 bg-[#D4AF37]/10 rounded-full w-fit group-hover:bg-[#D4AF37]/20">
                  <CalculatorIcon className="h-8 w-8 text-[#D4AF37]" />
                </div>
                <h2 className="text-2xl font-semibold mb-3">ROI Calculator</h2>
                <p className="text-[#8A98A9]">Calculate your career growth potential and investment returns</p>
              </div>
            </Link>

            <Link href="/courses" className="group">
              <div className="bg-[#121826] border border-[#1C2541] hover:border-[#D4AF37] rounded-xl p-8 transition-all duration-300 group-hover:scale-105">
                <div className="mb-6 p-4 bg-[#D4AF37]/10 rounded-full w-fit group-hover:bg-[#D4AF37]/20">
                  <BookOpenIcon className="h-8 w-8 text-[#D4AF37]" />
                </div>
                <h2 className="text-2xl font-semibold mb-3">Recommended Courses</h2>
                <p className="text-[#8A98A9]">Personalized course recommendations to bridge your skill gaps</p>
              </div>
            </Link>

            <Link href="/mentors" className="group">
              <div className="bg-[#121826] border border-[#1C2541] hover:border-[#D4AF37] rounded-xl p-8 transition-all duration-300 group-hover:scale-105">
                <div className="mb-6 p-4 bg-[#D4AF37]/10 rounded-full w-fit group-hover:bg-[#D4AF37]/20">
                  <UsersIcon className="h-8 w-8 text-[#D4AF37]" />
                </div>
                <h2 className="text-2xl font-semibold mb-3">Expert Mentors</h2>
                <p className="text-[#8A98A9]">Connect with industry experts for personalized career guidance</p>
              </div>
            </Link>

            <Link href="/results" className="group">
              <div className="bg-[#121826] border border-[#1C2541] hover:border-[#D4AF37] rounded-xl p-8 transition-all duration-300 group-hover:scale-105">
                <div className="mb-6 p-4 bg-[#D4AF37]/10 rounded-full w-fit group-hover:bg-[#D4AF37]/20">
                  <TrendingUpIcon className="h-8 w-8 text-[#D4AF37]" />
                </div>
                <h2 className="text-2xl font-semibold mb-3">Your Results</h2>
                <p className="text-[#8A98A9]">View your personalized recommendations and career insights</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
