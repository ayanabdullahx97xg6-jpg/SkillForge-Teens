import React, { useState } from 'react';
import { CheckCircle, PlusCircle, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Admin() {
  const { courses, setCourses, deleteCourse, supportRequests, deleteTicket } = useApp();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePublish = (e) => {
    e.preventDefault();
    setCourses([...courses, { id: Date.now().toString(), title, desc }]);
    setSuccess(true);
    setTitle(''); setDesc('');
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">
      <div className="p-8 rounded-3xl bg-[#121824] border border-teal-500/30 space-y-6">
        <h2 className="text-2xl font-extrabold text-white">Publish New Course</h2>
        {success && (
          <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> Course published successfully!
          </div>
        )}
        <form onSubmit={handlePublish} className="space-y-4">
          <input type="text" placeholder="Course Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white outline-none" required />
          <textarea rows="3" placeholder="Course Description" value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl p-4 text-sm text-white resize-none outline-none" required></textarea>
          <button type="submit" className="px-6 py-3.5 bg-teal-400 text-black font-bold rounded-xl text-sm flex items-center gap-2">
            <PlusCircle className="w-5 h-5" /> Publish Course
          </button>
        </form>

        <div className="pt-6 border-t border-slate-800 space-y-3">
          <h3 className="text-lg font-bold text-white">Published Courses ({courses.length})</h3>
          {courses.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-4 rounded-2xl bg-[#0b0f17] border border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-white">{c.title}</h4>
                <p className="text-xs text-slate-400 truncate max-w-md">{c.desc}</p>
              </div>
              <button onClick={() => deleteCourse(c.id)} className="p-2 rounded-xl bg-rose-500/10 text-rose-400"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-[#121824] border border-teal-500/30 space-y-6">
        <h2 className="text-2xl font-extrabold text-white">Support Inbox ({supportRequests.length})</h2>
        <div className="space-y-4">
          {supportRequests.length === 0 ? (
            <p className="text-slate-400 text-sm">No support tickets found.</p>
          ) : (
            supportRequests.map((ticket) => (
              <div key={ticket.id} className="p-6 rounded-3xl bg-[#0b0f17] border border-slate-800 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold text-white">{ticket.name} <span className="text-xs font-normal text-slate-400">({ticket.email})</span></h4>
                    <span className="text-xs font-mono text-slate-500">{ticket.date}</span>
                  </div>
                  <button onClick={() => deleteTicket(ticket.id)} className="p-2 rounded-xl bg-rose-500/10 text-rose-400"><Trash2 className="w-4 h-4" /></button>
                </div>
                <p className="text-sm text-slate-300 bg-[#121824] p-4 rounded-2xl border border-slate-800/60">{ticket.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
