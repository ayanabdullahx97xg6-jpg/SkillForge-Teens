import React from 'react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { setCurrentPage } = useApp();

  return (
    <footer className="border-t border-slate-800 bg-[#0b0f17] py-10 px-6 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="w-7 h-7 rounded-lg bg-[#00f2fe] flex items-center justify-center text-black font-black text-xs">TP</div>
          <span className="font-extrabold text-[#00f2fe] text-base tracking-wider">TEENPATH</span>
        </div>
        
        <p className="text-slate-500 text-xs text-center">
          © {new Date().getFullYear()} TeenPath Learning Platform. Built for future innovators.
        </p>

        <div className="flex items-center gap-6 text-xs text-slate-400">
          <button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors">About</button>
          <button onClick={() => setCurrentPage('courses')} className="hover:text-[#00f2fe] transition-colors">Tracks</button>
          <button onClick={() => setCurrentPage('support')} className="hover:text-white transition-colors">Support</button>
        </div>
      </div>
    </footer>
  );
}
