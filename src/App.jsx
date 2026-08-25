import React, { useState } from 'react';
import { Shield, Palette, PenTool, Cpu, ArrowRight, Sparkles, Users, Award } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 font-sans selection:bg-[#00f2fe] selection:text-black antialiased">
      
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0b0f17]/90 backdrop-blur-md border-b border-slate-800/60 px-8 h-20 flex items-center justify-between">
        <div className="text-xl font-black tracking-wider text-white flex items-center gap-1 cursor-pointer" onClick={() => setCurrentPage('home')}>
          SKILLFORGE <span className="text-[#00f2fe] font-mono">&lt;TEENS/&gt;</span>
        </div>
        <div className="flex gap-8 text-sm font-medium text-slate-300">
          <button onClick={() => setCurrentPage('home')} className={`hover:text-[#00f2fe] transition-colors ${currentPage === 'home' ? 'text-[#00f2fe]' : ''}`}>Home</button>
          <button onClick={() => setCurrentPage('about')} className={`hover:text-[#00f2fe] transition-colors ${currentPage === 'about' ? 'text-[#00f2fe]' : ''}`}>About</button>
          <button onClick={() => setCurrentPage('courses')} className={`hover:text-[#00f2fe] transition-colors ${currentPage === 'courses' ? 'text-[#00f2fe]' : ''}`}>Courses</button>
          <button onClick={() => setCurrentPage('resources')} className={`hover:text-[#00f2fe] transition-colors ${currentPage === 'resources' ? 'text-[#00f2fe]' : ''}`}>Resources</button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-20">
        {currentPage === 'home' && (
          <div>
            {/* Hero Section */}
            <section className="relative px-6 pt-20 pb-32 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#00f2fe]/10 via-transparent to-transparent pointer-events-none blur-3xl max-w-2xl mx-auto h-96"></div>
              
              <div className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wide text-[#00f2fe] uppercase bg-[#00f2fe]/10 border border-[#00f2fe]/30 rounded-full">
                Built with teens. Built for what's next.
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto mb-6 leading-tight">
                Discover Your Superpower <br className="hidden md:block"/>
                <span className="text-white">– By Teens, For Teens</span>
              </h1>

              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                SkillForge Teens helps you explore the tech and creative skills that feel like you — with guided pathways, real projects, and a community that gets it.
              </p>

              <div className="flex flex-col items-center gap-4">
                <button onClick={() => setCurrentPage('courses')} className="px-8 py-4 bg-[#00f2fe] text-black font-bold rounded-xl hover:bg-[#00dfed] transition-all flex items-center gap-3 shadow-lg shadow-[#00f2fe]/20 text-lg">
                  Find Your Superpower Now <ArrowRight className="w-5 h-5" />
                </button>
                <div className="px-4 py-1.5 text-xs text-slate-400 tracking-wider font-mono border border-slate-800 bg-slate-900/50 rounded-lg">
                  YOUR NEXT OBSESSION MIGHT BE ONE QUIZ AWAY.
                </div>
              </div>
            </section>

            {/* Section 01 / How It Works */}
            <section className="px-6 py-20 max-w-7xl mx-auto border-t border-slate-900">
              <div className="mb-12">
                <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase">01 / HOW IT WORKS</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Meet the quiz that actually gets you.</h2>
                <p className="text-slate-400 mt-2">Four quick stages turn your interests into a curated starting point — no boring labels, no pressure.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { step: "01", title: "Choose your energy", desc: "Tell us what makes you curious, creative, or ready to solve a puzzle." },
                  { step: "02", title: "Pick a challenge", desc: "Choose mini scenarios that feel closer to games than homework." },
                  { step: "03", title: "Get your signal", desc: "We match your answers with pathways designed to spark a real next move." },
                  { step: "04", title: "Start building", desc: "Try a first project, share it with your crew, and see what clicks." }
                ].map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-[#121824] border border-slate-800/80 hover:border-[#00f2fe]/40 transition-all group">
                    <span className="text-[#00f2fe] font-mono text-xl font-bold">{item.step}</span>
                    <h3 className="text-xl font-bold text-white mt-3 mb-2 group-hover:text-[#00f2fe] transition-colors">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 02 / Explore Your Path */}
            <section className="px-6 py-20 max-w-7xl mx-auto border-t border-slate-900">
              <div className="mb-12">
                <span className="text-xs font-mono text-purple-400 tracking-widest uppercase">02 / EXPLORE YOUR PATH</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Four worlds. Infinite ways to make your mark.</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: <Shield className="w-6 h-6 text-[#00f2fe]" />, title: "Cybersecurity & Safety", desc: "Learn how to protect your world, spot risky moves, and become the digital teammate everyone needs." },
                  { icon: <Palette className="w-6 h-6 text-purple-400" />, title: "2D/3D Animation", desc: "Bring original characters, worlds, and motion graphics to life from your own point of view." },
                  { icon: <PenTool className="w-6 h-6 text-pink-400" />, title: "Digital Storytelling", desc: "Shape stories people remember — from interactive worlds to short films, podcasts, and campaigns." },
                  { icon: <Cpu className="w-6 h-6 text-cyan-400" />, title: "Tech & AI Tools", desc: "Experiment with the tools shaping tomorrow and learn to build with AI responsibly, not blindly." }
                ].map((path, idx) => (
                  <div key={idx} className="p-8 rounded-2xl bg-[#121824] border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between">
                    <div>
                      <div className="p-3 bg-slate-900 rounded-xl w-fit mb-6 border border-slate-800">{path.icon}</div>
                      <h3 className="text-2xl font-bold text-white mb-3">{path.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{path.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 03 / The Why */}
            <section className="px-6 py-20 max-w-7xl mx-auto border-t border-slate-900 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase">03 / THE WHY</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-6">Early skill-building changes the way young people see themselves.</h2>
                <p className="text-slate-400 leading-relaxed">
                  When teens get a safe place to make things, solve problems, and share what they know, confidence stops being a slogan. It becomes a habit they can take anywhere.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-[#121824] border border-slate-800 text-center">
                  <h3 className="text-3xl font-black text-[#00f2fe]">13–18</h3>
                  <p className="text-slate-400 text-sm mt-2">built for the teenage years</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#121824] border border-slate-800 text-center">
                  <h3 className="text-3xl font-black text-purple-400">3 MIN</h3>
                  <p className="text-slate-400 text-sm mt-2">to find a new starting point</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#121824] border border-slate-800 text-center">
                  <h3 className="text-3xl font-black text-pink-400">4 PATHS</h3>
                  <p className="text-slate-400 text-sm mt-2">to explore now and remix later</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#121824] border border-slate-800 text-center">
                  <h3 className="text-3xl font-black text-cyan-400">100%</h3>
                  <p className="text-slate-400 text-sm mt-2">beginner-friendly momentum</p>
                </div>
              </div>
            </section>

            {/* Section 04 / Community Banner */}
            <section className="px-6 py-12 max-w-7xl mx-auto">
              <div className="p-10 rounded-3xl bg-gradient-to-r from-[#121824] to-[#0f172a] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase">04 / BUILD THE FUTURE TOGETHER</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">Bring SkillForge Teens to your school or community.</h3>
                  <p className="text-slate-400 mt-2 max-w-xl text-sm">For parents, educators, youth organizations, and sponsors ready to open more doors for the next generation.</p>
                </div>
                <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all whitespace-nowrap">
                  Partner With Us
                </button>
              </div>
            </section>
          </div>
        )}

        {currentPage === 'about' && (
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="mb-16">
              <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block mb-3">FOUNDER & MISSION</span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl leading-tight">
                Big curiosity deserves a real place to grow.
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-3xl leading-relaxed">
                SkillForge Teens is built for young people who want to explore what they can make, protect, tell, and change. We turn curiosity into practical confidence through safe, project-led learning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 rounded-2xl bg-[#121824] border border-slate-800/80 hover:border-slate-700 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">Explore safely</h3>
                <p className="text-slate-400 text-sm leading-relaxed">A guided home base for trying bold ideas without pressure.</p>
              </div>
              <div className="p-8 rounded-2xl bg-[#121824] border border-slate-800/80 hover:border-slate-700 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">Make it real</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Every pathway ends with something tangible that you can share.</p>
              </div>
              <div className="p-8 rounded-2xl bg-[#121824] border border-slate-800/80 hover:border-slate-700 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">Grow together</h3>
                <p className="text-slate-400 text-sm leading-relaxed">A community that celebrates first steps, big questions, and brave experiments.</p>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'courses' && (
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-extrabold text-white mb-4">Explore Courses & Pathways</h1>
            <p className="text-slate-400">Select your path and start your journey today.</p>
          </div>
        )}

        {currentPage === 'resources' && (
          <div className="max-w-4xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-extrabold text-white mb-6">Practical Resources</h1>
            <p className="text-slate-400">Quick-start guides, tools, and cheat sheets for your projects.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 px-8 py-10 mt-20 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
        <p>SKILLFORGE TEENS — Curiosity is a skill. Let's forge it.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <button onClick={() => setCurrentPage('about')} className="hover:text-white">About</button>
          <button onClick={() => setCurrentPage('courses')} className="hover:text-white">Courses</button>
          <button onClick={() => setCurrentPage('resources')} className="hover:text-white">Resources</button>
        </div>
      </footer>

    </div>
  );
}
