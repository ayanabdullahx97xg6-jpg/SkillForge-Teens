import React from 'react';
import { BookOpen, FileText, Video, Download } from 'lucide-react';

export default function Resources() {
  const items = [
    { icon: BookOpen, title: 'Cheat Sheets', desc: 'Quick reference guides for every course.' },
    { icon: FileText, title: 'Project Docs', desc: 'Starter templates and documentation.' },
    { icon: Video, title: 'Tutorial Library', desc: 'Deep dive video walkthroughs.' },
    { icon: Download, title: 'Assets', desc: 'Raw files for your projects.' }
  ];

  return (
    <div className="min-h-screen bg-[#0b0f17] py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-black text-white mb-12">Learning Resources</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <div key={i} className="bg-slate-950/50 border border-slate-800 p-6 rounded-2xl flex items-start gap-4 hover:border-[#00f2fe]/50 transition-all">
              <item.icon className="text-[#00f2fe] w-8 h-8" />
              <div>
                <h3 className="font-bold text-lg text-white">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
