import React from 'react';

export default function StatsSection() {
  const stats = [
    { label: 'Target Age Group', value: '13-18' },
    { label: 'Quick Onboarding', value: '3 MIN' },
    { label: 'Dynamic Skill Tracks', value: '4 PATHS' },
    { label: 'Cloud Synced', value: '100%' }
  ];

  return (
    <section className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="p-6 rounded-3xl bg-[#121824] border border-slate-800 text-center space-y-2">
            <h3 className="text-3xl md:text-4xl font-black text-[#00f2fe]">{stat.value}</h3>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-mono">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
