import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, BookOpen, Bot, ArrowRight, Star, Trophy, Users, CheckCircle, HelpCircle, FileText, Download, Heart, Zap } from 'lucide-react';
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';

const clerkPubKey = "pk_test_ZXZvbHZpbmctZG92ZS03MzA0LmNsZXJrLmFjY291bnRzLmRldiQ";

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

  const [leaderboard] = useState([
    { name: 'David', track: 'Cybersecurity & Safety', progress: 90 },
    { name: 'Ayesha', track: '2D/3D Animation', progress: 75 },
    { name: 'Zain', track: 'AI Tools & Prompting', progress: 95 },
    { name: 'Sara', track: 'Creative Storytelling', progress: 60 },
  ]);

  const [progress, setProgress] = useState(() => {
    if (!user) return { cybersecurity: 20, animation: 10, storytelling: 0, aiTools: 10 };
    const saved = localStorage.getItem(`progress_${user.id}`);
    return saved ? JSON.parse(saved) : { cybersecurity: 20, animation: 10, storytelling: 0, aiTools: 10 };
  });

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`progress_${user.id}`);
      if (saved) {
        setProgress(JSON.parse(saved));
      }
    }
  }, [user]);

  const updateProgress = (courseKey) => {
    if (!user) return;
    const updated = {
      ...progress,
      [courseKey]: Math.min(100, (progress[courseKey] || 0) + 10)
    };
    setProgress(updated);
    localStorage.setItem(`progress_${user.id}`, JSON.stringify(updated));
  };

  const [supportName, setSupportName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSuccess, setSupportSuccess] = useState(false);

  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!supportName || !supportEmail || !supportMessage) return;
    setSupportSuccess(true);
    setSupportName('');
    setSupportEmail('');
    setSupportMessage('');
    setTimeout(() => setSupportSuccess(false), 5000);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSuccess(true);
    setFeedbackText('');
    setTimeout(() => setFeedbackSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 font-sans selection:bg-[#00f2fe] selection:text-black antialiased">
      
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0b0f17]/90 backdrop-blur-md border-b border-slate-800/60 px-8 h-20 flex items-center justify-between">
        <div className="text-xl font-black tracking-wider text-white flex items-center gap-1 cursor-pointer" onClick={() => setCurrentPage('home')}>
          SKILLFORGE <span className="text-[#00f2fe] font-mono">&lt;TEENS/&gt;</span>
        </div>
        <div className="flex gap-6 md:gap-8 text-sm font-medium text-slate-300 items-center">
          <button onClick={() => setCurrentPage('home')} className={`hover:text-[#00f2fe] transition-colors ${currentPage === 'home' ? 'text-[#00f2fe]' : ''}`}>Home</button>
          <button onClick={() => setCurrentPage('about')} className={`hover:text-[#00f2fe] transition-colors ${currentPage === 'about' ? 'text-[#00f2fe]' : ''}`}>About</button>
          <button onClick={() => setCurrentPage('courses')} className={`hover:text-[#00f2fe] transition-colors ${currentPage === 'courses' ? 'text-[#00f2fe]' : ''}`}>Courses</button>
          <button onClick={() => setCurrentPage('resources')} className={`hover:text-[#00f2fe] transition-colors ${currentPage === 'resources' ? 'text-[#00f2fe]' : ''}`}>Resources</button>
          <button onClick={() => setCurrentPage('support')} className={`hover:text-[#00f2fe] transition-colors ${currentPage === 'support' ? 'text-[#00f2fe]' : ''}`}>Support</button>
          
          <SignedIn>
            <div className="flex items-center gap-4">
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
          <div>
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

            {/* Feature Highlights Grid */}
            <section className="max-w-6xl mx-auto px-6 pb-32 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#00f2fe]/10 flex items-center justify-center text-[#00f2fe]">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Project-Based Learning</h3>
                <p className="text-slate-400 text-sm leading-relaxed">No boring lectures. Build real animations, secure safe online profiles, and master prompt engineering right away.</p>
              </div>
              <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#00f2fe]/10 flex items-center justify-center text-[#00f2fe]">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Teen Community</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Connect with peers like David, Ayesha, and thousands of other young creators building their digital future.</p>
              </div>
              <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#00f2fe]/10 flex items-center justify-center text-[#00f2fe]">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Track Your Progress</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Watch your skill levels grow with interactive checkpoints and earn milestones as you complete each module.</p>
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
                Big curiosity deserves a real place to grow.
              </h1>
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
                SkillForge Teens is built from the ground up for young people who want to explore what they can make, protect, tell, and change in today's digital world.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800 space-y-4">
                <h3 className="text-2xl font-bold text-white">Why We Started</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Traditional education often overlooks the creative tech skills teens care about most. We wanted a space free of jargon where you can test out animation, coding safety, storytelling, and AI safely and creatively.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800 space-y-4">
                <h3 className="text-2xl font-bold text-white">Our Values</h3>
                <ul className="space-y-3 text-slate-400 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#00f2fe]" /> Curiosity-driven exploration</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#00f2fe]" /> Ethical and safe technology use</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#00f2fe]" /> Built by teens, guided by mentors</li>
                </ul>
              </div>
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
                  <div className="flex flex-wrap gap-2 text-xs font-mono text-[#00f2fe]">
                    <span className="px-3 py-1 rounded-full bg-[#00f2fe]/10">Safe Browsing</span>
                    <span className="px-3 py-1 rounded-full bg-[#00f2fe]/10">Ethical Hacking Intro</span>
                  </div>
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
                  <div className="flex flex-wrap gap-2 text-xs font-mono text-[#00f2fe]">
                    <span className="px-3 py-1 rounded-full bg-[#00f2fe]/10">Character Design</span>
                    <span className="px-3 py-1 rounded-full bg-[#00f2fe]/10">Motion Physics</span>
                  </div>
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
                  <div className="flex flex-wrap gap-2 text-xs font-mono text-[#00f2fe]">
                    <span className="px-3 py-1 rounded-full bg-[#00f2fe]/10">World Building</span>
                    <span className="px-3 py-1 rounded-full bg-[#00f2fe]/10">Scriptwriting</span>
                  </div>
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
                  <div className="flex flex-wrap gap-2 text-xs font-mono text-[#00f2fe]">
                    <span className="px-3 py-1 rounded-full bg-[#00f2fe]/10">Prompt Engineering</span>
                    <span className="px-3 py-1 rounded-full bg-[#00f2fe]/10">AI Ethics</span>
                  </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-[#121824] border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-[#00f2fe]" />
                  <h3 className="text-xl font-bold text-white">Prompt Engineering Cheat Sheet</h3>
                </div>
                <p className="text-slate-400 text-sm">A quick reference guide with templates to get the best responses from AI tools.</p>
                <div className="pt-2">
                  <span className="text-xs font-mono text-[#00f2fe] flex items-center gap-1.5 cursor-pointer hover:underline"><Download className="w-4 h-4" /> Download PDF Guide</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#121824] border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-[#00f2fe]" />
                  <h3 className="text-xl font-bold text-white">Cybersecurity Checklist for Teens</h3>
                </div>
                <p className="text-slate-400 text-sm">Step-by-step actions to secure your social media, passwords, and private accounts.</p>
                <div className="pt-2">
                  <span className="text-xs font-mono text-[#00f2fe] flex items-center gap-1.5 cursor-pointer hover:underline"><Download className="w-4 h-4" /> Download Checklist</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUPPORT PAGE */}
        {currentPage === 'support' && (
          <div className="max-w-4xl mx-auto px-6 py-20 space-y-12">
            <div>
              <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block mb-3">HELP CENTER</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white">How can we help you today?</h1>
              <p className="text-slate-400 text-lg mt-2">Send us a message and our team will get back to you shortly.</p>
            </div>

            <form onSubmit={handleSupportSubmit} className="p-8 md:p-10 rounded-3xl bg-[#121824] border border-slate-800/80 space-y-6 shadow-xl">
              {supportSuccess && (
                <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" /> Support request submitted successfully! We'll reply soon.
                </div>
              )}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Your Name</label>
                <input type="text" placeholder="e.g. Alex Smith" value={supportName} onChange={(e) => setSupportName(e.target.value)} className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#00f2fe] outline-none" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Email Address</label>
                <input type="email" placeholder="e.g. alex@example.com" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#00f2fe] outline-none" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">How can we help?</label>
                <textarea rows="4" placeholder="Describe your question or issue..." value={supportMessage} onChange={(e) => setSupportMessage(e.target.value)} className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl p-4 text-sm text-white resize-none focus:border-[#00f2fe] outline-none" required></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-[#00f2fe] text-black font-bold rounded-xl text-base hover:bg-[#00dfed] transition-all shadow-lg shadow-[#00f2fe]/20">Submit Support Request</button>
            </form>
          </div>
        )}

        {/* DASHBOARD PAGE */}
        {currentPage === 'dashboard' && (
          <SignedIn>
            <div className="max-w-5xl mx-auto px-6 py-16 space-y-10">
              <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-[#00f2fe] uppercase tracking-widest block mb-1">STUDENT DASHBOARD</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white">Welcome back, {user?.firstName || user?.username || 'Learner'}! 👋</h2>
                  <p className="text-sm text-slate-400 mt-1">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
                <UserButton afterSignOutUrl="/" />
              </div>

              {/* Personal Tracks Progress Grid */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#00f2fe]" /> Your Enrolled Tracks Progress
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
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
                    <button onClick={() => updateProgress('cybersecurity')} className="w-full py-2.5 bg-[#00f2fe] text-black font-semibold text-sm rounded-xl hover:bg-[#00dfed] transition-all">Advance Progress (+10%)</button>
                  </div>
                  
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
                    <button onClick={() => updateProgress('animation')} className="w-full py-2.5 bg-[#00f2fe] text-black font-semibold text-sm rounded-xl hover:bg-[#00dfed] transition-all">Advance Progress (+10%)</button>
                  </div>

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
                    <button onClick={() => updateProgress('storytelling')} className="w-full py-2.5 bg-[#00f2fe] text-black font-semibold text-sm rounded-xl hover:bg-[#00dfed] transition-all">Advance Progress (+10%)</button>
                  </div>

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
                    <button onClick={() => updateProgress('aiTools')} className="w-full py-2.5 bg-[#00f2fe] text-black font-semibold text-sm rounded-xl hover:bg-[#00dfed] transition-all">Advance Progress (+10%)</button>
                  </div>

                </div>
              </div>

              {/* Community Leaderboard Wall */}
              <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 space-y-6">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-[#00f2fe]" />
                  <h3 className="text-xl font-bold text-white">Community Progress Wall</h3>
                </div>
                <div className="space-y-3">
                  {leaderboard.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-[#0b0f17] border border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#00f2fe]/10 text-[#00f2fe] font-bold flex items-center justify-center text-sm">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{item.name}</p>
                          <p className="text-xs text-slate-400">{item.track}</p>
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
                <textarea rows="4" placeholder="Tell us what's working or what we can improve..." value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl p-4 text-sm text-white resize-none focus:border-[#00f2fe] outline-none"></textarea>
                <button type="submit" className="px-6 py-3 bg-[#00f2fe] text-black font-bold rounded-xl text-sm hover:bg-[#00dfed] transition-all">Submit Feedback</button>
              </form>
            </div>
          </SignedIn>
        )}
      </main>
    </div>
  );
}