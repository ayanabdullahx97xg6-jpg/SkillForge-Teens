import React from 'react';
import { Shield, Sparkles, PenTool, Cpu, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 font-sans">
      <nav className="fixed w-full z-50 bg-[#0b0f17]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="text-xl font-black text-white">SKILLFORGE <span className="text-[#00f2fe]">&lt;TEENS/&gt;</span></span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            {['Home', 'About', 'Courses', 'Resources'].map(item => <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#00f2fe]">{item}</a>)}
          </div>
          <button className="bg-[#00f2fe] text-slate-950 px-5 py-2 rounded-xl font-bold text-sm">Join Now</button>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6">Forge Your Digital Future.</h1>
        <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">Master Cybersecurity, AI, Animation, and Storytelling in an immersive sandbox environment designed for the next generation.</p>
        <button className="bg-slate-800 border border-slate-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 mx-auto hover:border-[#00f2fe]">
          Explore Tracks <ArrowRight size={20} />
        </button>
      </main>
    </div>
  );
}
