import React from 'react';
import { Users } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useApp } from '../context/AppContext';

export default function Leaderboard() {
  const { leaderboard } = useApp();
  const { user } = useUser();

  return (
    <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 space-y-6">
      <div className="flex items-center gap-3">
        <Users className="w-6 h-6 text-[#00f2fe]" />
        <h3 className="text-xl font-bold text-white">Live Community Leaderboard</h3>
      </div>
      <div className="space-y-3">
        {leaderboard
          .slice()
          .sort((a, b) => b.progress - a.progress)
          .map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-[#0b0f17] border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00f2fe]/10 text-[#00f2fe] font-bold flex items-center justify-center text-sm">
                  {item.name ? item.name.charAt(0) : 'U'}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {item.name} {item.id === user?.id && <span className="text-xs text-[#00f2fe]">(You)</span>}
                  </p>
                  <p className="text-xs text-slate-400">{item.track}</p>
                </div>
              </div>
              <span className="text-xs font-mono text-[#00f2fe] bg-[#00f2fe]/10 px-3 py-1.5 rounded-xl">
                {item.progress}%
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
