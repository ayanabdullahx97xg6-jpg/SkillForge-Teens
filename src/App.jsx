import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, BookOpen, Bot, ArrowRight, Star, Trophy, Users, CheckCircle, FileText, Download, Award, X, Inbox, Trash2 } from 'lucide-react';
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';

const clerkPubKey = "pk_test_ZXZvbHZpbmctZG92ZS03MzA0LmNsZXJrLmFjY291bnRzLmRldiQ";

// Aap ki Admin Email yahan set ho chuki hai
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

  // Check if current logged-in user is admin
  const isAdmin = user && user.primaryEmailAddress?.emailAddress === ADMIN_EMAIL;

  // Community Leaderboard
  const [leaderboard, setLeaderboard] = useState(() => {
    const saved = localStorage.getItem('skillforge_community_leaderboard');
    return saved ? JSON.parse(saved) : [
      { id: 'david', name: 'David', track: 'Cybersecurity & Safety', progress: 90 },
      { id: 'ayesha', name: 'Ayesha', track: '2D/3D Animation', progress: 75 },
      { id: 'zain', name: 'Zain', track: 'AI Tools & Prompting', progress: 95 },
      { id: 'sara', name: 'Sara', track: 'Creative Storytelling', progress: 60 },
    ];
  });

  const [progress, setProgress] = useState(() => {
    if (!user) return { cybersecurity: 20, animation: 10, storytelling: 0, aiTools: 10 };
    const saved = localStorage.getItem(`progress_${user.id}`);
    return saved ? JSON.parse(saved) : { cybersecurity: 20, animation: 10, storytelling: 0, aiTools: 10 };
  });

  // Support Requests State (Admin Inbox)
  const [supportRequests, setSupportRequests] = useState(() => {
    const saved = localStorage.getItem('skillforge_support_requests');
    return saved ? JSON.parse(saved) : [];
  });

  // Certificate Modal State
  const [activeCertificate, setActiveCertificate] = useState(null);

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`progress_${user.id}`);
      const userName = user.firstName || user.username || 'Learner';
      
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
    const tracks = [
      { name: 'Cybersecurity & Safety', val: currentProgress.cybersecurity },
      { name: '2D/3D Animation', val: currentProgress.animation },
      { name: 'Creative Storytelling', val: currentProgress.storytelling },
      { name: 'AI Tools & Prompting', val: currentProgress.aiTools },
    ];
    tracks.sort((a, b) => b.val - a.val);
    const topTrack = tracks[0];

    setLeaderboard((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === userId);
      let updated;
      if (existingIndex > -1) {
        updated = [...prev];
        updated[existingIndex] = { id: userId, name: userName, track: topTrack.name, progress: topTrack.val };
      } else {
        updated = [...prev, { id: userId, name: userName, track: topTrack.name, progress: topTrack.val }];
      }
      localStorage.setItem('skillforge_community_leaderboard', JSON.stringify(updated));
      return updated;
    });
  };

  const updateProgress = (courseKey) => {
    if (!user) return;
    const updated = {
      ...progress,
      [courseKey]: Math.min(100, (progress[courseKey] || 0) + 10)
    };
    setProgress(updated);
    localStorage.setItem(`progress_${user.id}`, JSON.stringify(updated));
    
    const userName = user.firstName || user.username || 'Learner';
    updateLeaderboardInStorage(user.id, userName, updated);
  };

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
          <button onClick={() => setCurrentPage('resources')} className={`hover:text-[#00f2fe] transition-colors ${currentPage === 'resources' ? 'text-[#00f2fe]' : ''}`}>Resources</button>
          <button onClick={() => setCurrentPage('support')} className={`hover:text-[#00f2fe] transition-colors ${currentPage === 'support' ? 'text-[#00f2fe]' : ''}`}>Support</button>
          
          {isAdmin && (
            <button onClick={() => setCurrentPage('admin')} className={`px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/40 text-teal-400 font-bold flex items-center gap-1.5 text-xs ${currentPage === 'admin' ? 'bg-teal-500/20' : ''}`}>
              <Inbox className="w-4 h-4" /> Admin Inbox ({supportRequests.length})
            </button>
          )}

          <SignedIn>
            <div className="flex items-center gap-3">
              <button onClick={() => setCurrentPage('dashboard')} className={`text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-800 ${currentPage === 'dashboard' ? 'border-[#00f2fe] text-[#00f2fe]' : 'text-slate-300'}`}>
                Dashboard
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

        {/* COURSES PAGE */}
        {currentPage === 'courses' && (
          <div className="max-w-6xl mx-auto px-6 py-20 space-y-12">
            <div>
              <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block mb-3">SKILL TRACKS</span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                Pick a path. Start making.
              </h1>
              <p className="text-slate-400 text-lg">Choose a track below to begin your hands-on journey.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 flex flex-col justify-between space-y-6">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#00f2fe]/10 flex items-center justify-center text-[#00f2fe] mb-6">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Cybersecurity & Safety</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">Practice smart digital habits, understand encryption basics, and learn how to secure your online presence against modern threats.</p>
                </div>
                <SignedIn>
                  <button onClick={() => { updateProgress('cybersecurity'); setCurrentPage('dashboard'); }} className="w-full py-3 bg-[#00f2fe] text-black font-bold text-sm rounded-xl hover:bg-[#00dfed] transition-all">Start Track & View Dashboard</button>
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="w-full py-3 bg-[#00f2fe] text-black font-bold text-sm rounded-xl hover:bg-[#00dfed] transition-all">Sign in to Enroll</button>
                  </SignInButton>
                </SignedOut>
              </div>

              <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 flex flex-col justify-between space-y-6">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#00f2fe]/10 flex items-center justify-center text-[#00f2fe] mb-6">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">2D/3D Animation</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">Bring original characters to life using industry-standard principles of motion, keyframing, and basic modeling.</p>
                </div>
                <SignedIn>
                  <button onClick={() => { updateProgress('animation'); setCurrentPage('dashboard'); }} className="w-full py-3 bg-[#00f2fe] text-black font-bold text-sm rounded-xl hover:bg-[#00dfed] transition-all">Start Track & View Dashboard</button>
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="w-full py-3 bg-[#00f2fe] text-black font-bold text-sm rounded-xl hover:bg-[#00dfed] transition-all">Sign in to Enroll</button>
                  </SignInButton>
                </SignedOut>
              </div>

              <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 flex flex-col justify-between space-y-6">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#00f2fe]/10 flex items-center justify-center text-[#00f2fe] mb-6">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Creative Storytelling</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">Master the art of digital writing, script formatting, world-building, and engaging media production for modern platforms.</p>
                </div>
                <SignedIn>
                  <button onClick={() => { updateProgress('storytelling'); setCurrentPage('dashboard'); }} className="w-full py-3 bg-[#00f2fe] text-black font-bold text-sm rounded-xl hover:bg-[#00dfed] transition-all">Start Track & View Dashboard</button>
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="w-full py-3 bg-[#00f2fe] text-black font-bold text-sm rounded-xl hover:bg-[#00dfed] transition-all">Sign in to Enroll</button>
                  </SignInButton>
                </SignedOut>
              </div>

              <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 flex flex-col justify-between space-y-6">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#00f2fe]/10 flex items-center justify-center text-[#00f2fe] mb-6">
                    <Bot className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">AI Tools & Prompting</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">Learn how to leverage AI ethically, craft powerful prompts, generate creative assets, and supercharge your productivity.</p>
                </div>
                <SignedIn>
                  <button onClick={() => { updateProgress('aiTools'); setCurrentPage('dashboard'); }} className="w-full py-3 bg-[#00f2fe] text-black font-bold text-sm rounded-xl hover:bg-[#00dfed] transition-all">Start Track & View Dashboard</button>
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="w-full py-3 bg-[#00f2fe] text-black font-bold text-sm rounded-xl hover:bg-[#00dfed] transition-all">Sign in to Enroll</button>
                  </SignInButton>
                </SignedOut>
              </div>
            </div>
          </div>
        )}

        {/* RESOURCES PAGE */}
        {currentPage === 'resources' && (
          <div className="max-w-5xl mx-auto px-6 py-20 space-y-12">
            <div>
              <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block mb-3">LEARNING TOOLKIT</span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">Small tools. Big next moves.</h1>
              <p className="text-slate-400 text-lg">Quick-start guides, cheat sheets, and project prompts for your creative journey.</p>
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

        {/* ADMIN INBOX PAGE (Only visible to ADMIN_EMAIL) */}
        {currentPage === 'admin' && isAdmin && (
          <div className="max-w-5xl mx-auto px-6 py-16 space-y-8">
            <div className="p-8 rounded-3xl bg-[#121824] border border-teal-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-teal-400 uppercase tracking-widest block mb-1">ADMIN CONTROL PANEL</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">Support Inbox</h2>
                <p className="text-sm text-slate-400 mt-1">Incoming messages from users seeking help.</p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-teal-500/10 text-teal-400 font-bold text-sm">
                {supportRequests.length} Total Requests
              </div>
            </div>

            <div className="space-y-4">
              {supportRequests.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-[#121824] border border-slate-800 text-slate-400">
                  No support requests found. All clear! 🚀
                </div>
              ) : (
                supportRequests.map((ticket) => (
                  <div key={ticket.id} className="p-6 rounded-3xl bg-[#121824] border border-slate-800/80 space-y-4 flex flex-col justify-between">
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
                    <p className="text-sm text-slate-300 bg-[#0b0f17] p-4 rounded-2xl border border-slate-800/60 leading-relaxed">
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
        )}

        {/* DASHBOARD PAGE */}
        {currentPage === 'dashboard' && (
          <SignedIn>
            <div className="max-w-5xl mx-auto px-6 py-16 space-y-10">
              <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-[#00f2fe] uppercase tracking-widest block mb-1">STUDENT SPACE & VAULT</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white">Welcome back, {user?.firstName || user?.username || 'Learner'}! 👋</h2>
                  <p className="text-sm text-slate-400 mt-1">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
                <UserButton afterSignOutUrl="/" />
              </div>

              {/* Personal Tracks Progress & Certificates */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#00f2fe]" /> Your Enrolled Tracks & Certificates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Track 1 */}
                  <div className="p-6 rounded-3xl bg-[#121824] border border-slate-800/80 space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-lg font-bold text-white">Cybersecurity & Safety</h4>
                        <span className="text-xs font-mono text-[#00f2fe] bg-[#00f2fe]/10 px-2.5 py-1 rounded-full">{progress.cybersecurity}% completed</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                        <div className="bg-[#00f2fe] h-full transition-all duration-300" style={{ width: `${progress.cybersecurity}%` }}></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => updateProgress('cybersecurity')} className="flex-1 py-2.5 bg-[#00f2fe] text-black font-semibold text-xs rounded-xl hover:bg-[#00dfed] transition-all">Advance (+10%)</button>
                      {progress.cybersecurity === 100 && (
                        <button onClick={() => setActiveCertificate({ title: 'Cybersecurity & Safety', name: user?.firstName || 'Learner' })} className="px-4 py-2.5 bg-teal-500/10 border border-teal-500/40 text-teal-400 font-bold text-xs rounded-xl flex items-center gap-1.5 hover:bg-teal-500/20">
                          <Award className="w-4 h-4" /> Certificate
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Track 2 */}
                  <div className="p-6 rounded-3xl bg-[#121824] border border-slate-800/80 space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-lg font-bold text-white">2D/3D Animation</h4>
                        <span className="text-xs font-mono text-[#00f2fe] bg-[#00f2fe]/10 px-2.5 py-1 rounded-full">{progress.animation}% completed</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                        <div className="bg-[#00f2fe] h-full transition-all duration-300" style={{ width: `${progress.animation}%` }}></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => updateProgress('animation')} className="flex-1 py-2.5 bg-[#00f2fe] text-black font-semibold text-xs rounded-xl hover:bg-[#00dfed] transition-all">Advance (+10%)</button>
                      {progress.animation === 100 && (
                        <button onClick={() => setActiveCertificate({ title: '2D/3D Animation', name: user?.firstName || 'Learner' })} className="px-4 py-2.5 bg-teal-500/10 border border-teal-500/40 text-teal-400 font-bold text-xs rounded-xl flex items-center gap-1.5 hover:bg-teal-500/20">
                          <Award className="w-4 h-4" /> Certificate
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Track 3 */}
                  <div className="p-6 rounded-3xl bg-[#121824] border border-slate-800/80 space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-lg font-bold text-white">Creative Storytelling</h4>
                        <span className="text-xs font-mono text-[#00f2fe] bg-[#00f2fe]/10 px-2.5 py-1 rounded-full">{progress.storytelling}% completed</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                        <div className="bg-[#00f2fe] h-full transition-all duration-300" style={{ width: `${progress.storytelling}%` }}></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => updateProgress('storytelling')} className="flex-1 py-2.5 bg-[#00f2fe] text-black font-semibold text-xs rounded-xl hover:bg-[#00dfed] transition-all">Advance (+10%)</button>
                      {progress.storytelling === 100 && (
                        <button onClick={() => setActiveCertificate({ title: 'Creative Storytelling', name: user?.firstName || 'Learner' })} className="px-4 py-2.5 bg-teal-500/10 border border-teal-500/40 text-teal-400 font-bold text-xs rounded-xl flex items-center gap-1.5 hover:bg-teal-500/20">
                          <Award className="w-4 h-4" /> Certificate
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Track 4 */}
                  <div className="p-6 rounded-3xl bg-[#121824] border border-slate-800/80 space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-lg font-bold text-white">AI Tools & Prompting</h4>
                        <span className="text-xs font-mono text-[#00f2fe] bg-[#00f2fe]/10 px-2.5 py-1 rounded-full">{progress.aiTools}% completed</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                        <div className="bg-[#00f2fe] h-full transition-all duration-300" style={{ width: `${progress.aiTools}%` }}></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => updateProgress('aiTools')} className="flex-1 py-2.5 bg-[#00f2fe] text-black font-semibold text-xs rounded-xl hover:bg-[#00dfed] transition-all">Advance (+10%)</button>
                      {progress.aiTools === 100 && (
                        <button onClick={() => setActiveCertificate({ title: 'AI Tools & Prompting', name: user?.firstName || 'Learner' })} className="px-4 py-2.5 bg-teal-500/10 border border-teal-500/40 text-teal-400 font-bold text-xs rounded-xl flex items-center gap-1.5 hover:bg-teal-500/20">
                          <Award className="w-4 h-4" /> Certificate
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* Real-Time Community Leaderboard Wall */}
              <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 space-y-6">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-[#00f2fe]" />
                  <h3 className="text-xl font-bold text-white">Live Community Leaderboard (All Users)</h3>
                </div>
                <div className="space-y-3">
                  {leaderboard
                    .sort((a, b) => b.progress - a.progress)
                    .map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-[#0b0f17] border border-slate-800">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#00f2fe]/10 text-[#00f2fe] font-bold flex items-center justify-center text-sm">
                            {item.name.charAt(0)}
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

              {/* Feedback Form */}
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

      {/* CERTIFICATE MODAL POPUP */}
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
                <Download className="w-4 h-4" /> Download Certificate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}