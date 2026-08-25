import React, { useState } from 'react';
import { Shield, Sparkles, Mail, Bot, ArrowRight, Star } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

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
          
          {currentPage === 'dashboard' ? (
            <button onClick={() => setCurrentPage('home')} className="px-4 py-2 rounded-xl bg-[#121824] border border-slate-800 hover:border-[#00f2fe] transition-all text-xs font-semibold text-[#00f2fe]">Logout</button>
          ) : (
            <button onClick={() => setCurrentPage('login')} className={`px-4 py-2 rounded-xl bg-[#121824] border border-slate-800 hover:border-[#00f2fe] transition-all text-xs font-semibold ${currentPage === 'login' ? 'border-[#00f2fe] text-[#00f2fe]' : ''}`}>Login</button>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-20">
        
        {/* 1. HOME PAGE */}
        {currentPage === 'home' && (
          <div>
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
                SkillForge Teens helps you explore the tech and creative skills that feel like you — with guided pathways, real projects, and a community that gets it.
              </p>

              <div className="flex flex-col items-center gap-4">
                <button onClick={() => setCurrentPage('courses')} className="px-8 py-4 bg-[#00f2fe] text-black font-bold rounded-xl hover:bg-[#00dfed] transition-all flex items-center gap-3 shadow-lg shadow-[#00f2fe]/20 text-lg">
                  Find Your Superpower Now <ArrowRight className="w-5 h-5" />
                </button>
                <div className="px-4 py-1.5 text-xs text-slate-400 tracking-wider font-mono border border-slate-800 bg-slate-900/50 rounded-lg">
                  YOUR NEXT OBSESSION MIGHT BE ONE QUIZ AWAY.
                </div>
              </div>
            </section>

            <section className="px-6 py-20 max-w-7xl mx-auto border-t border-slate-900">
              <div className="mb-12">
                <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase">01 / HOW IT WORKS</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Meet the quiz that actually gets you.</h2>
                <p className="text-slate-400 mt-2">Four quick stages turn your interests into a curated starting point — no boring labels, no pressure.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { step: "01", title: "Choose your energy", desc: "Tell us what makes you curious, creative, or ready to solve a puzzle." },
                  { step: "02", title: "Pick a challenge", desc: "Choose mini scenarios that feel closer to games than homework." },
                  { step: "03", title: "Get your signal", desc: "We match your answers with pathways designed to spark a real next move." },
                  { step: "04", title: "Start building", desc: "Try a first project, share it with your crew, and see what clicks." }
                ].map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-[#121824] border border-slate-800/80 hover:border-[#00f2fe]/40 transition-all group">
                    <span className="text-[#00f2fe] font-mono text-xl font-bold">{item.step}</span>
                    <h3 className="text-xl font-bold text-white mt-3 mb-2 group-hover:text-[#00f2fe] transition-colors">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* 2. ABOUT PAGE */}
        {currentPage === 'about' && (
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="mb-16">
              <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block mb-3">FOUNDER & MISSION</span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl leading-tight">
                Big curiosity deserves a real place to grow.
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-3xl leading-relaxed">
                SkillForge Teens is built for young people who want to explore what they can make, protect, tell, and change. We turn curiosity into practical confidence through safe, project-led learning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 rounded-2xl bg-[#121824] border border-slate-800/80 hover:border-slate-700 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">Explore safely</h3>
                <p className="text-slate-400 text-sm leading-relaxed">A guided home base for trying bold ideas without pressure.</p>
              </div>
              <div className="p-8 rounded-2xl bg-[#121824] border border-slate-800/80 hover:border-slate-700 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">Make it real</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Every pathway ends with something tangible that you can share.</p>
              </div>
              <div className="p-8 rounded-2xl bg-[#121824] border border-slate-800/80 hover:border-slate-700 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">Grow together</h3>
                <p className="text-slate-400 text-sm leading-relaxed">A community that celebrates first steps, big questions, and brave experiments.</p>
              </div>
            </div>
          </div>
        )}

        {/* 3. COURSES PAGE */}
        {currentPage === 'courses' && (
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="mb-16">
              <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block mb-3">SKILL TRACKS</span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl leading-tight">
                Pick a path. Start making.
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-3xl leading-relaxed">
                Four launch pads for curious minds — each one beginner-friendly, project-led, and designed to help you discover what clicks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-2xl bg-[#121824] border border-slate-800/80 hover:border-slate-700 transition-all">
                <div className="text-[#00f2fe] mb-6"><Shield className="w-8 h-8" /></div>
                <h3 className="text-2xl font-bold text-white mb-3">Cybersecurity & Safety</h3>
                <p className="text-slate-400 leading-relaxed">Practice smart digital habits, spot red flags, and protect the spaces you care about.</p>
              </div>
              <div className="p-8 rounded-2xl bg-[#121824] border border-slate-800/80 hover:border-slate-700 transition-all">
                <div className="text-[#00f2fe] mb-6"><Sparkles className="w-8 h-8" /></div>
                <h3 className="text-2xl font-bold text-white mb-3">2D/3D Animation</h3>
                <p className="text-slate-400 leading-relaxed">Bring original characters, worlds, and motion graphics to life from your own point of view.</p>
              </div>
              <div className="p-8 rounded-2xl bg-[#121824] border border-slate-800/80 hover:border-slate-700 transition-all">
                <div className="text-[#00f2fe] mb-6"><Mail className="w-8 h-8" /></div>
                <h3 className="text-2xl font-bold text-white mb-3">Digital Storytelling</h3>
                <p className="text-slate-400 leading-relaxed">Shape stories people remember — from shorts and podcasts to interactive worlds.</p>
              </div>
              <div className="p-8 rounded-2xl bg-[#121824] border border-slate-800/80 hover:border-slate-700 transition-all">
                <div className="text-[#00f2fe] mb-6"><Bot className="w-8 h-8" /></div>
                <h3 className="text-2xl font-bold text-white mb-3">Tech & AI Tools</h3>
                <p className="text-slate-400 leading-relaxed">Experiment responsibly with the tools shaping tomorrow and build with purpose.</p>
              </div>
            </div>
          </div>
        )}

        {/* 4. RESOURCES PAGE */}
        {currentPage === 'resources' && (
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="mb-16">
              <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block mb-3">PRACTICAL RESOURCES</span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl leading-tight">
                Small tools. Big next moves.
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-3xl leading-relaxed">
                Quick-start guides, project prompts, and confidence boosters for every stage of your SkillForge journey.
              </p>
            </div>
          </div>
        )}

        {/* 5. SUPPORT PAGE */}
        {currentPage === 'support' && (
          <div className="max-w-4xl mx-auto px-6 py-24 space-y-12">
            <div>
              <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block mb-3">HELP & SUPPORT</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                How can we help you today?
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#121824] border border-slate-800/80 hover:border-slate-700 transition-all">
                <h3 className="text-lg font-bold text-white mb-1">Login & Account Issues</h3>
                <p className="text-slate-400 text-sm">Password, profile, and sign-in help.</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#121824] border border-slate-800/80 hover:border-slate-700 transition-all">
                <h3 className="text-lg font-bold text-white mb-1">Track & Course Help</h3>
                <p className="text-slate-400 text-sm">Pathways, projects, and learning questions.</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#121824] border border-slate-800/80 hover:border-slate-700 transition-all">
                <h3 className="text-lg font-bold text-white mb-1">Technical Bugs</h3>
                <p className="text-slate-400 text-sm">Something not loading or behaving right?</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#121824] border border-slate-800/80 hover:border-slate-700 transition-all">
                <h3 className="text-lg font-bold text-white mb-1">General Inquiries</h3>
                <p className="text-slate-400 text-sm">Partnerships, community, and everything else.</p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 shadow-2xl space-y-6">
              <h3 className="text-xl font-bold text-white">Send a support request</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Username" className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#00f2fe] text-sm" />
                <input type="email" placeholder="Email address" className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#00f2fe] text-sm" />
                <div className="relative">
                  <select className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-slate-200 focus:outline-none focus:border-[#00f2fe] text-sm appearance-none cursor-pointer">
                    <option>Login & Account Issues</option>
                    <option>Track & Course Help</option>
                    <option>Technical Bugs</option>
                    <option>General Inquiries</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
                </div>
                <textarea rows="4" placeholder="Tell us what you need help with..." className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl p-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#00f2fe] text-sm resize-none"></textarea>
              </div>
              <button className="px-6 py-3.5 bg-[#00f2fe] text-black font-bold rounded-xl hover:bg-[#00dfed] transition-all text-sm shadow-lg shadow-[#00f2fe]/10">
                Submit Request
              </button>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-5 py-2.5 rounded-xl bg-[#00f2fe] text-black font-semibold text-xs tracking-wide">Privacy Policy</button>
              <button className="px-5 py-2.5 rounded-xl bg-[#00f2fe] text-black font-semibold text-xs tracking-wide">Terms of Service</button>
              <button className="px-5 py-2.5 rounded-xl bg-[#00f2fe] text-black font-semibold text-xs tracking-wide">Community Guidelines</button>
            </div>
          </div>
        )}

        {/* 6. LOGIN PAGE */}
        {currentPage === 'login' && (
          <div className="max-w-xl mx-auto px-6 py-24 text-center">
            <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block mb-3">SKILLFORGE ACCOUNT</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Build your launchpad.
            </h1>
            <p className="text-slate-400 text-base md:text-lg mb-10 max-w-md mx-auto">
              Sign in to keep your projects, progress, and next best step together.
            </p>

            <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 shadow-2xl text-left space-y-4">
              <div><input type="text" placeholder="Username" className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#00f2fe] text-sm" /></div>
              <div><input type="email" placeholder="Email address" className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#00f2fe] text-sm" /></div>
              <div><input type="password" placeholder="Password" className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#00f2fe] text-sm" /></div>
              
              <div className="pt-2 space-y-3">
                <button onClick={() => setCurrentPage('dashboard')} className="w-full py-4 bg-[#00f2fe] text-black font-bold rounded-xl hover:bg-[#00dfed] transition-all text-center shadow-lg shadow-[#00f2fe]/10">
                  Continue
                </button>
                <button onClick={() => setCurrentPage('dashboard')} className="w-full py-4 bg-[#a78bfa] text-black font-bold rounded-xl hover:bg-[#9061f9] transition-all text-center">
                  Personalize my learning path
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 7. DASHBOARD PAGE */}
        {currentPage === 'dashboard' && (
          <div className="max-w-5xl mx-auto px-6 py-16 space-y-8">
            <div className="p-6 rounded-2xl bg-[#121824] border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00f2fe]/20 text-[#00f2fe] flex items-center justify-center font-bold text-xl border border-[#00f2fe]/40">A</div>
                <div><h2 className="text-xl font-bold text-white">Ayan's SkillForge</h2></div>
              </div>
              <div className="px-5 py-2 rounded-full border border-[#00f2fe]/40 bg-[#00f2fe]/10 text-[#00f2fe] font-mono text-xs font-semibold tracking-wider">
                LEVEL 1 / 100
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#121824] border border-slate-800/80 space-y-4">
              <h3 className="text-xl font-bold text-white">Your forge progress</h3>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div className="bg-[#00f2fe] h-full rounded-full w-[12%]"></div>
              </div>
              <p className="text-xs font-mono text-slate-400 tracking-wider">PROFESSIONAL CERTIFICATE UNLOCKED AT LEVEL 100</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#121824] border border-slate-800/80 space-y-4">
                <div><h4 className="text-lg font-bold text-white">Cybersecurity & Safety</h4><p className="text-xs font-mono text-purple-400 mt-1">12% complete</p></div>
                <button className="px-5 py-2.5 bg-[#00f2fe] text-black font-semibold text-sm rounded-xl hover:bg-[#00dfed] transition-all shadow-md shadow-[#00f2fe]/10">Continue Learning</button>
              </div>
              <div className="p-6 rounded-2xl bg-[#121824] border border-slate-800/80 space-y-4">
                <div><h4 className="text-lg font-bold text-white">2D/3D Animation</h4><p className="text-xs font-mono text-purple-400 mt-1">7% complete</p></div>
                <button className="px-5 py-2.5 bg-[#00f2fe] text-black font-semibold text-sm rounded-xl hover:bg-[#00dfed] transition-all shadow-md shadow-[#00f2fe]/10">Continue Learning</button>
              </div>
              <div className="p-6 rounded-2xl bg-[#121824] border border-slate-800/80 space-y-4">
                <div><h4 className="text-lg font-bold text-white">Digital Storytelling</h4><p className="text-xs font-mono text-purple-400 mt-1">0% complete</p></div>
                <button className="px-5 py-2.5 bg-[#00f2fe] text-black font-semibold text-sm rounded-xl hover:bg-[#00dfed] transition-all shadow-md shadow-[#00f2fe]/10">Continue Learning</button>
              </div>
              <div className="p-6 rounded-2xl bg-[#121824] border border-slate-800/80 space-y-4">
                <div><h4 className="text-lg font-bold text-white">Tech & AI Tools</h4><p className="text-xs font-mono text-purple-400 mt-1">3% complete</p></div>
                <button className="px-5 py-2.5 bg-[#00f2fe] text-black font-semibold text-sm rounded-xl hover:bg-[#00dfed] transition-all shadow-md shadow-[#00f2fe]/10">Continue Learning</button>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#121824] border border-slate-800/80 space-y-5">
              <h3 className="text-xl font-bold text-white">How is your experience so far?</h3>
              <div className="flex gap-1.5 text-[#00f2fe]">
                {[...Array(5)].map((_, i) => (<Star key={i} className="w-6 h-6 fill-[#00f2fe]" />))}
              </div>
              <textarea rows="4" placeholder="Tell us what's working..." className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl p-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#00f2fe] text-sm resize-none"></textarea>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 px-8 py-10 mt-20 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
        <p>SKILLFORGE TEENS — Curiosity is a skill. Let's forge it.</p>
        <div className="flex flex-wrap gap-6 mt-4 md:mt-0">
          <button onClick={() => setCurrentPage('about')} className="hover:text-white">About</button>
          <button onClick={() => setCurrentPage('courses')} className="hover:text-white">Courses</button>
          <button onClick={() => setCurrentPage('resources')} className="hover:text-white">Resources</button>
          <button onClick={() => setCurrentPage('support')} className="hover:text-white">Support</button>
          <button onClick={() => setCurrentPage('login')} className="hover:text-[#00f2fe]">Login</button>
        </div>
      </footer>

    </div>
  );
}
