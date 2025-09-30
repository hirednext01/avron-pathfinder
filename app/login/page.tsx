"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../src/integrations/supabase/client";
import Navigation from "../../components/Navigation";

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0E1116] text-white">
        <div className="container mx-auto px-4 py-8 max-w-md">
          <h1 className="text-4xl font-bold text-[#D4AF37] mb-8 text-center">Sign In</h1>
          <div className="bg-[#121826] p-8 rounded-xl border border-[#1C2541]">
            <Auth 
              supabaseClient={supabase} 
              appearance={{ 
                theme: ThemeSupa,
                style: {
                  button: { background: '#D4AF37', color: '#000' },
                  anchor: { color: '#D4AF37' },
                }
              }} 
              providers={[]}
              redirectTo={typeof window !== "undefined" ? window.location.origin + "/results" : undefined}
            />
          </div>
        </div>
      </div>
    </>
  );
}
