import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/ui/ScrollProgress';
import BackToTop from './components/ui/BackToTop';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Credentials from './pages/Credentials';
import AdminPanel from './pages/AdminPanel';
import { useTheme } from './hooks/useTheme';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppContent() {
  const { isDark, toggle } = useTheme();
  const { pathname } = useLocation();
  const isResume = pathname === '/resume';
  const isAdmin = pathname === '/admin';

  return (
    <>
      <ScrollProgress />
      <Navbar isDark={isDark} toggleTheme={toggle} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/credentials" element={<Credentials />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      {!isResume && !isAdmin && <Footer />}
      {!isAdmin && <BackToTop />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}
