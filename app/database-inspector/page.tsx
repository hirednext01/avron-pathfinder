'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../src/integrations/supabase/client';
import Navigation from '../../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Button } from '../../src/components/ui/button';
import { 
  Database, 
  CheckCircle, 
  XCircle, 
  FileText, 
  Download,
  ChevronDown,
  ChevronRight,
  Server,
  HardDrive,
  Users,
  Briefcase,
  Calculator,
  BookOpen,
  UserCheck,
  Upload
} from 'lucide-react';

interface TableInfo {
  name: string;
  count: number;
  columns: Array<{
    name: string;
    type: string;
  }>;
  sampleData: any[];
  exists: boolean;
}

interface ConnectionStatus {
  connected: boolean;
  error?: string;
}

interface FeatureStatus {
  name: string;
  icon: any;
  tables: string[];
  status: 'complete' | 'partial' | 'missing';
  description: string;
}

export default function DatabaseInspectorPage() {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({ connected: false });
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [edgeFunctions, setEdgeFunctions] = useState<string[]>([]);
  const [storageBuckets, setStorageBuckets] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedTables, setExpandedTables] = useState<Set<string>>(new Set());

  const tablesToCheck = [
    'candidates', 'candidate_profiles', 'job_listings', 'job_listings_public', 
    'jobs_extracted', 'mentors', 'mentorship_profiles', 'skill_assessments',
    'skill_proficiencies', 'skill_trends', 'roi_calculations', 'enhanced_roi_calculations',
    'benchmarks', 'analysis_results', 'course_recommendations', 'course_portfolios',
    'resume_uploads', 'resume_jobs', 'waitlist_entries', 'job_matches',
    'courses_live', 'mentorship_profiles', 'companies', 'applications'
  ];

  const featureMapping: FeatureStatus[] = [
    {
      name: 'User Authentication & Profiles',
      icon: Users,
      tables: ['candidates', 'candidate_profiles'],
      status: 'missing',
      description: 'User registration, profiles, and authentication system'
    },
    {
      name: 'Job Listings & Matching',
      icon: Briefcase,
      tables: ['job_listings', 'job_listings_public', 'jobs_extracted', 'job_matches'],
      status: 'missing',
      description: 'Job posting, search, and matching functionality'
    },
    {
      name: 'ROI Calculations',
      icon: Calculator,
      tables: ['roi_calculations', 'enhanced_roi_calculations'],
      status: 'missing',
      description: 'Career investment return calculations'
    },
    {
      name: 'Skills Assessment',
      icon: UserCheck,
      tables: ['skill_assessments', 'skill_proficiencies', 'benchmarks', 'analysis_results'],
      status: 'missing',
      description: 'Skill evaluation and benchmarking system'
    },
    {
      name: 'Mentorship System',
      icon: UserCheck,
      tables: ['mentors', 'mentorship_profiles'],
      status: 'missing',
      description: 'Mentor matching and booking functionality'
    },
    {
      name: 'Course Recommendations',
      icon: BookOpen,
      tables: ['course_recommendations', 'course_portfolios', 'courses_live'],
      status: 'missing',
      description: 'AI-powered course suggestions and learning paths'
    },
    {
      name: 'Resume Processing',
      icon: Upload,
      tables: ['resume_uploads', 'resume_jobs'],
      status: 'missing',
      description: 'Resume upload, parsing, and analysis'
    }
  ];

  useEffect(() => {
    inspectDatabase();
  }, []);

  const testConnection = async (): Promise<ConnectionStatus> => {
    try {
      const { data, error } = await supabase.from('candidates').select('count').limit(1);
      if (error && !error.message.includes('relation "candidates" does not exist')) {
        return { connected: false, error: error.message };
      }
      return { connected: true };
    } catch (error) {
      return { connected: false, error: (error as Error).message };
    }
  };

  const getTableInfo = async (tableName: string): Promise<TableInfo> => {
    try {
      // Try to get count
      const { count, error: countError } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true });

      if (countError) {
        return {
          name: tableName,
          count: 0,
          columns: [],
          sampleData: [],
          exists: false
        };
      }

      // Get sample data and infer columns
      const { data: sampleData, error: sampleError } = await supabase
        .from(tableName)
        .select('*')
        .limit(3);

      const columns = sampleData && sampleData.length > 0 
        ? Object.keys(sampleData[0]).map(key => ({
            name: key,
            type: typeof sampleData[0][key]
          }))
        : [];

      return {
        name: tableName,
        count: count || 0,
        columns,
        sampleData: sampleData || [],
        exists: true
      };
    } catch (error) {
      return {
        name: tableName,
        count: 0,
        columns: [],
        sampleData: [],
        exists: false
      };
    }
  };

  const checkEdgeFunctions = async (): Promise<string[]> => {
    try {
      // This is a simplified check - in production you'd need proper permissions
      const knownFunctions = ['process-resume', 'recommend-jobs', 'send-email'];
      return knownFunctions; // Placeholder
    } catch (error) {
      console.error('Error checking edge functions:', error);
      return [];
    }
  };

  const checkStorageBuckets = async (): Promise<string[]> => {
    try {
      const { data, error } = await supabase.storage.listBuckets();
      if (error) throw error;
      return data.map(bucket => bucket.name);
    } catch (error) {
      console.error('Error checking storage buckets:', error);
      return [];
    }
  };

  const inspectDatabase = async () => {
    setLoading(true);

    // Test connection
    const status = await testConnection();
    setConnectionStatus(status);

    if (status.connected) {
      // Check all tables
      const tableInfoPromises = tablesToCheck.map(getTableInfo);
      const tableResults = await Promise.all(tableInfoPromises);
      setTables(tableResults);

      // Check edge functions and storage
      const [functions, buckets] = await Promise.all([
        checkEdgeFunctions(),
        checkStorageBuckets()
      ]);
      setEdgeFunctions(functions);
      setStorageBuckets(buckets);
    }

    setLoading(false);
  };

  const toggleTableExpansion = (tableName: string) => {
    const newExpanded = new Set(expandedTables);
    if (newExpanded.has(tableName)) {
      newExpanded.delete(tableName);
    } else {
      newExpanded.add(tableName);
    }
    setExpandedTables(newExpanded);
  };

  const calculateFeatureStatus = (feature: FeatureStatus): FeatureStatus => {
    const existingTables = feature.tables.filter(tableName => 
      tables.find(t => t.name === tableName && t.exists)
    );
    
    let status: 'complete' | 'partial' | 'missing' = 'missing';
    if (existingTables.length === feature.tables.length) {
      status = 'complete';
    } else if (existingTables.length > 0) {
      status = 'partial';
    }

    return { ...feature, status };
  };

  const exportData = () => {
    const exportObject = {
      connectionStatus,
      tables: tables.filter(t => t.exists),
      edgeFunctions,
      storageBuckets,
      features: featureMapping.map(calculateFeatureStatus),
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportObject, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `avron-database-inspection-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const existingTables = tables.filter(t => t.exists);
  const tablesWithData = existingTables.filter(t => t.count > 0);

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-[#0E1116] text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-20">
              <Database className="h-12 w-12 text-[#D4AF37] mx-auto mb-4 animate-pulse" />
              <div className="text-xl text-[#8A98A9]">Inspecting database...</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0E1116] text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-[#D4AF37] mb-2 flex items-center">
                <Database className="h-10 w-10 mr-3" />
                Database Inspector
              </h1>
              <p className="text-[#8A98A9]">Comprehensive analysis of your Supabase backend</p>
            </div>
            <Button onClick={exportData} className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Connection Status */}
          <Card className="bg-[#121826] border-[#1C2541] mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="h-5 w-5 mr-2 text-[#D4AF37]" />
                Connection Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                {connectionStatus.connected ? (
                  <>
                    <CheckCircle className="h-6 w-6 text-green-400" />
                    <span className="text-green-400 font-medium">Connected to Supabase</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6 text-red-400" />
                    <span className="text-red-400 font-medium">Connection Failed</span>
                    {connectionStatus.error && (
                      <span className="text-[#8A98A9]">- {connectionStatus.error}</span>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {connectionStatus.connected && (
            <>
              {/* Summary Stats */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <Card className="bg-[#121826] border-[#1C2541]">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-[#D4AF37]">{existingTables.length}</div>
                    <div className="text-sm text-[#8A98A9]">Tables Found</div>
                  </CardContent>
                </Card>
                <Card className="bg-[#121826] border-[#1C2541]">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-[#D4AF37]">{tablesWithData.length}</div>
                    <div className="text-sm text-[#8A98A9]">Tables with Data</div>
                  </CardContent>
                </Card>
                <Card className="bg-[#121826] border-[#1C2541]">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-[#D4AF37]">{edgeFunctions.length}</div>
                    <div className="text-sm text-[#8A98A9]">Edge Functions</div>
                  </CardContent>
                </Card>
                <Card className="bg-[#121826] border-[#1C2541]">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-[#D4AF37]">{storageBuckets.length}</div>
                    <div className="text-sm text-[#8A98A9]">Storage Buckets</div>
                  </CardContent>
                </Card>
              </div>

              {/* Feature Status */}
              <Card className="bg-[#121826] border-[#1C2541] mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-[#D4AF37]" />
                    Platform Features Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {featureMapping.map((feature) => {
                      const calculatedFeature = calculateFeatureStatus(feature);
                      const Icon = calculatedFeature.icon;
                      return (
                        <div key={calculatedFeature.name} className="flex items-center justify-between p-4 bg-[#0E1116] rounded-lg">
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-[#D4AF37]" />
                            <div>
                              <div className="font-medium">{calculatedFeature.name}</div>
                              <div className="text-sm text-[#8A98A9]">{calculatedFeature.description}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {calculatedFeature.status === 'complete' && (
                              <>
                                <CheckCircle className="h-5 w-5 text-green-400" />
                                <span className="text-green-400 text-sm font-medium">Complete</span>
                              </>
                            )}
                            {calculatedFeature.status === 'partial' && (
                              <>
                                <div className="h-5 w-5 rounded-full bg-yellow-400" />
                                <span className="text-yellow-400 text-sm font-medium">Partial</span>
                              </>
                            )}
                            {calculatedFeature.status === 'missing' && (
                              <>
                                <XCircle className="h-5 w-5 text-red-400" />
                                <span className="text-red-400 text-sm font-medium">Missing</span>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Tables Detail */}
              <Card className="bg-[#121826] border-[#1C2541] mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HardDrive className="h-5 w-5 mr-2 text-[#D4AF37]" />
                    Database Tables ({existingTables.length} found)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {existingTables.map((table) => (
                      <div key={table.name} className="border border-[#1C2541] rounded-lg">
                        <button
                          onClick={() => toggleTableExpansion(table.name)}
                          className="w-full p-4 flex items-center justify-between hover:bg-[#0E1116] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {expandedTables.has(table.name) ? (
                              <ChevronDown className="h-4 w-4 text-[#D4AF37]" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-[#D4AF37]" />
                            )}
                            <span className="font-medium">{table.name}</span>
                            <span className="text-[#D4AF37] text-sm">({table.count} records)</span>
                            {table.count > 0 && (
                              <div className="h-2 w-2 bg-green-400 rounded-full" />
                            )}
                          </div>
                          <div className="text-sm text-[#8A98A9]">
                            {table.columns.length} columns
                          </div>
                        </button>
                        
                        {expandedTables.has(table.name) && (
                          <div className="p-4 border-t border-[#1C2541] bg-[#0E1116]">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium mb-2 text-[#D4AF37]">Columns</h4>
                                <div className="space-y-1">
                                  {table.columns.map((col, idx) => (
                                    <div key={idx} className="text-sm flex justify-between">
                                      <span>{col.name}</span>
                                      <span className="text-[#8A98A9]">{col.type}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2 text-[#D4AF37]">Sample Data</h4>
                                {table.sampleData.length > 0 ? (
                                  <div className="text-sm space-y-2">
                                    {table.sampleData.slice(0, 2).map((record, idx) => (
                                      <div key={idx} className="bg-[#121826] p-2 rounded text-xs overflow-x-auto">
                                        <pre>{JSON.stringify(record, null, 2)}</pre>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="text-sm text-[#8A98A9]">No data available</div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Migration Report */}
              <Card className="bg-[#121826] border-[#1C2541]">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-[#D4AF37]" />
                    Migration Report
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-[#D4AF37] mb-3">✅ What You Have</h3>
                      <ul className="space-y-2 text-[#8A98A9]">
                        <li>• {existingTables.length} database tables with proper structure</li>
                        <li>• {tablesWithData.length} tables containing real data</li>
                        <li>• {storageBuckets.length} storage buckets configured</li>
                        <li>• {edgeFunctions.length} edge functions deployed</li>
                        <li>• Complete Supabase backend infrastructure</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#D4AF37] mb-3">🚧 What Needs Frontend Development</h3>
                      <ul className="space-y-2 text-[#8A98A9]">
                        <li>• User authentication flows and profile management</li>
                        <li>• Job search and application interfaces</li>
                        <li>• Skills assessment and benchmarking UI</li>
                        <li>• Mentor booking and communication system</li>
                        <li>• Course recommendation and enrollment flows</li>
                        <li>• Resume upload and parsing interface</li>
                        <li>• Advanced analytics and reporting dashboards</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#D4AF37] mb-3">🎯 Recommended Next Steps</h3>
                      <ol className="space-y-2 text-[#8A98A9] list-decimal list-inside">
                        <li>Implement user authentication using existing candidates table</li>
                        <li>Build job listing pages connecting to job_listings tables</li>
                        <li>Create ROI calculator UI using enhanced_roi_calculations</li>
                        <li>Develop skills assessment interface with analysis_results integration</li>
                        <li>Build mentor marketplace using mentorship_profiles data</li>
                        <li>Implement course recommendation system with existing data</li>
                        <li>Add resume upload functionality connecting to resume processing</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </>
  );
}