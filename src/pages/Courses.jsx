import React from 'react';
import { BookOpen } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { useApp } from '../context/AppContext';

export default function Courses() {
  const { courses, updateProgress, setCurrentPage } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 space-y-12">
      <div>
        <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block mb-3">LIVE SKILL TRACKS</span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">Pick a path. Start making.</h1>
        <p className="text-slate-400 text-lg">Choose any published track below to begin your hands-on journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courses.map((course) => (
          <div key={course.id} className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 flex flex-col justify-between space-y-6">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#00f2fe]/10 flex items-center justify-center text-[#00f2fe] mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{course.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{course.desc}</p>
            </div>
            <SignedIn>
              <button onClick={() => { updateProgress(course.id); setCurrentPage('dashboard'); }} className="w-full py-3 bg-[#00f2fe] text-black font-bold text-sm rounded-xl hover:bg-[#00dfed] transition-all">Start Track & View Dashboard</button>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full py-3 bg-[#00f2fe] text-black font-bold text-sm rounded-xl hover:bg-[#00dfed] transition-all">Sign in to Enroll</button>
              </SignInButton>
            </SignedOut>
          </div>
        ))}
      </div>
    </div>
  );
}
