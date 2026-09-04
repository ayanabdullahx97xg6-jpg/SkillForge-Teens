import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Directly src/firebase se import
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { BookOpen, Clock, Award, CheckCircle, ArrowLeft, Loader } from 'lucide-react';
import { useApp } from './context/AppContext';

export default function CourseView() {
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setCurrentPage } = useApp();

  useEffect(() => {
    const fetchCourseAndModules = async () => {
      try {
        // 1. Main Course Document Fetch
        const courseId = "MRgHANbZ4HO7KoFwUyvn";
        const courseDocRef = doc(db, "courses", courseId);
        const courseSnap = await getDoc(courseDocRef);

        if (courseSnap.exists()) {
          setCourse(courseSnap.data());
        }

        // 2. Modules Subcollection Fetch
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
        console.error("Error fetching course data: ", error);
        setLoading(false);
      }
    };

    fetchCourseAndModules();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#00f2fe] gap-3">
        <Loader className="w-8 h-8 animate-spin" />
        <p className="text-slate-400 text-sm">Loading course details from Firebase...</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6 max-w-5xl mx-auto space-y-10 text-slate-200">
      
      {/* Back Button */}
      <button 
        onClick={() => setCurrentPage('home')} 
        className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-[#00f2fe] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>

      {/* Main Course Header */}
      {course && (
        <div className="bg-[#121824] border border-slate-800 rounded-3xl p-8 relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#00f2fe]/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f2fe]/10 border border-[#00f2fe]/30 text-[#00f2fe] text-xs font-semibold">
              <Award className="w-3.5 h-3.5" /> Level: {course.level || 'Beginner'}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white">{course.title}</h1>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-3xl">
              {course.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#00f2fe]" />
              <span><strong>Duration:</strong> {course.duration || 'Self-paced'}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#00f2fe]" />
              <span><strong>Total Modules:</strong> {course.modulescount || modules.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* Modules List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-slate-800 pb-4">
          <span>Course Modules</span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#00f2fe]/10 text-[#00f2fe]">
            {modules.length} Modules
          </span>
        </h2>

        <div className="space-y-4">
          {modules.map((mod, idx) => (
            <div 
              key={mod.id} 
              className="bg-[#121824]/80 border border-slate-800 rounded-2xl p-6 hover:border-[#00f2fe]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#00f2fe]/10 border border-[#00f2fe]/20 text-[#00f2fe] font-bold text-xs flex items-center justify-center">
                    {mod.moduleNumber || idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {mod.title}
                  </h3>
                </div>
                {mod.goal && (
                  <p className="text-slate-400 text-xs leading-relaxed pl-10">
                    <strong className="text-slate-300">Goal:</strong> {mod.goal}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-slate-800/80 pt-4 md:pt-0">
                {mod.quizWeight && (
                  <span className="text-xs text-slate-500 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
                    Quiz Weight: {mod.quizWeight}
                  </span>
                )}
                <button 
                  onClick={() => alert(`Starting Lesson for Module ${mod.moduleNumber}: ${mod.title}`)}
                  className="px-4 py-2 rounded-xl bg-[#00f2fe] text-black font-bold text-xs flex items-center gap-2 hover:bg-[#00f2fe]/90 transition-all"
                >
                  <CheckCircle className="w-3.5 h-3.5" /> Start Lesson
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
