import React from 'react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0b0f17] text-slate-100 py-20 px-4 sm:px-6 lg:px-8 text-center">
      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold mb-8 tracking-wide uppercase shadow-sm">
        <span className="text-amber-400">⚡</span> BUILD YOUR FUTURE, ONE SKILL AT A TIME
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
        Discover Your Superpower – <br className="hidden sm:inline" />
        By Teens, For Teens
      </h1>

      {/* Updated Subtitle Text */}
      <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
        SkillForge Teens helps you explore tech and creative skills{' '}
        <span className="text-slate-200 font-medium">
          with interactive tracks, real-world projects, and shareable certificates.
        </span>
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-cyan-400 text-slate-950 font-bold hover:bg-cyan-300 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20">
          Explore All Tracks <span>→</span>
        </button>
        <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-200 font-bold hover:bg-slate-800 transition-all duration-200">
          Learn Our Story
        </button>
      </div>
    </section>
  );
}
