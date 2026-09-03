// File: src/CourseView.jsx

import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Yeh upar wali firebase.js file se database import kar raha hai
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

function CourseView() {
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseAndModules = async () => {
      try {
        // 1. Main Course Document Fetch Karna
        const courseId = "MRgHANbZ4HO7KoFwUyvn";
        const courseDocRef = doc(db, "courses", courseId);
        const courseSnap = await getDoc(courseDocRef);

        if (courseSnap.exists()) {
          setCourse(courseSnap.data());
        }

        // 2. Modules Subcollection Fetch Karna
        const modulesRef = collection(db, "courses", courseId, "modules");
        const modulesSnap = await getDocs(modulesRef);
        
        const modulesList = modulesSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Modules ko moduleNumber (1 se 10) ke mutabiq sort (tarteeb) karna
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

  // Jab tak data load ho raha hai, yeh message dikhega
  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading course details from Firebase...</div>;
  }

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Course Header Details Box */}
      {course && (
        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #e9ecef' }}>
          <h1 style={{ color: '#333', marginTop: '0' }}>{course.title}</h1>
          <p style={{ color: '#555', lineHeight: '1.6' }}>{course.description}</p>
          <div style={{ fontSize: '14px', color: '#666', marginTop: '15px' }}>
            <span><strong>Level:</strong> {course.level}</span> | 
            <span style={{ marginLeft: '10px' }}><strong>Duration:</strong> {course.duration}</span> | 
            <span style={{ marginLeft: '10px' }}><strong>Total Modules:</strong> {course.modulescount}</span>
          </div>
        </div>
      )}

      {/* Modules List Heading */}
      <h2 style={{ color: '#222', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
        Course Modules ({modules.length})
      </h2>

      {/* Modules Loop (1 se 10 modules ko screen par dikhana) */}
      <div>
        {modules.map((mod) => (
          <div key={mod.id} style={{ border: '1px solid #dcdcdc', padding: '20px', borderRadius: '6px', marginBottom: '15px', background: '#fff' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#0066cc' }}>
              Module {mod.moduleNumber}: {mod.title}
            </h3>
            <p style={{ margin: '0 0 10px 0', color: '#444' }}>
              <strong>Goal:</strong> {mod.goal}
            </p>
            <p style={{ fontSize: '13px', color: '#666', margin: '0' }}>
              <strong>Quiz Weight:</strong> {mod.quizWeight}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default CourseView;
