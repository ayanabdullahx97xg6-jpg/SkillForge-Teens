import React from 'react';
import { Target, Zap, ShieldCheck, Rocket, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function About() {
  const { setCurrentPage } = useApp();

  return (
    <div className="space-y-24 pb-32 pt-12">
      {/* 1. Hero / Mission Section */}
      <section className="relative px-6 text-center max-w-4xl mx-auto space-y-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00f2fe]/10 via-transparent to-transparent pointer-events-none blur-3xl h-80"></div>
        
        <div className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-[#00f2fe] uppercase bg-[#00f2fe]/10 border border-[#00f2fe]/30 rounded-full">
          OUR MISSION
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Empowering Young Minds for the Digital Frontier
        </h1>

        <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
          SkillForge Teens is dedicated to transforming curiosity into real-world tech capabilities. We equip teenagers with practical, industry-aligned skills in Cybersecurity, AI, Web Development, and Digital Design to help them build, innovate, and lead in a rapidly changing world.
        </p>
      </section>

      {/* 2. Core Pillars / Why SkillForge */}
      <section className="max-w-6xl mx-auto px-6 space-y-12">
        <div className="text-center">
          <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block mb-2">WHY WE EXIST</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Designed Specifically for Teenagers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800 space-y-4 hover:border-[#00f2fe]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#00f2fe]/10 text-[#00f2fe] flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Practical & Hands-On</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Skip boring theory. Our learning tracks focus on real projects, interactive exercises, and skills you can directly apply and showcase.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800 space-y-4 hover:border-[#00f2fe]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#00f2fe]/10 text-[#00f2fe] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Modern Tech Tracks</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              From Ethical Hacking and AI Engineering to Modern Web Development, we teach tools and skills that are shaping today's digital landscape.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800 space-y-4 hover:border-[#00f2fe]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#00f2fe]/10 text-[#00f2fe] flex items-center justify-center">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Verified Progress</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Track your learning milestones in real time, build at your own comfortable pace, and earn verified completion certificates.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Vision & Impact Card */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-[#121824] via-[#0b0f17] to-[#121824] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-2 text-[#00f2fe] text-xs font-mono font-bold uppercase tracking-widest">
              <Target className="w-4 h-4" /> Our Vision
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white">Bridging the Gap Between Learning and Creating</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We believe every teen deserves early access to modern tech tools and structured guidance, allowing them to build strong technical portfolios before even entering university.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="p-5 rounded-2xl bg-[#0b0f17] border border-slate-800 text-center">
              <div className="text-2xl font-black text-[#00f2fe]">100%</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Interactive</div>
            </div>
            <div className="p-5 rounded-2xl bg-[#0b0f17] border border-slate-800 text-center">
              <div className="text-2xl font-black text-[#00f2fe]">4+</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Tech Tracks</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Call to Action */}
      <section className="text-center max-w-3xl mx-auto px-6 space-y-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">Ready to Start Learning?</h2>
        <p className="text-slate-400 text-sm md:text-base">
          Explore our tailored learning tracks and start building modern tech skills today.
        </p>
        <button 
          onClick={() => setCurrentPage('courses')}
          className="px-8 py-4 bg-[#00f2fe] text-black font-bold rounded-xl hover:bg-[#00dfed] transition-all inline-flex items-center gap-3 shadow-lg shadow-[#00f2fe]/20 text-base"
        >
          Explore Courses <ArrowRight className="w-5 h-5" />
        </button>
      </section>
    </div>
  );
}
