import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('about'); // Defaulting to about or home as you like

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
          <div className="max-w-6xl mx-auto px-6 py-24 text-center">
            <h1 className="text-5xl font-extrabold text-white mb-6">Discover Your Superpower</h1>
            <p className="text-slate-400 text-lg mb-8">By Teens, For Teens</p>
            <button onClick={() => setCurrentPage('about')} className="px-6 py-3 bg-[#00f2fe] text-black font-bold rounded-xl">
              Go to About Page
            </button>
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
