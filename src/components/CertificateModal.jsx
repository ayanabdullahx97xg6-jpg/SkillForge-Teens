import React from 'react';
import { X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CertificateModal() {
  const { activeCertificate, setActiveCertificate } = useApp();

  if (!activeCertificate) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative max-w-2xl w-full bg-[#121824] border border-[#00f2fe]/40 rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-2xl">
        <button onClick={() => setActiveCertificate(null)} className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-300">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-3xl font-extrabold text-white">Certificate of Completion</h2>
        <h3 className="text-2xl font-black text-[#00f2fe]">{activeCertificate.name}</h3>
        <p className="text-slate-400 text-sm">Successfully completed <strong className="text-white">{activeCertificate.title}</strong></p>
      </div>
    </div>
  );
}
