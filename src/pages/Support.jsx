import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Support() {
  const { supportRequests, setSupportRequests } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicket = { id: Date.now().toString(), name, email, message, date: new Date().toISOString().split('T')[0] };
    setSupportRequests([newTicket, ...supportRequests]);
    setSuccess(true);
    setName(''); setEmail(''); setMessage('');
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-12">
      <div>
        <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block mb-3">HELP CENTER</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">How can we help you today?</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-8 md:p-10 rounded-3xl bg-[#121824] border border-slate-800/80 space-y-6">
        {success && (
          <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> Support request sent successfully!
          </div>
        )}
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white outline-none" required />
        <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white outline-none" required />
        <textarea rows="4" placeholder="Message..." value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl p-4 text-sm text-white resize-none outline-none" required></textarea>
        <button type="submit" className="w-full py-4 bg-[#00f2fe] text-black font-bold rounded-xl text-base">Submit Request</button>
      </form>
    </div>
  );
}
