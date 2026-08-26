import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, BookOpen, Bot, ArrowRight, Star, Trophy, Users, CheckCircle, Award, X, Inbox, Trash2, User, Edit3, PlusCircle } from 'lucide-react';
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';

// Firebase Imports
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, addDoc, deleteDoc } from "firebase/firestore";

// Firebase Configuration Keys
const firebaseConfig = {
  apiKey: "AIzaSyAY0iT-cDOG88pN1c4zjW39aXo7Bfh46ws",
  authDomain: "skillforge-teens.firebaseapp.com",
  projectId: "skillforge-teens",
  storageBucket: "skillforge-teens.firebasestorage.app",
  messagingSenderId: "563140064594",
  appId: "1:563140064594:web:148eaedbc95c5a50c1368b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

  // Default Courses Fallback
  const defaultCourses = [
    { id: 'cybersecurity', title: 'Cybersecurity & Safety', desc: 'Practice smart digital habits, understand encryption basics, and learn how to secure your online presence against modern threats.' },
    { id: 'animation', title: '2D/3D Animation', desc: 'Bring original characters to life using industry-standard principles of motion, keyframing, and basic modeling.' },
    { id: 'storytelling', title: 'Creative Storytelling', desc: 'Master the art of digital writing, script formatting, world-building, and engaging media production for modern platforms.' },
    { id: 'aiTools', title: 'AI Tools & Prompting', desc: 'Learn how to leverage AI ethically, craft powerful prompts, generate creative assets, and supercharge your productivity.' },
  ];

  const [courses, setCourses] = useState(defaultCourses);

  // Fetch Courses from Firebase
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        if (!querySnapshot.empty) {
          const loadedCourses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setCourses(loadedCourses);
        }
      } catch (e) {
        console.log("Using default courses");
      }
    };
    fetchCourses();
  }, []);

  // Admin New Course Form States
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseDesc, setNewCourseDesc] = useState('');
  const [courseSuccess, setCourseSuccess] = useState(false);

  const handlePublishCourse = async (e) => {
    e.preventDefault();
    if (!newCourseTitle || !newCourseDesc) return;

    try {
      const newDocRef = await addDoc(collection(db, "courses"), {
        title: newCourseTitle,
        desc: newCourseDesc
      });

      const newCourseObj = { id: newDocRef.id, title: newCourseTitle, desc: newCourseDesc };
      const updatedCourses = [...courses, newCourseObj];
      setCourses(updatedCourses);

      setNewCourseTitle('');
      setNewCourseDesc('');
      setCourseSuccess(true);
      setTimeout(() => setCourseSuccess(false), 4000);
    } catch (error) {
      alert("Error publishing course: " + error.message);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await deleteDoc(doc(db, "courses", id));
      const filtered = courses.filter(c => c.id !== id);
      setCourses(filtered);
    } catch (error) {
      alert("Error deleting course");
    }
  };

  // Profile State
  const [profile, setProfile] = useState({ fullName: '', age: '', bio: '' });
  const [profileSuccess, setProfileSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const docRef = doc(db, "profiles", user.id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfile(docSnap.data());
          } else {
            setProfile({ fullName: user.firstName || '', age: '', bio: '' });
          }
        } catch (e) {
          console.error("Error fetching profile");
        }
      };
      fetchProfile();
    }
  }, [user]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      await setDoc(doc(db, "profiles", user.id), profile);
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 4000);

      const userName = profile.fullName || user.firstName || 'Learner';
      updateLeaderboardInStorage(user.id, userName, progress);
    } catch (error) {
      alert("Error saving profile");
    }
  };

  // Leaderboard State
  const [leaderboard, setLeaderboard] = useState([
    { id: 'david', name: 'David', track: 'Cybersecurity & Safety', progress: 90 },
    { id: 'ayesha', name: 'Ayesha', track: '2D/3D Animation', progress: 75 },
  ]);

  // Dynamic User Progress State
  const [progress, setProgress] = useState({});

  useEffect(() => {
    if (user) {
      const fetchProgress = async () => {
        try {
          const docRef = doc(db, "progress", user.id);
          const docSnap = await getDoc(docRef);
          const userName = profile.fullName || user.firstName || user.username || 'Learner';
          
          if (docSnap.exists()) {
            const parsedProgress = docSnap.data();
            setProgress(parsedProgress);
            updateLeaderboardInStorage(user.id, userName, parsedProgress);
          }
        } catch (e) {
          console.error("Error fetching progress");
        }
      };
      fetchProgress();
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
      return updated;
    });
  };

  const updateProgress = async (courseId) => {
    if (!user) return;
    const currentVal = progress[courseId] || 0;
    const updated = {
      ...progress,
      [courseId]: Math.min(100, currentVal + 10)
    };
    setProgress(updated);
    
    try {
      await setDoc(doc(db, "progress", user.id), updated);
      const userName = profile.fullName || user.firstName || user.username || 'Learner';
      updateLeaderboardInStorage(user.id, userName, updated);
    } catch (e) {
      console.error("Error saving progress");
    }
  };

  // Support Requests State (Admin Inbox)
  const [supportRequests, setSupportRequests] = useState([]);

  useEffect(() => {
    const fetchSupport = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "supportRequests"));
        const tickets = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSupportRequests(tickets);
      } catch (e) {
        console.log("Error loading support tickets");
      }
    };
    fetchSupport();
  }, []);

  const [activeCertificate, setActiveCertificate] = useState(null);

  // Support Form State
  const [supportName, setSupportName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSuccess, setSupportSuccess] = useState(false);

  const handleSupportSubmit = async (e) => {
    e.preventDefault();
    if (!supportName || !supportEmail || !supportMessage) return;

    try {
      const newTicket = {
        name: supportName,
        email: supportEmail,
        message: supportMessage,
        date: new Date().toLocaleString()
      };
      const docRef = await addDoc(collection(db, "supportRequests"), newTicket);
      setSupportRequests([{ id: docRef.id, ...newTicket }, ...supportRequests]);
      
      setSupportSuccess(true);
      setSupportName('');
      setSupportEmail('');
      setSupportMessage('');
      setTimeout(() => setSupportSuccess(false), 5000);
    } catch (error) {
      alert("Error sending support ticket");
    }
  };

  const deleteTicket = async (id) => {
    try {
      await deleteDoc(doc(db, "supportRequests", id));
      const filtered = supportRequests.filter(item => item.id !== id);
      setSupportRequests(filtered);
    } catch (e) {
      alert("Error deleting ticket");
    }
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
              Cloud Database Powered by Firebase 🔥
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto mb-6 leading-tight">
              Discover Your Superpower <br className="hidden md:block"/>
              <span className="text-[#00f2fe]">– By Teens, For Teens</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              SkillForge Teens helps you explore tech and creative skills with permanent cloud storage for your progress and certificates.
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
                Big curiosity deserves permanent cloud storage.
              </h1>
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
                All data is now securely saved in Firebase cloud database.
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