import React, { useState } from 'react';
import { 
  ArrowRight, 
  Shield, 
  Sparkles, 
  BookOpen, 
  CheckCircle, 
  PlusCircle, 
  Trash2, 
  Trophy, 
  Award, 
  Users, 
  X 
} from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';

export default function App() {
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState('home');
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  // Site Content State for Inline Editing
  const [siteContent, setSiteContent] = useState({
    heroBadge: 'Next-Gen Learning Platform',
    heroTitle: 'Empowering Young Minds with Cloud Skills',
    heroSubtitle: 'Explore cutting-edge tech tracks built specifically for teenagers.',
    howItWorksTitle: '01 / HOW IT WORKS',
    howItWorksHeading: 'Simple steps to master new skills',
    theWhyTitle: '03 / THE WHY',
    theWhyHeading: 'Built for the future of education',
    theWhyDesc: 'We provide secure, cloud-synced learning paths designed to engage young creators and future tech leaders.',
    buildFutureTitle: '04 / GET STARTED',
    buildFutureHeading: 'Build the future together',
    buildFutureDesc: 'Join thousands of students building real projects and earning verified certificates.'
  });

  const handleContentChange = (key, value) => {
    setSiteContent((prev) => ({ ...prev, [key]: value }));
  };

  // Courses State
  const [courses, setCourses] = useState([
    { id: 'cyber', title: 'Cybersecurity Fundamentals', desc: 'Master online safety, encryption basics, and ethical hacking intro.' },
    { id: 'animation', title: 'Digital Animation & Design', desc: 'Bring creative ideas to life using modern digital design tools.' },
    { id: 'ai', title: 'AI Prompt Engineering', desc: 'Learn how to effectively communicate with AI models to build apps.' },
    { id: 'storytelling', title: 'Interactive Storytelling', desc: 'Create immersive digital narratives and code your own choose-your-path games.' }
  ]);

  // Form & Interaction States
  const [supportName, setSupportName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSuccess, setSupportSuccess] = useState(false);

  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseDesc, setNewCourseDesc] = useState('');
  const [courseSuccess, setCourseSuccess] = useState(false);

  const [supportRequests, setSupportRequests] = useState([
    { id: '1', name: 'Alex Johnson', email: 'alex@example.com', date: '2026-06-01', message: 'How do I reset my password?' }
  ]);

  const [profile, setProfile] = useState({
    fullName: user?.firstName || '',
    age: '16',
    bio: 'Passionate teen tech learner exploring code and design.'
  });
  const [profileSuccess, setProfileSuccess] = useState(false);

  const [progress, setProgress] = useState({});
  const [activeCertificate, setActiveCertificate] = useState(null);

  const [leaderboard, setLeaderboard] = useState([
    { id: 'u1', name: 'Sarah Connor', track: 'Cybersecurity', progress: 90 },
    { id: 'u2', name: 'Neo Anderson', track: 'AI Prompt Engineering', progress: 100 },
    { id: 'u3', name: 'Trinity Moss', track: 'Digital Animation', progress: 60 }
  ]);

  // Handlers
  const handleSupportSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      id: Date.now().toString(),
      name: supportName,
      email: supportEmail,
      message: supportMessage,
      date: new Date().toISOString().split('T')[0]
    };
    setSupportRequests([newTicket, ...supportRequests]);
    setSupportSuccess(true);
    setSupportName('');
    setSupportEmail('');
    setSupportMessage('');
    setTimeout(() => setSupportSuccess(false), 4000);
  };

  const handlePublishCourse = (e) => {
    e.preventDefault();
    const newCourseItem = {
      id: Date.now().toString(),
      title: newCourseTitle,
      desc: newCourseDesc
    };
    setCourses([...courses, newCourseItem]);
    setCourseSuccess(true);
    setNewCourseTitle('');
    setNewCourseDesc('');
    setTimeout(() => setCourseSuccess(false), 4000);
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const deleteTicket = (id) => {
    setSupportRequests(supportRequests.filter((t) => t.id !== id));
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 4000);
  };

  const updateProgress = (courseId) => {
    setProgress((prev) => {
      const current = prev[courseId] || 0;
      const updated = current >= 100 ? 100 : current + 10;
      return { ...prev, [courseId]: updated };
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 font-sans selection:bg-[#00f2fe] selection:text-black">
      
      {/* Main Content Area */}
      <main className="pt-20">
        
        {/* HOME PAGE */}
        {currentPage === 'home' && (
          <div className="space-y-24 pb-32">
            {/* Hero Section */}
            <section className="relative px-6 pt-20 pb-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#00f2fe]/10 via-transparent to-transparent pointer-events-none blur-3xl max-w-2xl mx-auto h-96"></div>
              
              {isEditMode ? (
                <input 
                  type="text" 
                  value={siteContent.heroBadge} 
                  onChange={(e) => handleContentChange('heroBadge', e.target.value)}
                  className="bg-slate-900 border border-[#00f2fe] text-[#00f2fe] text-xs font-semibold px-4 py-1.5 rounded-full mb-6 mx-auto block text-center"
                />
              ) : (
                <div className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wide text-[#00f2fe] uppercase bg-[#00f2fe]/10 border border-[#00f2fe]/30 rounded-full">
                  {siteContent.heroBadge}
                </div>
              )}

              {isEditMode ? (
                <textarea 
                  value={siteContent.heroTitle} 
                  onChange={(e) => handleContentChange('heroTitle', e.target.value)}
                  className="bg-slate-900 border border-[#00f2fe] text-white text-4xl md:text-6xl font-extrabold p-4 rounded-xl w-full max-w-4xl mx-auto mb-6 text-center outline-none resize-none"
                  rows={2}
                />
              ) : (
                <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto mb-6 leading-tight">
                  {siteContent.heroTitle}
                </h1>
              )}

              {isEditMode ? (
                <textarea 
                  value={siteContent.heroSubtitle} 
                  onChange={(e) => handleContentChange('heroSubtitle', e.target.value)}
                  className="bg-slate-900 border border-[#00f2fe] text-slate-300 text-base p-4 rounded-xl w-full max-w-2xl mx-auto mb-10 text-center outline-none"
                  rows={2}
                />
              ) : (
                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                  {siteContent.heroSubtitle}
                </p>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onClick={() => setCurrentPage('courses')} className="px-8 py-4 bg-[#00f2fe] text-black font-bold rounded-xl hover:bg-[#00dfed] transition-all flex items-center gap-3 shadow-lg shadow-[#00f2fe]/20 text-lg">
                  Explore All Tracks <ArrowRight className="w-5 h-5" />
                </button>
                <button onClick={() => setCurrentPage('about')} className="px-8 py-4 bg-[#121824] border border-slate-800 text-white font-bold rounded-xl hover:border-[#00f2fe] transition-all text-lg">
                  Learn Our Story
                </button>
              </div>
            </section>

            {/* Stats Boxes Section */}
            <section className="max-w-6xl mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="p-6 rounded-3xl bg-[#121824] border border-slate-800 text-center space-y-2">
                  <h3 className="text-3xl md:text-4xl font-black text-[#00f2fe]">13-18</h3>
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-mono">Target Age Group</p>
                </div>
                <div className="p-6 rounded-3xl bg-[#121824] border border-slate-800 text-center space-y-2">
                  <h3 className="text-3xl md:text-4xl font-black text-[#00f2fe]">3 MIN</h3>
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-mono">Quick Onboarding</p>
                </div>
                <div className="p-6 rounded-3xl bg-[#121824] border border-slate-800 text-center space-y-2">
                  <h3 className="text-3xl md:text-4xl font-black text-[#00f2fe]">4 PATHS</h3>
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-mono">Dynamic Skill Tracks</p>
                </div>
                <div className="p-6 rounded-3xl bg-[#121824] border border-slate-800 text-center space-y-2">
                  <h3 className="text-3xl md:text-4xl font-black text-[#00f2fe]">100%</h3>
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-mono">Cloud Synced</p>
                </div>
              </div>
            </section>

            {/* 01 / HOW IT WORKS SECTION */}
            <section className="max-w-6xl mx-auto px-6 space-y-12">
              <div className="text-center md:text-left">
                {isEditMode ? (
                  <input 
                    type="text" 
                    value={siteContent.howItWorksTitle} 
                    onChange={(e) => handleContentChange('howItWorksTitle', e.target.value)}
                    className="bg-slate-900 border border-[#00f2fe] text-[#00f2fe] text-xs font-mono uppercase tracking-widest p-2 rounded-lg mb-2 w-full max-w-xs"
                  />
                ) : (
                  <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block mb-3">{siteContent.howItWorksTitle}</span>
                )}

                {isEditMode ? (
                  <input 
                    type="text" 
                    value={siteContent.howItWorksHeading} 
                    onChange={(e) => handleContentChange('howItWorksHeading', e.target.value)}
                    className="bg-slate-900 border border-[#00f2fe] text-white text-3xl md:text-4xl font-extrabold p-2 rounded-lg w-full max-w-xl"
                  />
                ) : (
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white">{siteContent.howItWorksHeading}</h2>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#00f2fe]/10 text-[#00f2fe] font-black flex items-center justify-center text-lg">01</div>
                  <h3 className="text-xl font-bold text-white">Choose Your Track</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Select from cybersecurity, animation, AI prompting, or digital storytelling.</p>
                </div>
                <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#00f2fe]/10 text-[#00f2fe] font-black flex items-center justify-center text-lg">02</div>
                  <h3 className="text-xl font-bold text-white">Build & Advance</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Complete modular milestones and watch your cloud progress bar grow live.</p>
                </div>
                <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#00f2fe]/10 text-[#00f2fe] font-black flex items-center justify-center text-lg">03</div>
                  <h3 className="text-xl font-bold text-white">Earn Certificates</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Reach 100% completion to unlock verified completion certificates instantly.</p>
                </div>
              </div>
            </section>

            {/* 03 / THE WHY SECTION */}
            <section className="max-w-6xl mx-auto px-6 py-12 bg-[#121824]/50 border border-slate-800/80 rounded-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center p-6 md:p-10">
                <div className="space-y-6">
                  {isEditMode ? (
                    <input 
                      type="text" 
                      value={siteContent.theWhyTitle} 
                      onChange={(e) => handleContentChange('theWhyTitle', e.target.value)}
                      className="bg-slate-900 border border-[#00f2fe] text-[#00f2fe] text-xs font-mono uppercase tracking-widest p-2 rounded-lg w-full"
                    />
                  ) : (
                    <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block">{siteContent.theWhyTitle}</span>
                  )}

                  {isEditMode ? (
                    <input 
                      type="text" 
                      value={siteContent.theWhyHeading} 
                      onChange={(e) => handleContentChange('theWhyHeading', e.target.value)}
                      className="bg-slate-900 border border-[#00f2fe] text-white text-3xl font-extrabold p-2 rounded-lg w-full"
                    />
                  ) : (
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white">{siteContent.theWhyHeading}</h2>
                  )}

                  {isEditMode ? (
                    <textarea 
                      value={siteContent.theWhyDesc} 
                      onChange={(e) => handleContentChange('theWhyDesc', e.target.value)}
                      className="bg-slate-900 border border-[#00f2fe] text-slate-300 text-sm p-3 rounded-lg w-full outline-none"
                      rows={4}
                    />
                  ) : (
                    <p className="text-slate-400 text-base leading-relaxed">{siteContent.theWhyDesc}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-[#0b0f17] border border-slate-800 space-y-2">
                    <Shield className="w-8 h-8 text-[#00f2fe]" />
                    <h4 className="font-bold text-white text-sm">Secure Database</h4>
                    <p className="text-xs text-slate-400">Firebase cloud persistence for absolute data reliability.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-[#0b0f17] border border-slate-800 space-y-2">
                    <Sparkles className="w-8 h-8 text-[#00f2fe]" />
                    <h4 className="font-bold text-white text-sm">Teen Focused</h4>
                    <p className="text-xs text-slate-400">Tailored learning curves built specifically for young creators.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 04 / BUILD THE FUTURE TOGETHER */}
            <section className="max-w-4xl mx-auto px-6 text-center space-y-8 py-16">
              {isEditMode ? (
                <input 
                  type="text" 
                  value={siteContent.buildFutureTitle} 
                  onChange={(e) => handleContentChange('buildFutureTitle', e.target.value)}
                  className="bg-slate-900 border border-[#00f2fe] text-[#00f2fe] text-xs font-mono uppercase tracking-widest p-2 rounded-lg mx-auto block text-center"
                />
              ) : (
                <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block">{siteContent.buildFutureTitle}</span>
              )}

              {isEditMode ? (
                <input 
                  type="text" 
                  value={siteContent.buildFutureHeading} 
                  onChange={(e) => handleContentChange('buildFutureHeading', e.target.value)}
                  className="bg-slate-900 border border-[#00f2fe] text-white text-3xl md:text-5xl font-extrabold p-2 rounded-lg mx-auto block text-center w-full"
                />
              ) : (
                <h2 className="text-3xl md:text-5xl font-extrabold text-white">{siteContent.buildFutureHeading}</h2>
              )}

              {isEditMode ? (
                <textarea 
                  value={siteContent.buildFutureDesc} 
                  onChange={(e) => handleContentChange('buildFutureDesc', e.target.value)}
                  className="bg-slate-900 border border-[#00f2fe] text-slate-300 text-sm p-3 rounded-lg mx-auto block w-full max-w-xl outline-none"
                  rows={2}
                />
              ) : (
                <p className="text-slate-400 text-lg max-w-xl mx-auto">{siteContent.buildFutureDesc}</p>
              )}

              <div className="pt-4">
                <button onClick={() => setCurrentPage('courses')} className="px-8 py-4 bg-[#00f2fe] text-black font-bold rounded-xl hover:bg-[#00dfed] transition-all shadow-lg shadow-[#00f2fe]/20 text-base">
                  Get Started Now
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ABOUT PAGE */}
        {currentPage === 'about' && (
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
        )}

        {/* COURSES PAGE */}
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
                  <CheckCircle className="w-5 h-5" /> Support request sent to Firebase Database successfully!
                </div>
              )}
              <input type="text" placeholder="Name" value={supportName} onChange={(e) => setSupportName(e.target.value)} className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white outline-none" required />
              <input type="email" placeholder="Email address" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white outline-none" required />
              <textarea rows="4" placeholder="Message..." value={supportMessage} onChange={(e) => setSupportMessage(e.target.value)} className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl p-4 text-sm text-white resize-none outline-none" required></textarea>
              <button type="submit" className="w-full py-4 bg-[#00f2fe] text-black font-bold rounded-xl text-base">Submit Request</button>
            </form>
          </div>
        )}

        {/* ADMIN PANEL */}
        {currentPage === 'admin' && isAdmin && (
          <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">
            <div className="p-8 rounded-3xl bg-[#121824] border border-teal-500/30 space-y-6">
              <div>
                <span className="text-xs font-mono text-teal-400 uppercase tracking-widest block mb-1">ADMIN COURSE PUBLISHER</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">Publish New Course to Firebase</h2>
              </div>

              {courseSuccess && (
                <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" /> Course published to Firestore successfully!
                </div>
              )}

              <form onSubmit={handlePublishCourse} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Course Title" 
                  value={newCourseTitle} 
                  onChange={(e) => setNewCourseTitle(e.target.value)} 
                  className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white outline-none" 
                  required 
                />
                <textarea 
                  rows="3" 
                  placeholder="Course Description" 
                  value={newCourseDesc} 
                  onChange={(e) => setNewCourseDesc(e.target.value)} 
                  className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl p-4 text-sm text-white resize-none outline-none" 
                  required 
                ></textarea>
                <button type="submit" className="px-6 py-3.5 bg-teal-400 text-black font-bold rounded-xl text-sm flex items-center gap-2">
                  <PlusCircle className="w-5 h-5" /> Publish Course Now
                </button>
              </form>

              <div className="pt-6 border-t border-slate-800">
                <h3 className="text-lg font-bold text-white mb-4">Manage Published Courses ({courses.length})</h3>
                <div className="space-y-3">
                  {courses.map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-4 rounded-2xl bg-[#0b0f17] border border-slate-800">
                      <div>
                        <h4 className="text-sm font-bold text-white">{c.title}</h4>
                        <p className="text-xs text-slate-400 truncate max-w-md">{c.desc}</p>
                      </div>
                      <button onClick={() => deleteCourse(c.id)} className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

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
                        <button onClick={() => deleteTicket(ticket.id)} className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-slate-300 bg-[#121824] p-4 rounded-2xl border border-slate-800/60 leading-relaxed">
                        {ticket.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* DASHBOARD PAGE */}
        {currentPage === 'dashboard' && (
          <SignedIn>
            <div className="max-w-5xl mx-auto px-6 py-16 space-y-10">
              <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-[#00f2fe] uppercase tracking-widest block mb-1">STUDENT CLOUD SPACE</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white">Welcome back, {profile.fullName || user?.firstName || 'Learner'}! 👋</h2>
                  <p className="text-sm text-slate-400 mt-1">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
                <UserButton afterSignOutUrl="/" />
              </div>

              <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 space-y-6">
                <h3 className="text-xl font-bold text-white">Profile Setup (Cloud Synced)</h3>
                {profileSuccess && (
                  <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" /> Saved to Firebase Cloud successfully!
                  </div>
                )}
                <form onSubmit={handleProfileSave} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input 
                      type="text" 
                      value={profile.fullName} 
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} 
                      placeholder="Full Name" 
                      className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white outline-none" 
                      required 
                    />
                    <input 
                      type="number" 
                      value={profile.age} 
                      onChange={(e) => setProfile({ ...profile, age: e.target.value })} 
                      placeholder="Age" 
                      className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white outline-none" 
                    />
                  </div>
                  <textarea 
                    rows="3" 
                    value={profile.bio} 
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })} 
                    placeholder="Bio" 
                    className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl p-4 text-sm text-white outline-none"
                  ></textarea>
                  <button type="submit" className="px-6 py-3 bg-[#00f2fe] text-black font-bold rounded-xl text-sm">Save Profile to Cloud</button>
                </form>
              </div>

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
                          <button onClick={() => updateProgress(course.id)} className="flex-1 py-2.5 bg-[#00f2fe] text-black font-semibold text-xs rounded-xl">Advance Progress (+10%)</button>
                          {currentProgress === 100 && (
                            <button onClick={() => setActiveCertificate({ title: course.title, name: profile.fullName || user?.firstName || 'Learner' })} className="px-4 py-2.5 bg-teal-500/10 text-teal-400 font-bold text-xs rounded-xl flex items-center gap-1.5">
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

            </div>
          </SignedIn>
        )}
      </main>

      {/* Certificate Modal */}
      {activeCertificate && (
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
      )}

    </div>
  );
}
