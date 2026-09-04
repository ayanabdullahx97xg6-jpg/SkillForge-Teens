import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Shield, CheckCircle, Loader, ArrowLeft } from 'lucide-react';

export default function CourseView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!id) return;
      try {
        // 1. Fetch Main Course Document
        const courseDocRef = doc(db, "courses", id);
        const courseSnap = await getDoc(courseDocRef);

        if (courseSnap.exists()) {
          setCourse(courseSnap.data());
        }

        // 2. Fetch Modules Subcollection
        const modulesRef = collection(db, "courses", id, "modules");
        const modulesSnap = await getDocs(modulesRef);
        const modulesList = modulesSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        modulesList.sort((a, b) => a.moduleNumber - b.moduleNumber);
        setModules(modulesList);
      } catch (error) {
        console.error("Error fetching course view data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#00f2fe] gap-3">
        <Loader className="w-8 h-8 animate-spin" />
        <p className="text-slate-400 text-sm">Loading course view...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-24 text-slate-400">
        <h2 className="text-2xl font-bold text-white mb-2">Course Not Found</h2>
        <p>The course you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6 max-w-5xl mx-auto space-y-8 text-slate-200">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-[#00f2fe] transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Courses
      </button>

      {/* Course Header Info */}
      <div className="bg-[#121824] border border-slate-800 rounded-3xl p-8 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#00f2fe]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f2fe]/10 border border-[#00f2fe]/30 text-[#00f2fe] text-xs font-semibold">
          <Shield className="w-3.5 h-3.5" /> {course.level || 'Beginner'}
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">{course.title}</h1>
        <p className="text-slate-300 text-base">{course.subtitle || course.description}</p>

        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-800 text-xs text-slate-300">
          <div><strong>Audience:</strong> {course.audience || 'Teenagers & Digital Beginners'}</div>
          <div><strong>Duration:</strong> {course.estimatedDuration || course.duration || '5-7 hours'}</div>
          <div><strong>Type:</strong> {course.courseType || 'Cybersecurity Awareness'}</div>
        </div>
      </div>

      {/* Course Overview Section */}
      <div className="bg-[#121824] border border-slate-800 rounded-3xl p-8 space-y-4">
        <h2 className="text-2xl font-bold text-white">1. Course Overview</h2>
        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          {course.overview || course.description}
        </p>
      </div>

      {/* Learning Objectives Section */}
      {course.learningObjectives && course.learningObjectives.length > 0 && (
        <div className="bg-[#121824] border border-slate-800 rounded-3xl p-8 space-y-4">
          <h2 className="text-2xl font-bold text-white">You will learn:</h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-300 text-sm md:text-base">
            {course.learningObjectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Modules List Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-4">Course Modules</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((mod, idx) => (
            <div key={mod.id || idx} className="bg-[#121824]/80 border border-slate-800 rounded-2xl p-6 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#00f2fe]/10 text-[#00f2fe] border border-[#00f2fe]/20">
                  Module #{mod.moduleNumber || idx + 1}
                </span>
                <h3 className="text-lg font-bold text-white mt-3">{mod.title}</h3>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">{mod.goal || mod.content}</p>
              </div>
              <button 
                onClick={() => alert(`Starting Module ${mod.moduleNumber || idx + 1}: ${mod.title}`)}
                className="w-full mt-4 py-2.5 rounded-xl bg-[#00f2fe] text-black font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#00f2fe]/90 transition"
              >
                <CheckCircle className="w-4 h-4" /> Start Lesson
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
