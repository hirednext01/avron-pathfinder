'use client';

import Navigation from "../../components/Navigation";
import { DollarSign, TrendingUp, Calendar, Calculator, PieChart } from 'lucide-react';
import { useState } from 'react';

export default function ROIPage() {
  const [currentSalary, setCurrentSalary] = useState(80000);
  const [targetSalary, setTargetSalary] = useState(120000);
  const [investmentCost, setInvestmentCost] = useState(5000);
  const [timeMonths, setTimeMonths] = useState(12);

  const salaryIncrease = targetSalary - currentSalary;
  const roi = ((salaryIncrease - investmentCost) / investmentCost * 100).toFixed(1);
  const monthlyGain = (salaryIncrease / 12).toFixed(0);
  const breakEvenMonths = (investmentCost / (salaryIncrease / 12)).toFixed(1);

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-teal-900">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">ROI Calculator</h1>
            <p className="text-emerald-200 text-lg">Calculate the return on investment for your career development</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="h-6 w-6 text-emerald-300" />
                <h2 className="text-2xl font-bold text-white">Your Information</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Current Annual Salary</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-300" />
                    <input
                      type="number"
                      value={currentSalary}
                      onChange={(e) => setCurrentSalary(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Target Annual Salary</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-300" />
                    <input
                      type="number"
                      value={targetSalary}
                      onChange={(e) => setTargetSalary(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Total Investment Cost</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-300" />
                    <input
                      type="number"
                      value={investmentCost}
                      onChange={(e) => setInvestmentCost(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                  <p className="text-emerald-200 text-sm mt-2">Includes courses, certifications, and mentoring</p>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Timeline (months)</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-300" />
                    <input
                      type="number"
                      value={timeMonths}
                      onChange={(e) => setTimeMonths(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-lg border border-emerald-400/30 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <PieChart className="h-8 w-8 text-emerald-300" />
                  <h2 className="text-3xl font-bold text-white">ROI Analysis</h2>
                </div>
                <div className="text-center py-6">
                  <div className="text-6xl font-bold text-emerald-300 mb-2">{roi}%</div>
                  <p className="text-emerald-100 text-lg">Return on Investment</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                  <TrendingUp className="h-6 w-6 text-green-300 mb-3" />
                  <p className="text-emerald-200 text-sm mb-1">Salary Increase</p>
                  <p className="text-2xl font-bold text-white">${salaryIncrease.toLocaleString()}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                  <DollarSign className="h-6 w-6 text-blue-300 mb-3" />
                  <p className="text-emerald-200 text-sm mb-1">Monthly Gain</p>
                  <p className="text-2xl font-bold text-white">${monthlyGain}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                  <Calendar className="h-6 w-6 text-purple-300 mb-3" />
                  <p className="text-emerald-200 text-sm mb-1">Break-even</p>
                  <p className="text-2xl font-bold text-white">{breakEvenMonths} mo</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                  <Calculator className="h-6 w-6 text-yellow-300 mb-3" />
                  <p className="text-emerald-200 text-sm mb-1">5-Year Gain</p>
                  <p className="text-2xl font-bold text-white">${(salaryIncrease * 5).toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Investment Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-emerald-200">Courses & Training</span>
                    <span className="text-white font-semibold">${(investmentCost * 0.6).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-emerald-200">Mentorship</span>
                    <span className="text-white font-semibold">${(investmentCost * 0.3).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-emerald-200">Resources & Tools</span>
                    <span className="text-white font-semibold">${(investmentCost * 0.1).toFixed(0)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-4 rounded-lg font-bold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all">
                Start Your Investment Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
