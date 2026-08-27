import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import CertificateModal from './components/CertificateModal';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Support from './pages/Support';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';

function MainContent() {
  const { currentPage } = useApp();

  return (
    <main className="pt-20">
      {currentPage === 'home' && <Home />}
      {currentPage === 'about' && <About />}
      {currentPage === 'courses' && <Courses />}
      {currentPage === 'support' && <Support />}
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'admin' && <Admin />}
    </main>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0b0f17] text-slate-100 font-sans selection:bg-[#00f2fe] selection:text-black">
        <Navbar />
        <MainContent />
        <CertificateModal />
      </div>
    </AppProvider>
  );
}
