import React, { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  GithubAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { ShieldCheck, LogOut, X, Mail, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { currentPage, setCurrentPage } = useApp();
  const [user, setUser] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // User auth state sync
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Strictly check if logged-in user is specific admin email
  const isAdmin = user && user.email === 'ayanabdullahx967xg6@gmail.com';

  const getFriendlyErrorMessage = (error) => {
    if (error.code === 'auth/account-exists-with-different-credential') {
      return 'Is email se kisi doosre provider se account bana hua hai.';
    }
    if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
      return 'Email ya Password ghalat hai.';
    }
    if (error.code === 'auth/email-already-in-use') {
      return 'Yeh email pehle se registered hai.';
    }
    return error.message.replace("Firebase: ", "");
  };

  const handleGoogleSignIn = async () => {
    try {
      setAuthError('');
      await signInWithPopup(auth, googleProvider);
      setIsModalOpen(false);
    } catch (error) {
      setAuthError(getFriendlyErrorMessage(error));
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setAuthError('');
      const githubProvider = new GithubAuthProvider();
      await signInWithPopup(auth, githubProvider);
      setIsModalOpen(false);
    } catch (error) {
      setAuthError(getFriendlyErrorMessage(error));
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setIsModalOpen(false);
      setEmail('');
      setPassword('');
    } catch (error) {
      setAuthError(getFriendlyErrorMessage(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0b0f17]/90 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="w-8 h-8 rounded-xl bg-[#00f2fe] flex items-center justify-center text-black font-black text-xs">
            SF
          </div>
          <span className="font-extrabold text-[#00f2fe] text-lg tracking-wider">
            SKILLFORGE <span className="text-white">&lt;TEENS/&gt;</span>
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          {['home', 'about', 'courses', 'support'].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`capitalize transition-colors ${
                currentPage === page ? 'text-[#00f2fe] font-bold' : 'hover:text-white'
              }`}
            >
              {page}
            </button>
          ))}

          {user && (
            <button 
              onClick={() => setCurrentPage('dashboard')} 
              className={`transition-colors ${currentPage === 'dashboard' ? 'text-[#00f2fe] font-bold' : 'hover:text-white'}`}
            >
              Dashboard
            </button>
          )}

          {/* Admin link only visible to specified admin email */}
          {isAdmin && (
            <button 
              onClick={() => setCurrentPage('admin')} 
              className={`transition-colors flex items-center gap-1 ${
                currentPage === 'admin' ? 'text-teal-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#00f2fe]" /> Admin
            </button>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <img 
                src={user.photoURL || "https://via.placeholder.com/40"} 
                alt="Profile" 
                className="w-8 h-8 rounded-full border border-[#00f2fe]"
              />
              <button 
                onClick={handleSignOut}
                className="p-2 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-all"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#00f2fe] text-black font-bold text-xs hover:bg-[#00dfed] transition-all shadow-sm shadow-[#00f2fe]/20"
            >
              Sign In / Sign Up
            </button>
          )}
        </div>
      </nav>

      {/* Authentication Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121824] border border-slate-800 w-full max-w-md rounded-3xl p-6 relative shadow-2xl space-y-6">
            
            <button 
              onClick={() => { setIsModalOpen(false); setAuthError(''); }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-2xl font-bold text-white">
                {isSignUp ? 'Create an Account' : 'Welcome Back'}
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                {isSignUp ? 'Sign up to start your learning track' : 'Sign in to access your dashboard'}
              </p>
            </div>

            {authError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl">
                {authError}
              </div>
            )}

            <div className="space-y-3">
              <button 
                onClick={handleGoogleSignIn}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                Continue with Google
              </button>

              <button 
                onClick={handleGithubSignIn}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                Continue with GitHub
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-800 w-full"></div>
              <span className="bg-[#121824] px-3 text-[10px] text-slate-500 uppercase tracking-wider absolute">or</span>
            </div>

            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Email address" 
                  className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white outline-none focus:border-[#00f2fe]"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Password" 
                  className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white outline-none focus:border-[#00f2fe]"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-[#00f2fe] text-black font-bold text-xs rounded-xl hover:bg-[#00dfed] transition-all"
              >
                {isSignUp ? 'Sign Up with Email' : 'Sign In with Email'}
              </button>
            </form>

            <div className="text-center text-xs text-slate-400">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button 
                onClick={() => { setIsSignUp(!isSignUp); setAuthError(''); }}
                className="text-[#00f2fe] font-semibold hover:underline ml-1"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
