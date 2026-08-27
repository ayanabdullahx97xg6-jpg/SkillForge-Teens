import React from 'react';
import { ArrowRight, Shield, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Home() {
  const { siteContent, isEditMode, handleContentChange, setCurrentPage } = useApp();

  return (
    <div className="space-y-24 pb-32">
      <section className="relative px-6 pt-20 pb-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00f2fe]/10 via-transparent to-transparent pointer-events-none blur-3xl max-w-2xl mx-auto h-96"></div>
        
        {isEditMode ? (
          <input type="text" value={siteContent.heroBadge} onChange={(e) => handleContentChange('heroBadge', e.target.value)} className="bg-slate-900 border border-[#00f2fe] text-[#00f2fe] text-xs font-semibold px-4 py-1.5 rounded-full mb-6 mx-auto block text-center" />
        ) : (
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wide text-[#00f2fe] uppercase bg-[#00f2fe]/10 border border-[#00f2fe]/30 rounded-full">{siteContent.heroBadge}</div>
        )}

        {isEditMode ? (
          <textarea value={siteContent.heroTitle} onChange={(e) => handleContentChange('heroTitle', e.target.value)} className="bg-slate-900 border border-[#00f2fe] text-white text-4xl md:text-6xl font-extrabold p-4 rounded-xl w-full max-w-4xl mx-auto mb-6 text-center outline-none resize-none" rows={2} />
        ) : (
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto mb-6 leading-tight">{siteContent.heroTitle}</h1>
        )}

        {isEditMode ? (
          <textarea value={siteContent.heroSubtitle} onChange={(e) => handleContentChange('heroSubtitle', e.target.value)} className="bg-slate-900 border border-[#00f2fe] text-slate-300 text-base p-4 rounded-xl w-full max-w-2xl mx-auto mb-10 text-center outline-none" rows={2} />
        ) : (
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">{siteContent.heroSubtitle}</p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => setCurrentPage('courses')} className="px-8 py-4 bg-[#00f2fe] text-black font-bold rounded-xl hover:bg-[#00dfed] transition-all flex items-center gap-3 shadow-lg shadow-[#00f2fe]/20 text-lg">
            Explore All Tracks <ArrowRight className="w-5 h-5" />
          </button>
          <button onClick={() => setCurrentPage('about')} className="px-8 py-4 bg-[#121824] border border-slate-800 text-white font-bold rounded-xl hover:border-[#00f2fe] transition-all text-lg">
            Learn Our Story
          </button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Target Age Group', value: '13-18' },
            { label: 'Quick Onboarding', value: '3 MIN' },
            { label: 'Dynamic Skill Tracks', value: '4 PATHS' },
            { label: 'Cloud Synced', value: '100%' }
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-3xl bg-[#121824] border border-slate-800 text-center space-y-2">
              <h3 className="text-3xl md:text-4xl font-black text-[#00f2fe]">{stat.value}</h3>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-mono">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 space-y-12">
        <div className="text-center md:text-left">
          <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block mb-3">{siteContent.howItWorksTitle}</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">{siteContent.howItWorksHeading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Choose Your Track', desc: 'Select from cybersecurity, animation, AI prompting, or digital storytelling.' },
            { step: '02', title: 'Build & Advance', desc: 'Complete modular milestones and watch your cloud progress bar grow live.' },
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
    </div>
  );
}
