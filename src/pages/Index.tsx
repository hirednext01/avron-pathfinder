import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3Icon, BriefcaseIcon, CalculatorIcon } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0E1116] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#D4AF37]">
            Avron Career Intelligence Platform
          </h1>
          <p className="text-xl text-[#8A98A9]">
            AI-Powered Career Analytics & Development
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-[#121826] border-[#1C2541] hover:border-[#D4AF37] transition-colors cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-[#D4AF37]/10 rounded-full w-fit group-hover:bg-[#D4AF37]/20 transition-colors">
                <BarChart3Icon className="h-8 w-8 text-[#D4AF37]" />
              </div>
              <CardTitle className="text-white">Career Benchmark</CardTitle>
              <CardDescription className="text-[#8A98A9]">
                Compare your skills against market standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90">
                Start Benchmarking
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#121826] border-[#1C2541] hover:border-[#D4AF37] transition-colors cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-[#D4AF37]/10 rounded-full w-fit group-hover:bg-[#D4AF37]/20 transition-colors">
                <BriefcaseIcon className="h-8 w-8 text-[#D4AF37]" />
              </div>
              <CardTitle className="text-white">Job Listings</CardTitle>
              <CardDescription className="text-[#8A98A9]">
                Find opportunities matched to your profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-[#8A98A9] text-white hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37]">
                Explore Jobs
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#121826] border-[#1C2541] hover:border-[#D4AF37] transition-colors cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-[#D4AF37]/10 rounded-full w-fit group-hover:bg-[#D4AF37]/20 transition-colors">
                <CalculatorIcon className="h-8 w-8 text-[#D4AF37]" />
              </div>
              <CardTitle className="text-white">ROI Calculator</CardTitle>
              <CardDescription className="text-[#8A98A9]">
                Calculate your career growth potential
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-[#8A98A9] text-white hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37]">
                Calculate ROI
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;