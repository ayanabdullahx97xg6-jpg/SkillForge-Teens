import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Edit3, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { currentPage, setCurrentPage, isEditMode, setIsEditMode, isAdmin } = useApp();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0b0f17]/90 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
        <div className="w-8 h-8 rounded-xl bg-[#00f2fe] flex items-center justify-center text-black font-black text-xs">TP</div>
        <span className="font-extrabold text-[#00f2fe] text-lg tracking-wider">TEENPATH</span>
      </div>

      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        {['home', 'about', 'courses', 'support'].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`capitalize transition-colors ${currentPage === page ? 'text-[#00f2fe] font-bold' : 'hover:text-white'}`}
          >
            {page}
          </button>
        ))}
        <SignedIn>
          <button onClick={() => setCurrentPage('dashboard')} className={`transition-colors ${currentPage === 'dashboard' ? 'text-[#00f2fe] font-bold' : 'hover:text-white'}`}>
            Dashboard
          </button>
        </SignedIn>
        {isAdmin && (
          <button onClick={() => setCurrentPage('admin')} className={`transition-colors flex items-center gap-1 ${currentPage === 'admin' ? 'text-teal-400 font-bold' : 'text-slate-400 hover:text-white'}`}>
            <ShieldCheck className="w-4 h-4" /> Admin
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
            isEditMode ? 'bg-[#00f2fe] text-black' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" /> {isEditMode ? 'Editing On' : 'Inline Edit'}
        </button>
        <SignedIn><UserButton afterSignOutUrl="/" /></SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 rounded-xl bg-[#00f2fe] text-black font-bold text-xs hover:bg-[#00dfed] transition-all">Sign In</button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}
