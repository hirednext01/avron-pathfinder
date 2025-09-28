'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../src/integrations/supabase/client';
import Navigation from '../../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';
import { User, Mail, MapPin, Briefcase, GraduationCap } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [profile, setProfile] = useState<{ name?: string; email?: string; location?: string; current_title?: string; education?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        const { data } = await supabase
          .from('candidates')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
        
        setProfile(data);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
            Career Profile
          </h1>
          
          {loading ? (
            <div className="text-center py-20">Loading profile...</div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <User className="mr-2 h-5 w-5 text-blue-300" />
                    {profile?.name || user?.email || 'Your Profile'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-200 mb-4">Contact Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center text-white">
                          <Mail className="h-4 w-4 mr-3 text-blue-300" />
                          {profile?.email || user?.email || 'Not provided'}
                        </div>
                        <div className="flex items-center text-white">
                          <MapPin className="h-4 w-4 mr-3 text-blue-300" />
                          {profile?.location || 'Not specified'}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-200 mb-4">Career Details</h3>
                      <div className="space-y-3">
                        <div className="flex items-center text-white">
                          <Briefcase className="h-4 w-4 mr-3 text-blue-300" />
                          {profile?.current_title || 'Not specified'}
                        </div>
                        <div className="flex items-center text-white">
                          <GraduationCap className="h-4 w-4 mr-3 text-blue-300" />
                          {profile?.education || 'Not provided'}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
}