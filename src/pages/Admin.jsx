import React, { useState, useEffect } from 'react';
import { CheckCircle, PlusCircle, Trash2, ShieldAlert, ArrowLeft } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useApp } from '../context/AppContext';

export default function Admin() {
  const { courses, setCourses, deleteCourse, supportRequests, deleteTicket, setCurrentPage } = useApp();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [success, setSuccess] = useState(false);

  const ADMIN_EMAIL = 'ayanabdullahx967xg6@gmail.com';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handlePublish = (e) => {
    e.preventDefault();
    if (!user || user.email !== ADMIN_EMAIL) return;

    setCourses([...courses, { id: Date.now().toString(), title, desc }]);
    setSuccess(true);
    setTitle('');
    setDesc('');
    setTimeout(() => setSuccess(false), 4000);
  };

  // Auth checking state
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 text-center text-slate-400 font-mono text-sm">
        Verifying admin authorization...
      </div>
    );
  }

  // Access Security Guard: Only allow designated admin email
  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto border border-rose-500/20">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-white">Access Denied</h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          Yeh Admin Panel sirf authorized administrator (<span className="text-[#00f2fe]">{ADMIN_EMAIL}</span>) ke liye reserved hai.
        </p>
        <button
          onClick={() => setCurrentPage('home')}
          className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm inline-flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">
      {/* Admin Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Admin Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">
            Logged in as: <span className="text-[#00f2fe] font-mono">{user.email}</span>
          </p>
        </div>
        <span className="px-3 py-1 bg-[#00f2fe]/10 border border-[#00f2fe]/30 text-[#00f2fe] text-xs font-mono font-bold rounded-full">
          VERIFIED ADMIN
        </span>
      </div>

      {/* Course Publishing Form */}
      <div className="p-8 rounded-3xl bg-[#121824] border border-[#00f2fe]/20 space-y-6">
        <h2 className="text-2xl font-extrabold text-white">Publish New Course</h2>
        {success && (
          <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> Course published successfully!
          </div>
        )}
        <form onSubmit={handlePublish} className="space-y-4">
          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-[#00f2fe]"
            required
          />
          <textarea
            rows="3"
            placeholder="Course Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl p-4 text-sm text-white resize-none outline-none focus:border-[#00f2fe]"
            required
          ></textarea>
          <button
            type="submit"
            className="px-6 py-3.5 bg-[#00f2fe] hover:bg-[#00dfed] text-black font-bold rounded-xl text-sm flex items-center gap-2 transition-all shadow-md shadow-[#00f2fe]/10"
          >
            <PlusCircle className="w-5 h-5" /> Publish Course
          </button>
        </form>

        {/* Course List */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <h3 className="text-lg font-bold text-white">Published Courses ({courses.length})</h3>
          {courses.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-4 rounded-2xl bg-[#0b0f17] border border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-white">{c.title}</h4>
                <p className="text-xs text-slate-400 truncate max-w-md">{c.desc}</p>
              </div>
              <button
                onClick={() => deleteCourse(c.id)}
                className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all"
                title="Delete Course"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Support Inbox */}
      <div className="p-8 rounded-3xl bg-[#121824] border border-[#00f2fe]/20 space-y-6">
        <h2 className="text-2xl font-extrabold text-white">Support Inbox ({supportRequests.length})</h2>
        <div className="space-y-4">
          {supportRequests.length === 0 ? (
            <p className="text-slate-400 text-sm">No support tickets found.</p>
          ) : (
            supportRequests.map((ticket) => (
              <div key={ticket.id} className="p-6 rounded-3xl bg-[#0b0f17] border border-slate-800 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      {ticket.name} <span className="text-xs font-normal text-slate-400">({ticket.email})</span>
                    </h4>
                    <span className="text-xs font-mono text-slate-500">{ticket.date}</span>
                  </div>
                  <button
                    onClick={() => deleteTicket(ticket.id)}
                    className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all"
                    title="Delete Ticket"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
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
