import Navigation from "../../components/Navigation";
import CourseSuggestions from "../../src/components/CourseSuggestions";
import MentorSuggestions from "../../src/components/MentorSuggestions";

export default function ResultsPage(){
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0E1116] text-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-4xl font-bold text-[#D4AF37] mb-4">Your Path Recommendations</h1>
          <p className="text-lg text-[#8A98A9] mb-8">Based on your assessment, here are the most impactful courses and mentors.</p>
          <CourseSuggestions />
          <MentorSuggestions />
        </div>
      </div>
    </>
  );
}
