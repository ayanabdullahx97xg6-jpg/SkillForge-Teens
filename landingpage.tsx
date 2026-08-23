import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0b0d14] text-white font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* ---------------- NAVBAR ---------------- */}
      <nav className="flex justify-between items-center p-6 md:px-12 border-b border-gray-800/50">
        <div className="text-xl font-bold tracking-widest text-cyan-400">
          SKILLFORGE <span className="text-white">&lt;TEENS/&gt;</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-semibold text-gray-300">
          <a href="#" className="text-cyan-400">Home</a>
          <a href="#" className="hover:text-cyan-400 transition">About</a>
          <a href="#" className="hover:text-cyan-400 transition">Courses</a>
          <a href="#" className="hover:text-cyan-400 transition">Resources</a>
        </div>
      </nav>

      {/* ---------------- HERO SECTION ---------------- */}
      <main className="flex flex-col items-center justify-center text-center px-4 pt-24 pb-20">
        <div className="border border-cyan-500/30 text-cyan-400 rounded-full px-6 py-2 text-xs font-bold tracking-widest uppercase mb-8 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
          Built with teens. Built for what's next.
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl">
          Discover Your Superpower <br className="hidden md:block"/>
          — By Teens, For Teens
        </h1>
        <p className="text-gray-400 max-w-2xl text-lg mb-10">
          SkillForge Teens helps you explore the tech and creative skills that feel like you — with guided pathways, real projects, and a community that gets it.
        </p>
        <button className="bg-cyan-400 hover:bg-cyan-300 text-[#0b0d14] font-extrabold py-4 px-8 rounded-full transition flex items-center gap-2 mb-6 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
          Find Your Superpower Now &rarr;
        </button>
        <div className="border border-purple-500/30 bg-purple-900/20 text-purple-300 rounded-md px-6 py-3 text-xs font-bold tracking-widest uppercase mt-4">
          Your next obsession might be one quiz away.
        </div>
      </main>

      {/* ---------------- SECTION 01: HOW IT WORKS ---------------- */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto border-t border-gray-800/30">
        <div className="text-cyan-400 font-bold text-sm tracking-widest uppercase mb-4">01 / How it works</div>
        <h2 className="text-4xl font-bold mb-4">Meet the quiz that<br/>actually gets you.</h2>
        <p className="text-gray-400 mb-12 max-w-xl">Four quick stages turn your interests into a curated starting point — no boring labels, no pressure.</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { num: "01", title: "Choose your energy", desc: "Tell us what makes you curious, creative, or ready to solve a puzzle." },
            { num: "02", title: "Pick a challenge", desc: "Choose mini scenarios that feel closer to games than homework.", color: "text-purple-400" },
            { num: "03", title: "Get your signal", desc: "We match your answers with pathways designed to spark a real next move." },
            { num: "04", title: "Start building", desc: "Try a first project, share it with your crew, and see what clicks.", color: "text-purple-400" },
          ].map((step, i) => (
            <div key={i} className="bg-[#12141d] border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition">
              <div className={`text-4xl font-bold mb-4 ${step.color || 'text-cyan-400'}`}>{step.num}</div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- SECTION 02: EXPLORE YOUR PATH ---------------- */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div className="text-purple-400 font-bold text-sm tracking-widest uppercase mb-4">02 / Explore your path</div>
        <h2 className="text-4xl font-bold mb-12">Four worlds. Infinite<br/>ways to make your mark.</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-[#12141d] border border-gray-800 rounded-2xl p-8 hover:border-cyan-500/50 transition">
            <div className="text-cyan-400 mb-4 text-3xl">🛡️</div>
            <h3 className="text-2xl font-bold mb-3">Cybersecurity & Safety</h3>
            <p className="text-gray-400">Learn how to protect your world, spot risky moves, and become the digital teammate everyone needs.</p>
          </div>
          <div className="bg-[#12141d] border border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 transition">
            <div className="text-purple-400 mb-4 text-3xl">🎨</div>
            <h3 className="text-2xl font-bold mb-3">2D/3D Animation</h3>
            <p className="text-gray-400">Bring original characters, worlds, and motion graphics to life from your own point of view.</p>
          </div>
          <div className="bg-[#12141d] border border-gray-800 rounded-2xl p-8 hover:border-cyan-500/50 transition">
            <div className="text-cyan-400 mb-4 text-3xl">✍️</div>
            <h3 className="text-2xl font-bold mb-3">Digital Storytelling</h3>
            <p className="text-gray-400">Shape stories people remember — from interactive worlds to short films, podcasts, and campaigns.</p>
          </div>
          <div className="bg-[#12141d] border border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 transition">
            <div className="text-purple-400 mb-4 text-3xl">🤖</div>
            <h3 className="text-2xl font-bold mb-3">Tech & AI Tools</h3>
            <p className="text-gray-400">Experiment with the tools shaping tomorrow and learn to build with AI responsibly, not blindly.</p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button className="bg-[#0099ff] hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full transition shadow-lg shadow-blue-500/20">Sign In</button>
          <button className="bg-white hover:bg-gray-200 text-black font-bold py-3 px-8 rounded-full transition">Sign Up</button>
        </div>
      </section>

      {/* ---------------- SECTION 03: THE WHY ---------------- */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        <div className="md:w-1/2">
          <div className="text-cyan-400 font-bold text-sm tracking-widest uppercase mb-4">03 / The Why</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Early skill-building changes the way young people see themselves.</h2>
          <p className="text-gray-400 text-lg">When teens get a safe place to make things, solve problems, and share what they know, confidence stops being a slogan. It becomes a habit they can take anywhere.</p>
        </div>
        
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          <div className="bg-[#0f171c] border border-cyan-900/50 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-cyan-400 mb-2">13–18</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Built for the teenage years</div>
          </div>
          <div className="bg-[#15121e] border border-purple-900/50 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">3 MIN</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">To find a new starting point</div>
          </div>
          <div className="bg-[#12141d] border border-gray-800 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">4 PATHS</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">To explore now and remix later</div>
          </div>
          <div className="bg-[#12141d] border border-gray-800 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">100%</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Beginner-friendly momentum</div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 04: BUILD FUTURE TOGETHER ---------------- */}
      <section className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#17192b] to-[#121f26] border border-gray-700/50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="text-cyan-400 font-bold text-sm tracking-widest uppercase mb-4">04 / Build the future together</div>
            <h2 className="text-3xl font-bold mb-4">Bring SkillForge Teens to<br/>your school or community.</h2>
            <p className="text-gray-400 max-w-xl">For parents, educators, youth organizations, and sponsors ready to open more doors for the next generation.</p>
          </div>
          <button className="bg-white hover:bg-gray-200 text-black font-bold py-4 px-8 rounded-xl transition whitespace-nowrap">
            Partner With Us
          </button>
        </div>
      </section>

      {/* ---------------- SECTION 05: JOIN THE LAB ---------------- */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto text-center md:text-left">
         <div className="text-purple-400 font-bold text-sm tracking-widest uppercase mb-4">05 / Join the lab</div>
         <h2 className="text-4xl font-bold mb-4">Your next creative obsession starts here.</h2>
         <p className="text-gray-400">Get pathway drops, project prompts, and a place to share your experiments. It's free, friendly, and built for curiosity.</p>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="border-t border-gray-800/50 p-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 bg-[#07080c]">
        <div>SKILLFORGE TEENS — Curiosity is a skill. Let's forge it.</div>
        <div className="flex gap-6 font-semibold">
          <a href="#" className="hover:text-white transition">About</a>
          <a href="#" className="hover:text-white transition">Courses</a>
          <a href="#" className="hover:text-white transition">Resources</a>
        </div>
      </footer>

    </div>
  );
}
