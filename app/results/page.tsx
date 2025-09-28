import CourseSuggestions from "@/components/CourseSuggestions";
import MentorSuggestions from "@/components/MentorSuggestions";
export default function ResultsPage(){
  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Your Path Recommendations</h1>
      <p className="mt-2 text-sm opacity-70">Based on your assessment, here are the most impactful courses and mentors.</p>
      <CourseSuggestions />
      <MentorSuggestions />
    </main>
  );
}
