'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../src/integrations/supabase/client';
import Navigation from '../../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Button } from '../../src/components/ui/button';
import { Input } from '../../src/components/ui/input';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Save, 
  BarChart3,
  Target,
  Clock
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface ROIInputs {
  currentSalary: number;
  targetSalary: number;
  investmentCost: number;
  timeToTarget: number;
  jobTitle?: string;
  company?: string;
}

interface ROIResults {
  annualIncrease: number;
  monthlyIncrease: number;
  roiPercentage: number;
  breakEvenMonths: number;
  fiveYearGain: number;
  totalROI: number;
}

export default function ROIPage() {
  const [inputs, setInputs] = useState<ROIInputs>({
    currentSalary: 80000,
    targetSalary: 120000,
    investmentCost: 15000,
    timeToTarget: 12,
    jobTitle: '',
    company: ''
  });
  
  const [results, setResults] = useState<ROIResults | null>(null);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const searchParams = useSearchParams();

  useEffect(() => {
    // Pre-fill with URL params if available
    const jobTitle = searchParams?.get('job');
    const company = searchParams?.get('company');
    
    if (jobTitle || company) {
      setInputs(prev => ({
        ...prev,
        jobTitle: jobTitle || '',
        company: company || ''
      }));
    }

    checkUser();
  }, [searchParams]);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error('Error checking user:', error);
    }
  };

  const calculateROI = () => {
    const annualIncrease = inputs.targetSalary - inputs.currentSalary;
    const monthlyIncrease = annualIncrease / 12;
    const breakEvenMonths = monthlyIncrease > 0 ? Math.ceil(inputs.investmentCost / monthlyIncrease) : 0;
    const fiveYearGain = annualIncrease * 5;
    const totalROI = fiveYearGain - inputs.investmentCost;
    const roiPercentage = inputs.investmentCost > 0 ? (totalROI / inputs.investmentCost) * 100 : 0;

    const calculatedResults: ROIResults = {
      annualIncrease,
      monthlyIncrease,
      roiPercentage,
      breakEvenMonths,
      fiveYearGain,
      totalROI
    };

    setResults(calculatedResults);
  };

  const saveCalculation = async () => {
    if (!user || !results) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('enhanced_roi_calculations')
        .insert({
          user_id: user.id,
          current_market_value: inputs.currentSalary,
          projected_salary_1_year: inputs.targetSalary,
          projected_salary_5_year: inputs.targetSalary + (inputs.targetSalary - inputs.currentSalary) * 0.5,
          total_investment_cost: inputs.investmentCost,
          roi_1_year_percentage: results.roiPercentage,
          roi_5_year_percentage: results.roiPercentage,
          payback_period_months: results.breakEvenMonths,
          time_investment_hours: inputs.timeToTarget * 40 // Assuming 40 hours per month
        });

      if (error) throw error;
      
      alert('ROI calculation saved successfully!');
    } catch (error) {
      console.error('Error saving calculation:', error);
      alert('Failed to save calculation. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(1)}%`;
  };

  useEffect(() => {
    calculateROI();
  }, [inputs]);

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent flex items-center justify-center">
              <Calculator className="mr-3 h-10 w-10 text-blue-300" />
              ROI Calculator
            </h1>
            <p className="text-xl text-blue-100">
              Calculate the return on investment for your career decisions
            </p>
            {(inputs.jobTitle || inputs.company) && (
              <div className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <p className="text-blue-200">
                  Calculating ROI for: <span className="text-white font-semibold">
                    {inputs.jobTitle} {inputs.company && `at ${inputs.company}`}
                  </span>
                </p>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Input Section */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="mr-2 h-5 w-5 text-blue-300" />
                  Investment Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Current Annual Salary
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-blue-300" />
                    <Input
                      type="number"
                      value={inputs.currentSalary}
                      onChange={(e) => setInputs(prev => ({ ...prev, currentSalary: Number(e.target.value) }))}
                      className="pl-10 bg-white/10 border-white/20 text-white"
                      placeholder="80000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Target Annual Salary
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-blue-300" />
                    <Input
                      type="number"
                      value={inputs.targetSalary}
                      onChange={(e) => setInputs(prev => ({ ...prev, targetSalary: Number(e.target.value) }))}
                      className="pl-10 bg-white/10 border-white/20 text-white"
                      placeholder="120000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Investment Cost (courses, certifications, etc.)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-blue-300" />
                    <Input
                      type="number"
                      value={inputs.investmentCost}
                      onChange={(e) => setInputs(prev => ({ ...prev, investmentCost: Number(e.target.value) }))}
                      className="pl-10 bg-white/10 border-white/20 text-white"
                      placeholder="15000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Time to Target Role (months)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-blue-300" />
                    <Input
                      type="number"
                      value={inputs.timeToTarget}
                      onChange={(e) => setInputs(prev => ({ ...prev, timeToTarget: Number(e.target.value) }))}
                      className="pl-10 bg-white/10 border-white/20 text-white"
                      placeholder="12"
                    />
                  </div>
                </div>

                {user && (
                  <Button 
                    onClick={saveCalculation}
                    disabled={saving || !results}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? 'Saving...' : 'Save Calculation'}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Results Section */}
            <div className="space-y-6">
              {results && (
                <>
                  {/* Key Metrics */}
                  <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <BarChart3 className="mr-2 h-5 w-5 text-blue-300" />
                        ROI Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-white/5 rounded-lg">
                          <div className="text-2xl font-bold text-green-300">
                            {formatPercentage(results.roiPercentage)}
                          </div>
                          <div className="text-sm text-blue-200">5-Year ROI</div>
                        </div>
                        <div className="text-center p-4 bg-white/5 rounded-lg">
                          <div className="text-2xl font-bold text-blue-300">
                            {results.breakEvenMonths} mo
                          </div>
                          <div className="text-sm text-blue-200">Break-Even</div>
                        </div>
                        <div className="text-center p-4 bg-white/5 rounded-lg">
                          <div className="text-2xl font-bold text-purple-300">
                            {formatCurrency(results.annualIncrease)}
                          </div>
                          <div className="text-sm text-blue-200">Annual Increase</div>
                        </div>
                        <div className="text-center p-4 bg-white/5 rounded-lg">
                          <div className="text-2xl font-bold text-indigo-300">
                            {formatCurrency(results.monthlyIncrease)}
                          </div>
                          <div className="text-sm text-blue-200">Monthly Increase</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Detailed Results */}
                  <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <TrendingUp className="mr-2 h-5 w-5 text-blue-300" />
                        Investment Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-white/10">
                        <span className="text-blue-200">Initial Investment:</span>
                        <span className="text-white font-semibold">{formatCurrency(inputs.investmentCost)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-white/10">
                        <span className="text-blue-200">5-Year Salary Gain:</span>
                        <span className="text-white font-semibold">{formatCurrency(results.fiveYearGain)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-white/10">
                        <span className="text-blue-200">Total Net Gain:</span>
                        <span className={`font-semibold ${results.totalROI > 0 ? 'text-green-300' : 'text-red-300'}`}>
                          {formatCurrency(results.totalROI)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-blue-200">Time to Break Even:</span>
                        <span className="text-white font-semibold flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {results.breakEvenMonths} months
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* ROI Interpretation */}
                  <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="text-center">
                        {results.roiPercentage > 100 ? (
                          <div className="text-green-300">
                            <div className="text-lg font-semibold mb-2">Excellent Investment! 🎉</div>
                            <p className="text-sm text-blue-200">
                              Your investment will pay for itself and generate significant returns over 5 years.
                            </p>
                          </div>
                        ) : results.roiPercentage > 50 ? (
                          <div className="text-blue-300">
                            <div className="text-lg font-semibold mb-2">Good Investment 👍</div>
                            <p className="text-sm text-blue-200">
                              This investment shows solid returns and career growth potential.
                            </p>
                          </div>
                        ) : results.roiPercentage > 0 ? (
                          <div className="text-yellow-300">
                            <div className="text-lg font-semibold mb-2">Moderate Returns ⚖️</div>
                            <p className="text-sm text-blue-200">
                              Consider if the non-monetary benefits justify this investment.
                            </p>
                          </div>
                        ) : (
                          <div className="text-red-300">
                            <div className="text-lg font-semibold mb-2">Reconsider Investment ⚠️</div>
                            <p className="text-sm text-blue-200">
                              This may not be the most cost-effective path to your goals.
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}