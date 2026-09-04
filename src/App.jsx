import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CertificateModal from './components/CertificateModal';
import Home from './pages/Home';
import About from './pages/About';
import CourseView from './CourseView';
import Support from './pages/Support';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';

function MainContent() {
  const { currentPage } = useApp();

  return (
    <main className="pt-20 flex-grow">
      {currentPage === 'home' && <Home />}
      {currentPage === 'about' && <About />}
      {currentPage === 'courses' && <CourseView />}
      {currentPage === 'support' && <Support />}
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'admin' && <Admin />}
    </main>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0b0f17] text-slate-100 font-sans flex flex-col justify-between selection:bg-[#00f2fe] selection:text-black">
        <Navbar />
        <MainContent />
        <CertificateModal />
        <Footer />
      </div>
    </AppProvider>
  );
}
