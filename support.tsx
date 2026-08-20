import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  User, 
  HelpCircle, 
  ShieldAlert, 
  BookOpen, 
  Wrench
} from 'lucide-react';

export default function SkillForgeSupport() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [category, setCategory] = useState('Login & Account Issues');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Support submission logic goes here
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black antialiased overflow-x-hidden flex flex-col justify-between">
      
      {/* 1. Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0b0f17]/80 backdrop-blur-md border-b border-slate-800/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-black tracking-wider text-white">
                SKILLFORGE <span className="text-[#00f2fe] font-mono">&lt;TEENS/&gt;</span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Courses', 'Resources'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-slate-400 hover:text-[#00f2fe] transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Desktop Action Button */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="px-5 py-2.5 bg-slate-900 border border-slate-800 text-slate-300 font-bold text-sm rounded-xl hover:text-white hover:border-slate-700 transition-all duration-200">
                Go to Dashboard
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 focus:outline-none transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`md:hidden absolute w-full bg-[#0b0f17]/95 border-b border-slate-800 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible h-auto py-6' : 'opacity-0 invisible h-0 overflow-hidden'}`}>
          <div className="px-4 space-y-3">
            {['Home', 'About', 'Courses', 'Resources'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-medium text-slate-300 hover:text-[#00f2fe] px-3 py-2 rounded-lg"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Support Wrapper */}
      <main className="flex-grow pt-32 pb-20 relative max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Glow Ambient Anchors */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 space-y-16">
          
          {/* 2. Header Section */}
          <div className="text-center">
            <span className="text-xs md:text-sm font-bold tracking-widest text-[#00f2fe] uppercase block mb-4">
              HELP & SUPPORT
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              How can we help you today?
            </h1>
          </div>

          {/* 3. Support Categories Grid (2x2 Cards Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Card 1 */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-5 flex items-start gap-4 hover:border-cyan-500/30 transition-colors duration-200">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-[#00f2fe] flex-shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">Login & Account Issues</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Password, profile, and sign-in help.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-5 flex items-start gap-4 hover:border-cyan-500/30 transition-colors duration-200">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-[#00f2fe] flex-shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">Track & Course Help</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Pathways, projects, and learning questions.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-5 flex items-start gap-4 hover:border-cyan-500/30 transition-colors duration-200">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-[#00f2fe] flex-shrink-0">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">Technical Bugs</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Something not loading or behaving right?</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-5 flex items-start gap-4 hover:border-cyan-500/30 transition-colors duration-200">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-[#00f2fe] flex-shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">General Inquiries</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Partnerships, community, and everything else.</p>
              </div>
            </div>

          </div>

          {/* 4. Support Request Form Card */}
          <div className="bg-slate-950/40 border border-slate-800/90 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto backdrop-blur-xl">
            <h2 className="text-lg font-bold text-white tracking-tight mb-6 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#00f2fe]" />
              <span>Send a support request</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Username input */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Username</label>
                  <input 
                    type="text" 
                    required
                    placeholder="yourname"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0b0f17] border border-slate-800/80 rounded-xl text-slate-100 placeholder-slate-600 font-medium text-sm focus:outline-none focus:border-cyan-500/60 transition-colors"
                  />
                </div>
                {/* Email input */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0b0f17] border border-slate-800/80 rounded-xl text-slate-100 placeholder-slate-600 font-medium text-sm focus:outline-none focus:border-cyan-500/60 transition-colors"
                  />
                </div>
              </div>

              {/* Select Category Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category</label>
                <div className="relative">
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full appearance-none px-4 py-3 bg-[#0b0f17] border border-slate-800/80 rounded-xl text-slate-100 font-medium text-sm focus:outline-none focus:border-cyan-500/60 transition-colors cursor-pointer"
                  >
                    <option value="Login & Account Issues">Login & Account Issues</option>
                    <option value="Track & Course Help">Track & Course Help</option>
                    <option value="Technical Bugs">Technical Bugs</option>
                    <option value="General Inquiries">General Inquiries</option>
                  </select>
                </div>
              </div>

              {/* Message textarea input */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Message</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Tell us what you need help with..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0b0f17] border border-slate-800/80 rounded-xl text-slate-100 placeholder-slate-600 font-medium text-sm focus:outline-none focus:border-cyan-500/60 transition-colors resize-none"
                />
              </div>

              {/* Submit button */}
              <button 
                type="submit"
                className="w-full py-3.5 bg-[#00f2fe] text-slate-950 font-extrabold text-sm rounded-xl transition-all duration-200 hover:opacity-90 shadow-[0_0_20px_rgba(0,242,254,0.3)]"
              >
                Submit Request
              </button>
            </form>
          </div>

        </div>
      </main>

      {/* 5. Footer */}
      <footer className="border-t border-slate-800/60 bg-[#0b0f17]/80 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-medium text-center sm:text-left">
            SKILLFORGE TEENS — Curiosity is a skill. Let's forge it.
          </p>
          <div className="flex items-center space-x-6">
            {['About', 'Courses', 'Resources'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs font-semibold text-slate-400 hover:text-[#00f2fe] uppercase tracking-wider transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <p className="text-xs text-slate-600 font-medium">
            © {new Date().getFullYear()} SkillForge Teens. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
