import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Home() {
  const { siteContent, setCurrentPage } = useApp();

  const heroTitleText = siteContent?.heroTitle 
    ? siteContent.heroTitle.replace("Cloud Skills", "Future-Ready Skills") 
    : "Empowering Young Minds with Future-Ready Skills";

  return (
    <div className="space-y-28 pb-32">
      {/* 01 / HERO SECTION */}
      <section className="relative px-6 pt-20 pb-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00f2fe]/10 via-transparent to-transparent pointer-events-none blur-3xl max-w-2xl mx-auto h-96"></div>
        
        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wide text-[#00f2fe] uppercase bg-[#00f2fe]/10 border border-[#00f2fe]/30 rounded-full">
          {siteContent?.heroBadge || "NEXT-GEN LEARNING PLATFORM"}
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto mb-6 leading-tight">
          {heroTitleText}
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {siteContent?.heroSubtitle || "Explore cutting-edge tech tracks built specifically for teenagers."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => setCurrentPage('courses')} 
            className="px-8 py-4 bg-[#00f2fe] text-black font-bold rounded-xl hover:bg-[#00dfed] transition-all flex items-center gap-3 shadow-lg shadow-[#00f2fe]/20 text-lg"
          >
            Explore All Tracks <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setCurrentPage('about')} 
            className="px-8 py-4 bg-[#121824] border border-slate-800 text-white font-bold rounded-xl hover:border-[#00f2fe] transition-all text-lg"
          >
            Learn Our Story
          </button>
        </div>
      </section>

      {/* 02 / HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-6 space-y-12">
        <div className="text-center md:text-left">
          <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block mb-3">
            02 / HOW IT WORKS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">
            {siteContent?.howItWorksHeading || "Your Journey to Tech Mastery"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Choose Your Track', desc: 'Select from cybersecurity, animation, AI prompting, or digital storytelling.' },
            { step: '02', title: 'Build & Advance', desc: 'Complete modular milestones and watch your progress grow live.' },
            { step: '03', title: 'Earn Certificates', desc: 'Reach 100% completion to unlock verified completion certificates instantly.' }
          ].map((item, index) => (
            <div key={index} className="p-8 rounded-3xl bg-[#121824] border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#00f2fe]/10 text-[#00f2fe] font-black flex items-center justify-center text-lg">{item.step}</div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 03 / THE WHY */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block">
            03 / THE WHY
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Early skill-building changes the way young people see themselves.
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed pt-2">
            When teens get a safe place to make things, solve problems, and share what they know, confidence stops being a slogan. It becomes a habit they can take anywhere.
          </p>
        </div>

        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {[
            { value: '13–18', label: 'built for the teenage years' },
            { value: '3 MIN', label: 'to find a new starting point' },
            { value: '4 PATHS', label: 'to explore now and remix later' },
            { value: '100%', label: 'beginner-friendly momentum' }
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl bg-[#121824] border border-slate-800/80 space-y-2">
              <h3 className="text-3xl font-black text-[#00f2fe]">{stat.value}</h3>
              <p className="text-xs text-slate-400 leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 04 / BUILD THE FUTURE TOGETHER */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="p-8 md:p-12 rounded-3xl bg-[#121824] border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block">
              04 / BUILD THE FUTURE TOGETHER
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">
              Bring SkillForge Teens to your school or community.
            </h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              For parents, educators, youth organizations, and sponsors ready to open more doors for the next generation.
            </p>
          </div>
          <button 
            onClick={() => setCurrentPage('support')}
            className="px-6 py-3.5 bg-white hover:bg-slate-200 text-black font-bold rounded-xl text-sm transition-all whitespace-nowrap shadow-md"
          >
            Partner With Us
          </button>
        </div>
      </section>

      {/* 05 / JOIN THE LAB */}
      <section className="max-w-6xl mx-auto px-6 space-y-4">
        <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block">
          05 / JOIN THE LAB
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white">
          Your next creative obsession starts here.
        </h2>
        <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
          Get pathway drops, project prompts, and a place to share your experiments. It's free, friendly, and built for curiosity.
        </p>
        <div className="pt-4">
          <button 
            onClick={() => setCurrentPage('courses')} 
            className="px-8 py-4 bg-[#00f2fe] hover:bg-[#00dfed] text-black font-bold rounded-xl transition-all inline-flex items-center gap-3 text-base shadow-lg shadow-[#00f2fe]/20"
          >
            Explore All Tracks <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
