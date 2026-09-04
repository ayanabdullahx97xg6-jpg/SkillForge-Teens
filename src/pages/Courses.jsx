// File: src/pages/Courses.jsx

import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { useApp } from '../context/AppContext';
import { db } from '../firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

export default function Courses() {
  const { updateProgress, setCurrentPage } = useApp();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseId = "MRgHANbZ4HO7KoFwUyvn";
        const courseDocRef = doc(db, "courses", courseId);
        const courseSnap = await getDoc(courseDocRef);

        if (courseSnap.exists()) {
          setCourse({ id: courseSnap.id, ...courseSnap.data() });
        }

        const modulesRef = collection(db, "courses", courseId, "modules");
        const modulesSnap = await getDocs(modulesRef);
        const modulesList = modulesSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        modulesList.sort((a, b) => a.moduleNumber - b.moduleNumber);
        setModules(modulesList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course data from Firebase:", error);
        setLoading(false);
      }
    };

    fetchCourseData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center text-slate-400">
        Loading courses from Firebase...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 space-y-12">
      <div>
        <span className="text-xs font-mono text-[#00f2fe] tracking-widest uppercase block mb-3">LIVE SKILL TRACKS</span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">Pick a path. Start making.</h1>
        <p className="text-slate-400 text-lg">Choose any published track below to begin your hands-on journey.</p>
      </div>

      <div className="space-y-8">
        {course && (
          <div className="p-8 rounded-3xl bg-[#121824] border border-slate-800/80 flex flex-col justify-between space-y-6">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#00f2fe]/10 flex items-center justify-center text-[#00f2fe] mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{course.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{course.description}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-[#00f2fe] font-medium mb-4">
                <span>Level: {course.level}</span>
                <span>•</span>
                <span>Duration: {course.duration}</span>
                <span>•</span>
                <span>Modules: {modules.length}</span>
              </div>
            </div>

            {/* Modules Grid Inside the Course Card */}
            <div className="border-t border-slate-800 pt-6 mt-2">
              <h4 className="text-white font-semibold mb-4">Course Modules ({modules.length}):</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
                {modules.map((mod) => (
                  <div key={mod.id} className="bg-[#0b0f17] border border-slate-800/60 p-4 rounded-xl">
                    <span className="text-xs text-[#00f2fe] font-mono">Module {mod.moduleNumber} • Quiz: {mod.quizWeight}</span>
                    <h5 className="text-white font-medium text-sm mt-1">{mod.title}</h5>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">{mod.goal}</p>
                  </div>
                ))}
              </div>
            </div>

            <SignedIn>
              <button 
                onClick={() => { updateProgress(course.id); setCurrentPage('dashboard'); }} 
                className="w-full py-3 bg-[#00f2fe] text-black font-bold text-sm rounded-xl hover:bg-[#00dfed] transition-all mt-4"
              >
                Start Track & View Dashboard
              </button>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full py-3 bg-[#00f2fe] text-black font-bold text-sm rounded-xl hover:bg-[#00dfed] transition-all mt-4">
                  Sign in to Enroll
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        )}
      </div>
    </div>
  );
}
