import React from 'react';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20 space-y-16">
      <div className="space-y-6">
        <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block">OUR MISSION</span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Big curiosity deserves permanent cloud storage.
        </h1>
        <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
          All data is securely saved in Firebase cloud database with live tracking and instant admin updates.
        </p>
      </div>
    </div>
  );
}
