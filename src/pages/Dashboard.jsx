import React, { useState, useEffect } from 'react';
import { CheckCircle, Trophy, Award } from 'lucide-react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { db } from '../firebase';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const { user } = useUser();
  const { setActiveCertificate } = useApp();
  
  const [profile, setProfile] = useState({ fullName: '', age: '', bio: '' });
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const coursesSnap = await getDocs(collection(db, "courses"));
        const coursesList = coursesSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCourses(coursesList);

        const userDocRef = doc(db, "users", user.id);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setProfile({
            fullName: data.fullName || user.fullName || '',
            age: data.age || '',
            bio: data.bio || ''
          });
          setProgress(data.progress || {});
        } else {
          setProfile({
            fullName: user.fullName || user.firstName || '',
            age: '',
            bio: ''
          });
        }

        setLoading(false);
      } catch (error) {
        console.error("Error loading dashboard data from Firebase:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const userDocRef = doc(db, "users", user.id);
      await setDoc(userDocRef, {
        email: user.primaryEmailAddress?.emailAddress,
        fullName: profile.fullName,
        age: profile.age,
        bio: profile.bio,
        progress: progress,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      console.error("Error saving profile to Firebase:", error);
    }
  };

  const updateProgressFirebase = async (courseId) => {
    if (!user) return;
    
    const current = progress[courseId] || 0;
    const nextProgress = current >= 100 ? 100 : current + 10;
    const updatedProgress = { ...progress, [courseId]: nextProgress };
    
    setProgress(updatedProgress);

    try {
      const userDocRef = doc(db, "users", user.id);
      await setDoc(userDocRef, {
        progress: updatedProgress
      }, { merge: true });
    } catch (error) {
      console.error("Error updating progress in Firebase:", error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 text-center text-slate-400 font-mono text-sm">
        Loading dashboard data from Firebase...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-10">
      <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#00f2fe] uppercase tracking-widest block mb-1">STUDENT CLOUD SPACE</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Welcome back, {profile.fullName || user?.firstName || 'Learner'}! 👋
          </h2>
          <p className="text-sm text-slate-400 mt-1">{user?.primaryEmailAddress?.emailAddress}</p>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>

      <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 space-y-6">
        <h3 className="text-xl font-bold text-white">Profile Setup</h3>
        {success && (
          <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> Profile saved successfully to Firebase!
          </div>
        )}
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input 
              type="text" 
              value={profile.fullName} 
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} 
              placeholder="Full Name" 
              className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-[#00f2fe]" 
              required 
            />
            <input 
              type="number" 
              value={profile.age} 
              onChange={(e) => setProfile({ ...profile, age: e.target.value })} 
              placeholder="Age" 
              className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-[#00f2fe]" 
            />
          </div>
          <textarea 
            rows="3" 
            value={profile.bio} 
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })} 
            placeholder="Bio" 
            className="w-full bg-[#0b0f17] border border-slate-800 rounded-xl p-4 text-sm text-white outline-none focus:border-[#00f2fe]"
          ></textarea>
          <button 
            type="submit" 
            className="px-6 py-3 bg-[#00f2fe] text-black font-bold rounded-xl text-sm hover:bg-[#00dfed] transition-all"
          >
            Save Profile
          </button>
        </form>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#00f2fe]" /> Your Enrolled Tracks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => {
            const currentProgress = progress[course.id] || 0;
            return (
              <div key={course.id} className="p-6 rounded-3xl bg-[#121824] border border-slate-800/80 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-bold text-white">{course.title}</h4>
                    <span className="text-xs font-mono text-[#00f2fe] bg-[#00f2fe]/10 px-2.5 py-1 rounded-full">{currentProgress}%</span>
                  </div>
                  <p className="text-slate-400 text-xs mb-3 line-clamp-2">{course.description || course.desc}</p>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                    <div className="bg-[#00f2fe] h-full transition-all duration-300" style={{ width: `${currentProgress}%` }}></div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => updateProgressFirebase(course.id)} 
                    className="flex-1 py-2.5 bg-[#00f2fe] text-black font-semibold text-xs rounded-xl hover:bg-[#00dfed] transition-all"
                  >
                    Advance (+10%)
                  </button>
                  {currentProgress === 100 && (
                    <button 
                      onClick={() => setActiveCertificate({ title: course.title, name: profile.fullName || user?.firstName || 'Learner' })} 
                      className="px-4 py-2.5 bg-teal-500/10 text-teal-400 font-bold text-xs rounded-xl flex items-center gap-1.5 hover:bg-teal-500/20 transition-all"
                    >
                      <Award className="w-4 h-4" /> Certificate
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
