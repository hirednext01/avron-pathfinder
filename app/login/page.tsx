"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]}
            redirectTo={typeof window !== "undefined" ? window.location.origin + "/results" : undefined}/>
    </main>
  );
}
