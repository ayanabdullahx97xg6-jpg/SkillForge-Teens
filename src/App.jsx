import React, { useState } from 'react';

// Yahan hum apne pages ko import ya manage kar rahe hain
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black antialiased">
      
      {/* Temporary Navigation Header for testing */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0b0f17]/80 backdrop-blur-md border-b border-slate-800/60 px-6 h-20 flex items-center justify-between">
        <span className="text-xl font-black text-white">
          SKILLFORGE <span className="text-[#00f2fe] font-mono">&lt;TEENS/&gt;</span>
        </span>
        <div className="flex gap-6 text-sm font-medium text-slate-300">
          <button onClick={() => setCurrentPage('home')} className="hover:text-[#00f2fe]">Home</button>
          <button onClick={() => setCurrentPage('about')} className="hover:text-[#00f2fe]">About</button>
          <button onClick={() => setCurrentPage('dashboard')} className="hover:text-[#00f2fe]">Dashboard</button>
          <button onClick={() => setCurrentPage('support')} className="hover:text-[#00f2fe]">Support</button>
          <button onClick={() => setCurrentPage('resources')} className="hover:text-[#00f2fe]">Resources</button>
        </div>
      </nav>

      {/* Page Content Display Area */}
      <main className="pt-28">
        {currentPage === 'home' && (
          <div className="text-center py-20">
            <h1 className="text-5xl font-extrabold text-white mb-4">Small tools. Big next moves.</h1>
            <p className="text-slate-400">Welcome to SkillForge Teens Home Page!</p>
          </div>
        )}

        {currentPage === 'about' && (
          <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-extrabold text-white mb-4">Big curiosity deserves a real place to grow.</h1>
            <p className="text-slate-400">SkillForge Teens is built for young people...</p>
          </div>
        )}

        {currentPage === 'dashboard' && (
          <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-extrabold text-white mb-4">Ayan's SkillForge (Dashboard)</h1>
            <p className="text-slate-400">Level 1 / 100 - Forge progress: 15%</p>
          </div>
        )}

        {currentPage === 'support' && (
          <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-extrabold text-white mb-4">How can we help you today?</h1>
            <p className="text-slate-400">Support request form goes here.</p>
          </div>
        )}

        {currentPage === 'resources' && (
          <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-extrabold text-white mb-4">Practical Resources</h1>
            <p className="text-slate-400">Quick-start guides and project prompts.</p>
          </div>
        )}
      </main>

    </div>
  );
}
