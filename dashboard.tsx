import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Shield, 
  Sparkles, 
  PenTool, 
  Cpu, 
  Star, 
  Award,
  ArrowRight
} from 'lucide-react';

export default function SkillForgeDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black antialiased overflow-x-hidden flex flex-col justify-between">
      
      {/* 1. Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0b0f17]/80 backdrop-blur-md border-b border-slate-800/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-black tracking-wider text-white">
                SKILLFORGE <span className="text-[#00f2fe] font-mono">&lt;TEENS/&gt;</span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Courses', 'Resources'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-slate-400 hover:text-[#00f2fe] transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Desktop Profile Ring Action */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 p-[2px] cursor-pointer">
                <div className="w-full h-full bg-[#0b0f17] rounded-full flex items-center justify-center font-bold text-[#00f2fe] text-sm">
                  A
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 focus:outline-none transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`md:hidden absolute w-full bg-[#0b0f17]/95 border-b border-slate-800 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible h-auto py-6' : 'opacity-0 invisible h-0 overflow-hidden'}`}>
          <div className="px-4 space-y-3">
            {['Home', 'About', 'Courses', 'Resources'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-medium text-slate-300 hover:text-[#00f2fe] px-3 py-2 rounded-lg"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Core Dashboard Wrapper */}
      <main className="flex-grow pt-28 pb-16 relative max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Ambient Glow Anchors */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[90px] pointer-events-none"></div>

        <div className="relative z-10 space-y-6">
          
          {/* 1. User Profile Header Card */}
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#00f2fe] text-slate-950 flex items-center justify-center font-black text-xl shadow-[0_0_20px_rgba(0,242,254,0.2)]">
                A
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Ayan's SkillForge
                </h1>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">Welcome back, creator</p>
              </div>
            </div>
            
            <div className="px-4 py-2 border border-cyan-500/30 rounded-xl bg-cyan-950/20">
              <span className="text-xs sm:text-sm font-black text-[#00f2fe] tracking-widest uppercase">
                LEVEL 1 / 100
              </span>
            </div>
          </div>

          {/* 2. Progress Bar Card */}
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Your forge progress
              </h2>
              <span className="text-sm font-extrabold text-[#00f2fe]">15% Filled</span>
            </div>
            
            <div className="w-full h-3 bg-slate-900 border border-slate-800/60 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-gradient-to-r from-[#00f2fe] to-cyan-400 rounded-full shadow-[0_0_15px_rgba(0,242,254,0.4)] transition-all duration-1000 ease-out"
                style={{ width: '15%' }}
              ></div>
            </div>

            <p className="text-xs font-bold text-indigo-400/90 tracking-wide uppercase flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>PROFESSIONAL CERTIFICATE UNLOCKED AT LEVEL 100</span>
            </p>
          </div>

          {/* 3. Course Progress Grid (2x2 Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Card 1: Cybersecurity & Safety */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between hover:border-slate-700/60 transition-all duration-200">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-[#00f2fe]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Cybersecurity & Safety</h3>
                    <p className="text-xs text-slate-500 font-medium">Core Security Operations</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg border border-cyan-500/20 bg-cyan-950/30 text-[#00f2fe]">
                  12% complete
                </span>
              </div>
              <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#00f2fe] text-slate-950 font-extrabold text-sm rounded-xl transition-all duration-200 hover:opacity-90">
                <span>Continue Learning</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 2: 2D/3D Animation */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between hover:border-slate-700/60 transition-all duration-200">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-950/40 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">2D/3D Animation</h3>
                    <p className="text-xs text-slate-500 font-medium">Visual Motion Frameworks</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg border border-indigo-500/20 bg-indigo-950/30 text-indigo-400">
                  7% complete
                </span>
              </div>
              <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#00f2fe] text-slate-950 font-extrabold text-sm rounded-xl transition-all duration-200 hover:opacity-90">
                <span>Continue Learning</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 3: Digital Storytelling */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between hover:border-slate-700/60 transition-all duration-200">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-[#00f2fe]">
                    <PenTool className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Digital Storytelling</h3>
                    <p className="text-xs text-slate-500 font-medium">Interactive Content Layouts</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg border border-cyan-500/20 bg-cyan-950/30 text-[#00f2fe]">
                  0% complete
                </span>
              </div>
              <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#00f2fe] text-slate-950 font-extrabold text-sm rounded-xl transition-all duration-200 hover:opacity-90">
                <span>Continue Learning</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 4: Tech & AI Tools */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between hover:border-slate-700/60 transition-all duration-200">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-950/40 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Tech & AI Tools</h3>
                    <p className="text-xs text-slate-500 font-medium">Generative Pipeline Sandbox</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg border border-indigo-500/20 bg-indigo-950/30 text-indigo-400">
                  3% complete
                </span>
              </div>
              <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#00f2fe] text-slate-950 font-extrabold text-sm rounded-xl transition-all duration-200 hover:opacity-90">
                <span>Continue Learning</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* 4. Feedback Section Card */}
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl">
            <h3 className="text-sm font-bold text-slate-300 mb-3">How is your experience so far?</h3>
            <div className="flex items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform active:scale-95"
                >
                  <Star className={`w-5 h-5 transition-colors ${star <= rating ? 'fill-[#00f2fe] text-[#00f2fe]' : 'text-slate-700'}`} />
                </button>
              ))}
            </div>
            <textarea
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what's working..."
              className="w-full px-4 py-3 bg-[#0b0f17] border border-slate-800/80 rounded-xl text-slate-100 placeholder-slate-600 font-medium text-sm focus:outline-none focus:border-cyan-500/60 transition-all duration-200 resize-none mb-4"
            />
            <button className="px-5 py-2.5 bg-slate-900 border border-slate-800 text-slate-200 font-bold text-sm rounded-xl hover:text-white hover:border-slate-700 transition-all">
              Submit Feedback
            </button>
          </div>

        </div>
      </main>

      {/* 5. Footer */}
      <footer className="border-t border-slate-800/60 bg-[#0b0f17]/80 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-medium text-center sm:text-left">
            SKILLFORGE TEENS — Curiosity is a skill. Let's forge it.
          </p>
          <div className="flex items-center space-x-6">
            {['About', 'Courses', 'Resources'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs font-semibold text-slate-400 hover:text-[#00f2fe] uppercase tracking-wider transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <p className="text-xs text-slate-600 font-medium">
            © {new Date().getFullYear()} SkillForge Teens. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
