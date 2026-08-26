import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, BookOpen, Bot, ArrowRight, Star, Trophy, Users, CheckCircle, Award, X, Inbox, Trash2, User, Edit3, PlusCircle } from 'lucide-react';
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';

const clerkPubKey = "pk_test_ZXZvbHZpbmctZG92ZS03MzA0LmNsZXJrLmFjY291bnRzLmRldiQ";

const ADMIN_EMAIL = "ayanabdullahx967xg6@gmail.com"; 

export default function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <MainContent />
    </ClerkProvider>
  );
}

function MainContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { user } = useUser();

  const isAdmin = user && user.primaryEmailAddress?.emailAddress === ADMIN_EMAIL;

  // Dynamic Courses List (Admin can add new courses)
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('skillforge_courses');
    return saved ? JSON.parse(saved) : [
      { id: 'cybersecurity', title: 'Cybersecurity & Safety', desc: 'Practice smart digital habits, understand encryption basics, and learn how to secure your online presence against modern threats.' },
      { id: 'animation', title: '2D/3D Animation', desc: 'Bring original characters to life using industry-standard principles of motion, keyframing, and basic modeling.' },
      { id: 'storytelling', title: 'Creative Storytelling', desc: 'Master the art of digital writing, script formatting, world-building, and engaging media production for modern platforms.' },
      { id: 'aiTools', title: 'AI Tools & Prompting', desc: 'Learn how to leverage AI ethically, craft powerful prompts, generate creative assets, and supercharge your productivity.' },
    ];
  });

  // Admin New Course Form States
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseDesc, setNewCourseDesc] = useState('');
  const [courseSuccess, setCourseSuccess] = useState(false);

  const handlePublishCourse = (e) => {
    e.preventDefault();
    if (!newCourseTitle || !newCourseDesc) return;

    const courseKey = 'course_' + Date.now();
    const newCourseObj = {
      id: courseKey,
      title: newCourseTitle,
      desc: newCourseDesc
    };

    const updatedCourses = [...courses, newCourseObj];
    setCourses(updatedCourses);
    localStorage.setItem('skillforge_courses', JSON.stringify(updatedCourses));

    setNewCourseTitle('');
    setNewCourseDesc('');
    setCourseSuccess(true);
    setTimeout(() => setCourseSuccess(false), 4000);
  };

  const deleteCourse = (id) => {
    const filtered = courses.filter(c => c.id !== id);
    setCourses(filtered);
    localStorage.setItem('skillforge_courses', JSON.stringify(filtered));
  };

  // Profile State
  const [profile, setProfile] = useState(() => {
    if (!user) return { fullName: '', age: '', bio: '' };
    const saved = localStorage.getItem(`profile_${user.id}`);
    return saved ? JSON.parse(saved) : { fullName: user.firstName || '', age: '', bio: '' };
  });
  const [profileSuccess, setProfileSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      const savedProfile = localStorage.getItem(`profile_${user.id}`);
      if (!savedProfile && user.firstName) {
        setProfile(prev => ({ ...prev, fullName: user.firstName }));
      }
    }
  }, [user]);

  const handleProfileSave = (e) => {
    e.preventDefault();
    if (!user) return;
    localStorage.setItem(`profile_${user.id}`, JSON.stringify(profile));
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 4000);

    const userName = profile.fullName || user.firstName || 'Learner';
    updateLeaderboardName(user.id, userName);
  };

  const updateLeaderboardName = (userId, newName) => {
    setLeaderboard(prev => {
      const updated = prev.map(item => item.id === userId ? { ...item, name: newName } : item);
      localStorage.setItem('skillforge_community_leaderboard', JSON.stringify(updated));
      return updated;
    });
  };

  // Leaderboard State
  const [leaderboard, setLeaderboard] = useState(() => {
    const saved = localStorage.getItem('skillforge_community_leaderboard');
    return saved ? JSON.parse(saved) : [
      { id: 'david', name: 'David', track: 'Cybersecurity & Safety', progress: 90 },
      { id: 'ayesha', name: 'Ayesha', track: '2D/3D Animation', progress: 75 },
    ];
  });

  // Dynamic User Progress State
  const [progress, setProgress] = useState(() => {
    if (!user) return {};
    const saved = localStorage.getItem(`progress_${user.id}`);
    return saved ? JSON.parse(saved) : {};
  });

  // Support Requests State (Admin Inbox)
  const [supportRequests, setSupportRequests] = useState(() => {
    const saved = localStorage.getItem('skillforge_support_requests');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeCertificate, setActiveCertificate] = useState(null);

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`progress_${user.id}`);
      const userName = profile.fullName || user.firstName || user.username || 'Learner';
      
      if (saved) {
        const parsedProgress = JSON.parse(saved);
        setProgress(parsedProgress);
        updateLeaderboardInStorage(user.id, userName, parsedProgress);
      } else {
        updateLeaderboardInStorage(user.id, userName, progress);
      }
    }
  }, [user]);

  const updateLeaderboardInStorage = (userId, userName, currentProgress) => {
    const trackEntries = Object.entries(currentProgress);
    if (trackEntries.length === 0) return;

    let topTrackName = 'General Learning';
    let topVal = 0;

    trackEntries.forEach(([courseId, val]) => {
      const found = courses.find(c => c.id === courseId);
      if (found && val > topVal) {
        topVal = val;
        topTrackName = found.title;
      }
    });

    setLeaderboard((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === userId);
      let updated;
      if (existingIndex > -1) {
        updated = [...prev];
        updated[existingIndex] = { id: userId, name: userName, track: topTrackName, progress: topVal };
      } else {
        updated = [...prev, { id: userId, name: userName, track: topTrackName, progress: topVal }];
      }
      localStorage.setItem('skillforge_community_leaderboard', JSON.stringify(updated));
      return updated;
    });
  };

  const updateProgress = (courseId) => {
    if (!user) return;
    const currentVal = progress[courseId] || 0;
    const updated = {
      ...progress,
      [courseId]: Math.min(100, currentVal + 10)
    };
    setProgress(updated);
    localStorage.setItem(`progress_${user.id}`, JSON.stringify(updated));
    
    const userName = profile.fullName || user.firstName || user.username || 'Learner';
    updateLeaderboardInStorage(user.id, userName, updated);
  };

  // Support Form State
  const [supportName, setSupportName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSuccess, setSupportSuccess] = useState(false);

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!supportName || !supportEmail || !supportMessage) return;

    const newTicket = {
      id: Date.now(),
      name: supportName,
      email: supportEmail,
      message: supportMessage,
      date: new Date().toLocaleString()
    };

    const updatedRequests = [newTicket, ...supportRequests];
    setSupportRequests(updatedRequests);
    localStorage.setItem('skillforge_support_requests', JSON.stringify(updatedRequests));

    setSupportSuccess(true);
    setSupportName('');
    setSupportEmail('');
    setSupportMessage('');
    setTimeout(() => setSupportSuccess(false), 5000);
  };

  const deleteTicket = (id) => {
    const filtered = supportRequests.filter(item => item.id !== id);
    setSupportRequests(filtered);
    localStorage.setItem('skillforge_support_requests', JSON.stringify(filtered));
  };

  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSuccess(true);
    setFeedbackText('');
    setTimeout(() => setFeedbackSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 font-sans selection:bg-[#00f2fe] selection:text-black antialiased relative">
      
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0b0f17]/90 backdrop-blur-md border-b border-slate-800/60 px-8 h-20 flex items-center justify-between">
        <div className="text-xl font-black tracking-wider text-white flex items-center gap-1 cursor-pointer" onClick={() => setCurrentPage('home')}>
          SKILLFORGE <span className="text-[#00f2fe] font-mono">&lt;TEENS/&gt;</span>
        </div>
        <div className="flex gap-5 md:gap-7 text-sm font-medium text-slate-300 items-center">
          <button onClick={() => setCurrentPage('home')} className={`hover:text-[#00f2fe] transition-colors ${currentPage === 'home' ? 'text-[#00f2fe]' : ''}`}>Home</button>
          <button onClick={() => setCurrentPage('about')} className={`hover:text-[#00f2fe] transition-colors ${currentPage === 'about' ? 'text-[#00f2fe]' : ''}`}>About</button>
          <button onClick={() => setCurrentPage('courses')} className={`hover:text-[#00f2fe] transition-colors ${currentPage === 'courses' ? 'text-[#00f2fe]' : ''}`}>Courses</button>
          <button onClick={() => setCurrentPage('support')} className={`hover:text-[#00f2fe] transition-colors ${currentPage === 'support' ? 'text-[#00f2fe]' : ''}`}>Support</button>
          
          {isAdmin && (
            <button onClick={() => setCurrentPage('admin')} className={`px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/40 text-teal-400 font-bold flex items-center gap-1.5 text-xs ${currentPage === 'admin' ? 'bg-teal-500/20' : ''}`}>
              <Inbox className="w-4 h-4" /> Admin Panel ({supportRequests.length})
            </button>
          )}

          <SignedIn>
            <div className="flex items-center gap-3">
              <button onClick={() => setCurrentPage('dashboard')} className={`text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-800 ${currentPage === 'dashboard' ? 'border-[#00f2fe] text-[#00f2fe]' : 'text-slate-300'}`}>
                Dashboard & Profile
              </button>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-3">
              <SignInButton mode="modal">
                <button className="px-4 py-2 rounded-xl bg-[#121824] border border-slate-800 hover:border-[#00f2fe] transition-all text-xs font-semibold">Login</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 rounded-xl bg-[#00f2fe] text-black font-bold transition-all text-xs hover:bg-[#00dfed]">Sign Up</button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-20">
        
        {/* HOME PAGE */}
        {currentPage === 'home' && (
          <section className="relative px-6 pt-20 pb-32 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#00f2fe]/10 via-transparent to-transparent pointer-events-none blur-3xl max-w-2xl mx-auto h-96"></div>
            <div className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wide text-[#00f2fe] uppercase bg-[#00f2fe]/10 border border-[#00f2fe]/30 rounded-full">
              Built with teens. Built for what's next.
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto mb-6 leading-tight">
              Discover Your Superpower <br className="hidden md:block"/>
              <span className="text-[#00f2fe]">– By Teens, For Teens</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              SkillForge Teens helps you explore the tech and creative skills that feel like you — with guided pathways, interactive tracks, and real projects.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => setCurrentPage('courses')} className="px-8 py-4 bg-[#00f2fe] text-black font-bold rounded-xl hover:bg-[#00dfed] transition-all flex items-center gap-3 shadow-lg shadow-[#00f2fe]/20 text-lg">
                Explore All Tracks <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={() => setCurrentPage('about')} className="px-8 py-4 bg-[#121824] border border-slate-800 text-white font-bold rounded-xl hover:border-[#00f2fe] transition-all text-lg">
                Learn Our Story
              </button>
            </div>
          </section>
        )}

        {/* ABOUT PAGE */}
        {currentPage === 'about' && (
          <div className="max-w-5xl mx-auto px-6 py-20 space-y-16">
            <div className="space-y-6">
              <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block">OUR MISSION</span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Big curiosity deserves a real place to grow.
              </h1>
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
                SkillForge Teens is built from the ground up for young people who want to explore what they can make, protect, tell, and change in today's digital world.
              </p>
            </div>
          </div>
        )}

        {/* COURSES PAGE (Dynamic Courses Published by Admin) */}
        {currentPage === 'courses' && (
          <div className="max-w-6xl mx-auto px-6 py-20 space-y-12">
            <div>
              <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block mb-3">LIVE SKILL TRACKS</span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                Pick a path. Start making.
              </h1>
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
        )}

        {/* SUPPORT PAGE */}
        {currentPage === 'support' && (
          <div className="max-w-4xl mx-auto px-6 py-20 space-y-12">
            <div>
              <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block mb-3">HELP CENTER</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white">How can we help you today?</h1>
            </div>
            <form onSubmit={handleSupportSubmit} className="p-8 md:p-10 rounded-3xl bg-[#121824] border border-slate-800/80 space-y-6">
              {supportSuccess && (
                <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" /> Support request sent to Admin successfully!
                </div>
              )}
              <input type="text" placeholder="Name" value={supportName} onChange={(e) => setSupportName(e.target.value)} className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white outline-none" required />
              <input type="email" placeholder="Email address" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white outline-none" required />
              <textarea rows="4" placeholder="Message..." value={supportMessage} onChange={(e) => setSupportMessage(e.target.value)} className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl p-4 text-sm text-white resize-none outline-none" required></textarea>
              <button type="submit" className="w-full py-4 bg-[#00f2fe] text-black font-bold rounded-xl text-base">Submit Request</button>
            </form>
          </div>
        )}

        {/* ADMIN PANEL (Publish Courses & View Support Inbox) */}
        {currentPage === 'admin' && isAdmin && (
          <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">
            
            {/* Publish Course Form */}
            <div className="p-8 rounded-3xl bg-[#121824] border border-teal-500/30 space-y-6">
              <div>
                <span className="text-xs font-mono text-teal-400 uppercase tracking-widest block mb-1">ADMIN COURSE PUBLISHER</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">Publish New Course to Website</h2>
                <p className="text-sm text-slate-400 mt-1">Add a brand new course that will appear instantly on the Courses page.</p>
              </div>

              {courseSuccess && (
                <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" /> Course published successfully!
                </div>
              )}

              <form onSubmit={handlePublishCourse} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">Course Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Mobile App Development for Teens" 
                    value={newCourseTitle} 
                    onChange={(e) => setNewCourseTitle(e.target.value)} 
                    className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-teal-400" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">Course Description</label>
                  <textarea 
                    rows="3" 
                    placeholder="Write a brief overview of what students will learn..." 
                    value={newCourseDesc} 
                    onChange={(e) => setNewCourseDesc(e.target.value)} 
                    className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl p-4 text-sm text-white resize-none outline-none focus:border-teal-400" 
                    required 
                  ></textarea>
                </div>
                <button type="submit" className="px-6 py-3.5 bg-teal-400 text-black font-bold rounded-xl text-sm flex items-center gap-2 hover:bg-teal-300 transition-all">
                  <PlusCircle className="w-5 h-5" /> Publish Course Now
                </button>
              </form>

              {/* Manage Existing Published Courses */}
              <div className="pt-6 border-t border-slate-800">
                <h3 className="text-lg font-bold text-white mb-4">Manage Published Courses ({courses.length})</h3>
                <div className="space-y-3">
                  {courses.map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-4 rounded-2xl bg-[#0b0f17] border border-slate-800">
                      <div>
                        <h4 className="text-sm font-bold text-white">{c.title}</h4>
                        <p className="text-xs text-slate-400 truncate max-w-md">{c.desc}</p>
                      </div>
                      <button onClick={() => deleteCourse(c.id)} className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Support Inbox Section */}
            <div className="p-8 rounded-3xl bg-[#121824] border border-teal-500/30 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-teal-400 uppercase tracking-widest block mb-1">SUPPORT TICKETS</span>
                  <h2 className="text-2xl font-extrabold text-white">Support Inbox</h2>
                </div>
                <div className="px-4 py-2 rounded-xl bg-teal-500/10 text-teal-400 font-bold text-sm">
                  {supportRequests.length} Total Requests
                </div>
              </div>

              <div className="space-y-4">
                {supportRequests.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-[#0b0f17] border border-slate-800 text-slate-400 text-sm">
                    No support requests found. All clear! 🚀
                  </div>
                ) : (
                  supportRequests.map((ticket) => (
                    <div key={ticket.id} className="p-6 rounded-3xl bg-[#0b0f17] border border-slate-800 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-bold text-white flex items-center gap-2">
                            {ticket.name} <span className="text-xs font-normal text-slate-400">({ticket.email})</span>
                          </h4>
                          <span className="text-xs font-mono text-slate-500">{ticket.date}</span>
                        </div>
                        <button onClick={() => deleteTicket(ticket.id)} className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-slate-300 bg-[#121824] p-4 rounded-2xl border border-slate-800/60 leading-relaxed">
                        {ticket.message}
                      </p>
                      <div className="flex justify-end">
                        <a href={`mailto:${ticket.email}?subject=Reply to your SkillForge Support Request`} className="px-4 py-2 bg-[#00f2fe] text-black font-semibold text-xs rounded-xl hover:bg-[#00dfed] transition-all">
                          Reply via Email
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

        {/* DASHBOARD & USER SPACE PAGE */}
        {currentPage === 'dashboard' && (
          <SignedIn>
            <div className="max-w-5xl mx-auto px-6 py-16 space-y-10">
              
              {/* User Greeting Bar */}
              <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-[#00f2fe] uppercase tracking-widest block mb-1">STUDENT SPACE & VAULT</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white">Welcome back, {profile.fullName || user?.firstName || 'Learner'}! 👋</h2>
                  <p className="text-sm text-slate-400 mt-1">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
                <UserButton afterSignOutUrl="/" />
              </div>

              {/* PROFILE SETUP */}
              <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#00f2fe]/10 flex items-center justify-center text-[#00f2fe]">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Profile Setup & Info</h3>
                    <p className="text-xs text-slate-400">Update your personal details, age, and bio.</p>
                  </div>
                </div>

                {profileSuccess && (
                  <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" /> Profile updated successfully!
                  </div>
                )}

                <form onSubmit={handleProfileSave} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">Full Name / Display Name</label>
                      <input 
                        type="text" 
                        value={profile.fullName} 
                        onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} 
                        placeholder="e.g. Ayan Abdullah" 
                        className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-[#00f2fe]" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">Age</label>
                      <input 
                        type="number" 
                        value={profile.age} 
                        onChange={(e) => setProfile({ ...profile, age: e.target.value })} 
                        placeholder="e.g. 17" 
                        className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-[#00f2fe]" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">Short Bio / About Me</label>
                    <textarea 
                      rows="3" 
                      value={profile.bio} 
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })} 
                      placeholder="Tell something about your interests, hobbies..." 
                      className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl p-4 text-sm text-white resize-none outline-none focus:border-[#00f2fe]"
                    ></textarea>
                  </div>

                  <button type="submit" className="px-6 py-3 bg-[#00f2fe] text-black font-bold rounded-xl text-sm flex items-center gap-2 hover:bg-[#00dfed]">
                    <Edit3 className="w-4 h-4" /> Save Profile
                  </button>
                </form>
              </div>

              {/* Dynamic User Progress & Certificates Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#00f2fe]" /> Your Enrolled Tracks & Certificates Space
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courses.map((course) => {
                    const currentProgress = progress[course.id] || 0;
                    return (
                      <div key={course.id} className="p-6 rounded-3xl bg-[#121824] border border-slate-800/80 space-y-4 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-lg font-bold text-white">{course.title}</h4>
                            <span className="text-xs font-mono text-[#00f2fe] bg-[#00f2fe]/10 px-2.5 py-1 rounded-full">{currentProgress}% completed</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                            <div className="bg-[#00f2fe] h-full transition-all duration-300" style={{ width: `${currentProgress}%` }}></div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => updateProgress(course.id)} className="flex-1 py-2.5 bg-[#00f2fe] text-black font-semibold text-xs rounded-xl hover:bg-[#00dfed] transition-all">Advance Progress (+10%)</button>
                          {currentProgress === 100 && (
                            <button onClick={() => setActiveCertificate({ title: course.title, name: profile.fullName || user?.firstName || 'Learner' })} className="px-4 py-2.5 bg-teal-500/10 border border-teal-500/40 text-teal-400 font-bold text-xs rounded-xl flex items-center gap-1.5 hover:bg-teal-500/20">
                              <Award className="w-4 h-4" /> Certificate
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Community Leaderboard */}
              <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 space-y-6">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-[#00f2fe]" />
                  <h3 className="text-xl font-bold text-white">Live Community Leaderboard</h3>
                </div>
                <div className="space-y-3">
                  {leaderboard
                    .sort((a, b) => b.progress - a.progress)
                    .map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-[#0b0f17] border border-slate-800">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#00f2fe]/10 text-[#00f2fe] font-bold flex items-center justify-center text-sm">
                            {item.name ? item.name.charAt(0) : 'U'}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{item.name} {item.id === user?.id && <span className="text-xs text-[#00f2fe] font-mono">(You)</span>}</p>
                            <p className="text-xs text-slate-400">Top Track: {item.track}</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-[#00f2fe] bg-[#00f2fe]/10 px-3 py-1.5 rounded-full">{item.progress}% Completed</span>
                      </div>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              <form onSubmit={handleFeedbackSubmit} className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 space-y-5">
                <h3 className="text-xl font-bold text-white">How is your experience so far?</h3>
                <div className="flex gap-1.5 text-[#00f2fe]">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-6 h-6 fill-[#00f2fe]" />))}
                </div>
                {feedbackSuccess && (
                  <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Thank you for your feedback!
                  </div>
                )}
                <textarea rows="4" placeholder="Tell us what's working..." value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl p-4 text-sm text-white resize-none outline-none"></textarea>
                <button type="submit" className="px-6 py-3 bg-[#00f2fe] text-black font-bold rounded-xl text-sm">Submit Feedback</button>
              </form>

            </div>
          </SignedIn>
        )}
      </main>

      {/* CERTIFICATE MODAL */}
      {activeCertificate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-[#121824] border border-[#00f2fe]/40 rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-2xl">
            <button onClick={() => setActiveCertificate(null)} className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 rounded-2xl bg-[#00f2fe]/10 text-[#00f2fe] flex items-center justify-center mx-auto">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#00f2fe] uppercase tracking-widest block mb-2">OFFICIAL SKILLFORGE CERTIFICATE</span>
              <h2 className="text-3xl font-extrabold text-white">Certificate of Completion</h2>
            </div>
            <p className="text-slate-300 text-sm">This is proudly presented to</p>
            <h3 className="text-2xl md:text-3xl font-black text-[#00f2fe] tracking-wide">{activeCertificate.name}</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-lg mx-auto">
              for successfully completing all milestones and building practical projects in the verified learning track: <br/>
              <strong className="text-white">{activeCertificate.title}</strong>
            </p>
            <div className="pt-4 flex items-center justify-center gap-4">
              <button onClick={() => alert("Certificate downloaded successfully!")} className="px-6 py-3 bg-[#00f2fe] text-black font-bold rounded-xl text-sm flex items-center gap-2 hover:bg-[#00dfed]">
                <Award className="w-4 h-4" /> Download Certificate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}