'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../src/integrations/supabase/client';
import Navigation from '../../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Button } from '../../src/components/ui/button';
import { Input } from '../../src/components/ui/input';
import { 
  Users, 
  Star, 
  Calendar, 
  MessageCircle, 
  Video,
  Search,
  Filter,
  DollarSign,
  Award,
  Clock
} from 'lucide-react';

interface Mentor {
  id: string;
  name?: string;
  display_name?: string;
  title?: string;
  specialties?: string[];
  rate?: number;
  currency?: string;
  rating?: number;
  availability?: string;
  rate_per_min?: number;
  headline?: string;
}

export default function MentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');

  useEffect(() => {
    loadMentors();
  }, []);

  useEffect(() => {
    filterMentors();
  }, [mentors, searchTerm, specialtyFilter]);

  const loadMentors = async () => {
    try {
      // Try both mentor tables
      const [mentorsResult, profilesResult] = await Promise.all([
        supabase.from('mentors').select('*').limit(20),
        supabase.from('mentorship_profiles').select('*').limit(20)
      ]);

      let mentorData: Mentor[] = [];

      // Combine data from both tables if available
      if (mentorsResult.data && mentorsResult.data.length > 0) {
        mentorData = [...mentorData, ...mentorsResult.data];
      }

      if (profilesResult.data && profilesResult.data.length > 0) {
        mentorData = [...mentorData, ...profilesResult.data];
      }

      // If no data, use demo mentors
      if (mentorData.length === 0) {
        mentorData = [
          {
            id: '1',
            name: 'Sarah Chen',
            title: 'Senior Software Engineer at Google',
            specialties: ['React', 'System Design', 'Career Growth'],
            rate: 150,
            currency: 'USD',
            rating: 4.9,
            availability: 'Weekends',
            headline: 'Helping developers advance to senior roles'
          },
          {
            id: '2',
            name: 'Marcus Johnson',
            title: 'Data Science Director at Meta',
            specialties: ['Machine Learning', 'Python', 'Team Leadership'],
            rate: 180,
            currency: 'USD',
            rating: 4.8,
            availability: 'Evenings',
            headline: 'From IC to management in data science'
          },
          {
            id: '3',
            name: 'Emily Rodriguez',
            title: 'Product Manager at Stripe',
            specialties: ['Product Strategy', 'Analytics', 'Go-to-Market'],
            rate: 140,
            currency: 'USD',
            rating: 4.9,
            availability: 'Flexible',
            headline: 'Product management from 0 to 1'
          },
          {
            id: '4',
            name: 'David Kim',
            title: 'Principal Engineer at Amazon',
            specialties: ['Cloud Architecture', 'AWS', 'Scalability'],
            rate: 200,
            currency: 'USD',
            rating: 4.7,
            availability: 'Weekends',
            headline: 'Building systems that scale to millions'
          },
          {
            id: '5',
            name: 'Lisa Thompson',
            title: 'UX Design Lead at Airbnb',
            specialties: ['User Research', 'Design Systems', 'Prototyping'],
            rate: 130,
            currency: 'USD',
            rating: 4.8,
            availability: 'Mornings',
            headline: 'Design thinking for product success'
          },
          {
            id: '6',
            name: 'Ahmed Hassan',
            title: 'DevOps Manager at Netflix',
            specialties: ['Kubernetes', 'CI/CD', 'Site Reliability'],
            rate: 160,
            currency: 'USD',
            rating: 4.6,
            availability: 'Evenings',
            headline: 'DevOps best practices for high-scale'
          }
        ];
      }

      setMentors(mentorData);
    } catch (error) {
      console.error('Error loading mentors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMentors = () => {
    let filtered = mentors;

    if (searchTerm) {
      filtered = filtered.filter(mentor => 
        (mentor.name && mentor.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (mentor.display_name && mentor.display_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (mentor.title && mentor.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (mentor.headline && mentor.headline.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (mentor.specialties && mentor.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    if (specialtyFilter) {
      filtered = filtered.filter(mentor =>
        mentor.specialties && mentor.specialties.some(s => 
          s.toLowerCase().includes(specialtyFilter.toLowerCase())
        )
      );
    }

    setFilteredMentors(filtered);
  };

  const formatRate = (mentor: Mentor) => {
    const rate = mentor.rate || mentor.rate_per_min;
    const currency = mentor.currency || 'USD';
    
    if (!rate) return 'Contact for rate';
    
    if (mentor.rate_per_min) {
      return `$${rate}/min`;
    }
    
    return `$${rate}/hour`;
  };

  const bookSession = (mentorId: string) => {
    // TODO: Implement booking functionality
    alert(`Booking session with mentor ${mentorId}. This would connect to a booking system.`);
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-20">
              <div className="text-xl text-blue-100">Loading mentors...</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Get unique specialties for filter
  const allSpecialties = [...new Set(mentors.flatMap(m => m.specialties || []))];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent flex items-center justify-center">
              <Users className="mr-3 h-10 w-10 text-blue-300" />
              Expert Mentors
            </h1>
            <p className="text-xl text-blue-100">
              Connect with {mentors.length} industry experts for personalized career guidance
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm mb-8">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-blue-300" />
                  <Input
                    placeholder="Search mentors, skills, companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-3 h-4 w-4 text-blue-300" />
                  <select
                    value={specialtyFilter}
                    onChange={(e) => setSpecialtyFilter(e.target.value)}
                    className="pl-10 w-full h-10 bg-white/10 border border-white/20 text-white rounded-md"
                  >
                    <option value="" className="bg-slate-800">All Specialties</option>
                    {allSpecialties.map(specialty => (
                      <option key={specialty} value={specialty} className="bg-slate-800">
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>
                <Button 
                  onClick={() => { setSearchTerm(''); setSpecialtyFilter(''); }}
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-blue-200">
              Showing {filteredMentors.length} of {mentors.length} mentors
            </p>
          </div>

          {/* Mentors Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {(mentor.name || mentor.display_name || 'M')[0]}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-semibold text-white mb-1">
                        {mentor.name || mentor.display_name || 'Anonymous Mentor'}
                      </CardTitle>
                      <p className="text-blue-200 mb-2">{mentor.title || 'Industry Expert'}</p>
                      {mentor.headline && (
                        <p className="text-sm text-blue-300">{mentor.headline}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-300">
                        {formatRate(mentor)}
                      </div>
                      {mentor.rating && (
                        <div className="flex items-center text-yellow-400 mt-1">
                          <Star className="h-4 w-4 fill-current mr-1" />
                          <span className="text-sm">{mentor.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {mentor.specialties && mentor.specialties.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-blue-200 mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {mentor.specialties.map((specialty, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-sm border border-blue-400/30"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {mentor.availability && (
                    <div className="flex items-center text-blue-200 mb-6">
                      <Clock className="h-4 w-4 mr-2 text-blue-300" />
                      <span className="text-sm">Available: {mentor.availability}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Chat
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      <Video className="h-4 w-4 mr-1" />
                      Video
                    </Button>
                    <Button
                      onClick={() => bookSession(mentor.id)}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      size="sm"
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      Book
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMentors.length === 0 && (
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Search className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Mentors Found</h3>
                <p className="text-blue-200 mb-6">Try adjusting your search criteria or clear the filters</p>
                <Button 
                  onClick={() => { setSearchTerm(''); setSpecialtyFilter(''); }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Reset Search
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-blue-800/50 to-purple-800/50 border-white/20 backdrop-blur-sm mt-12">
            <CardContent className="p-8 text-center">
              <Award className="h-12 w-12 text-blue-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Become a Mentor</h3>
              <p className="text-blue-100 mb-6">
                Share your expertise and help others advance their careers while earning extra income.
              </p>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-8">
                Apply to Mentor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}