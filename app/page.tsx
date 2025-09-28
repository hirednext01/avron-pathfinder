'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="bg-[#0E1116] text-[#E6EDF3] min-h-screen">
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">Career Intelligence Platform</h1>
        <p className="mt-4 text-[#8A98A9]">AI-Powered Career Analytics & Growth—benchmark skills, match roles, calculate ROI.</p>
        <div className="mt-8 flex justify-center gap-4">
          <Link className="px-5 py-3 rounded-2xl bg-[#D4AF37] text-black font-semibold" href="/benchmark">Start Benchmarking</Link>
          <Link className="px-5 py-3 rounded-2xl border border-[#8A98A9]" href="/jobs">Explore Jobs</Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {title:'Benchmark',desc:'See where you stand vs market',href:'/benchmark'},
            {title:'Jobs',desc:'Live roles matched to your profile',href:'/jobs'},
            {title:'ROI',desc:'Quantify upskilling payback',href:'/roi'},
          ].map(c=>(
            <a key={c.title} href={c.href} className="block rounded-2xl p-6 bg-[#121826] hover:scale-[1.01] transition">
              <h3 className="text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-[#8A98A9]">{c.desc}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
