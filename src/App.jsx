import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Mail, Bot, ArrowRight, Star } from 'lucide-react';
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

  const [progress, setProgress] = useState(() => {
    if (!user) return { cybersecurity: 0, animation: 0, storytelling: 0, aiTools: 0 };
    const saved = localStorage.getItem(`progress_${user.id}`);
    return saved ? JSON.parse(saved) : { cybersecurity: 0, animation: 0, storytelling: 0, aiTools: 0 };
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
      [courseKey]: Math.min(100, progress[courseKey] + 10)
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
        {currentPage === 'home' && (
          <section className="relative px-6 pt-20 pb-32 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#00f2fe]/10 via-transparent to-transparent pointer-events-none blur-3xl max-w-2xl mx-auto h-96"></div>
            <div className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wide text-[#00f2fe] uppercase bg-[#00f2fe]/10 border border-[#00f2fe]/30 rounded-full">
              Built with teens. Built for what's next.
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto mb-6 leading-tight">
              Discover Your Superpower <br className="hidden md:block"/>
              <span className="text-white">– By Teens, For Teens</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              SkillForge Teens helps you explore the tech and creative skills that feel like you — with guided pathways and real projects.
            </p>
            <button onClick={() => setCurrentPage('courses')} className="px-8 py-4 bg-[#00f2fe] text-black font-bold rounded-xl hover:bg-[#00dfed] transition-all flex items-center gap-3 mx-auto shadow-lg shadow-[#00f2fe]/20 text-lg">
              Find Your Superpower Now <ArrowRight className="w-5 h-5" />
            </button>
          </section>
        )}

        {currentPage === 'about' && (
          <div className="max-w-6xl mx-auto px-6 py-24">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl leading-tight">
              Big curiosity deserves a real place to grow.
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-3xl leading-relaxed">
              SkillForge Teens is built for young people who want to explore what they can make, protect, tell, and change.
            </p>
          </div>
        )}

        {currentPage === 'courses' && (
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="mb-16">
              <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block mb-3">SKILL TRACKS</span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl leading-tight">
                Pick a path. Start making.
              </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-2xl bg-[#121824] border border-slate-800/80">
                <Shield className="w-8 h-8 text-[#00f2fe] mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3">Cybersecurity & Safety</h3>
                <p className="text-slate-400 mb-6">Practice smart digital habits and protect spaces.</p>
                <SignedIn>
                  <button onClick={() => { updateProgress('cybersecurity'); setCurrentPage('dashboard'); }} className="px-5 py-2.5 bg-[#00f2fe] text-black font-semibold text-sm rounded-xl">Continue Learning</button>
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="px-5 py-2.5 bg-[#00f2fe] text-black font-semibold text-sm rounded-xl">Sign in to Enroll</button>
                  </SignInButton>
                </SignedOut>
              </div>
              <div className="p-8 rounded-2xl bg-[#121824] border border-slate-800/80">
                <Sparkles className="w-8 h-8 text-[#00f2fe] mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3">2D/3D Animation</h3>
                <p className="text-slate-400 mb-6">Bring original characters to life.</p>
                <SignedIn>
                  <button onClick={() => { updateProgress('animation'); setCurrentPage('dashboard'); }} className="px-5 py-2.5 bg-[#00f2fe] text-black font-semibold text-sm rounded-xl">Continue Learning</button>
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="px-5 py-2.5 bg-[#00f2fe] text-black font-semibold text-sm rounded-xl">Sign in to Enroll</button>
                  </SignInButton>
                </SignedOut>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'resources' && (
          <div className="max-w-6xl mx-auto px-6 py-24">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">Small tools. Big next moves.</h1>
            <p className="text-slate-400 text-lg">Quick-start guides and project prompts for your journey.</p>
          </div>
        )}

        {currentPage === 'support' && (
          <div className="max-w-4xl mx-auto px-6 py-24 space-y-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">How can we help you today?</h1>
            <form onSubmit={handleSupportSubmit} className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 space-y-6">
              {supportSuccess && <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm">✓ Support request submitted successfully!</div>}
              <input type="text" placeholder="Name" value={supportName} onChange={(e) => setSupportName(e.target.value)} className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white" />
              <input type="email" placeholder="Email address" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white" />
              <textarea rows="4" placeholder="Message..." value={supportMessage} onChange={(e) => setSupportMessage(e.target.value)} className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl p-4 text-sm text-white resize-none"></textarea>
              <button type="submit" className="px-6 py-3.5 bg-[#00f2fe] text-black font-bold rounded-xl text-sm">Submit Request</button>
            </form>
          </div>
        )}

        {currentPage === 'dashboard' && (
          <SignedIn>
            <div className="max-w-5xl mx-auto px-6 py-16 space-y-8">
              <div className="p-6 rounded-2xl bg-[#121824] border border-slate-800/80 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Welcome back, {user?.firstName || user?.username || 'Learner'}!</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
                <UserButton afterSignOutUrl="/" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[#121824] border border-slate-800/80 space-y-4">
                  <h4 className="text-lg font-bold text-white">Cybersecurity & Safety</h4>
                  <p className="text-xs font-mono text-[#00f2fe]">{progress.cybersecurity}% complete</p>
                  <button onClick={() => updateProgress('cybersecurity')} className="px-5 py-2.5 bg-[#00f2fe] text-black font-semibold text-sm rounded-xl">Continue Learning (+10%)</button>
                </div>
                <div className="p-6 rounded-2xl bg-[#121824] border border-slate-800/80 space-y-4">
                  <h4 className="text-lg font-bold text-white">2D/3D Animation</h4>
                  <p className="text-xs font-mono text-[#00f2fe]">{progress.animation}% complete</p>
                  <button onClick={() => updateProgress('animation')} className="px-5 py-2.5 bg-[#00f2fe] text-black font-semibold text-sm rounded-xl">Continue Learning (+10%)</button>
                </div>
              </div>

              {/* Feedback Form */}
              <form onSubmit={handleFeedbackSubmit} className="p-8 rounded-2xl bg-[#121824] border border-slate-800/80 space-y-5">
                <h3 className="text-xl font-bold text-white">How is your experience so far?</h3>
                <div className="flex gap-1.5 text-[#00f2fe]">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-6 h-6 fill-[#00f2fe]" />))}
                </div>
                {feedbackSuccess && <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs">✓ Thank you for your feedback!</div>}
                <textarea rows="4" placeholder="Tell us what's working..." value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl p-4 text-sm text-white resize-none"></textarea>
                <button type="submit" className="px-6 py-3 bg-[#00f2fe] text-black font-bold rounded-xl text-sm">Submit Feedback</button>
              </form>
            </div>
          </SignedIn>
        )}
      </main>
    </div>
  );
}