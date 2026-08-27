import React, { createContext, useContext, useState } from 'react';
import { initialSiteContent, initialCourses, initialLeaderboard } from '../data/siteData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('home');
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  const [siteContent, setSiteContent] = useState(initialSiteContent);
  const [courses, setCourses] = useState(initialCourses);
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);
  const [supportRequests, setSupportRequests] = useState([
    { id: '1', name: 'Alex Johnson', email: 'alex@example.com', date: '2026-06-01', message: 'How do I reset my password?' }
  ]);
  const [profile, setProfile] = useState({ fullName: '', age: '16', bio: 'Passionate teen tech learner exploring code and design.' });
  const [progress, setProgress] = useState({});
  const [activeCertificate, setActiveCertificate] = useState(null);

  const handleContentChange = (key, value) => {
    setSiteContent((prev) => ({ ...prev, [key]: value }));
  };

  const updateProgress = (courseId) => {
    setProgress((prev) => {
      const current = prev[courseId] || 0;
      return { ...prev, [courseId]: current >= 100 ? 100 : current + 10 };
    });
  };

  const deleteCourse = (id) => setCourses(courses.filter((c) => c.id !== id));
  const deleteTicket = (id) => setSupportRequests(supportRequests.filter((t) => t.id !== id));

  return (
    <AppContext.Provider value={{
      currentPage, setCurrentPage,
      isEditMode, setIsEditMode,
      isAdmin, setIsAdmin,
      siteContent, handleContentChange,
      courses, setCourses, deleteCourse,
      leaderboard, setLeaderboard,
      supportRequests, setSupportRequests, deleteTicket,
      profile, setProfile,
      progress, updateProgress,
      activeCertificate, setActiveCertificate
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
