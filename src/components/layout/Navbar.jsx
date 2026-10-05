import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  RiMenu3Line,
  RiCloseLine,
  RiDownloadLine,
  RiEyeLine,
  RiFolderLine,
  RiServiceLine,
  RiToolsLine,
  RiUserLine,
  RiBriefcaseLine,
  RiMailLine,
  RiVerifiedBadgeLine,
} from 'react-icons/ri';
import ThemeToggle from '../ui/ThemeToggle';
import { useActiveSection } from '../../hooks/useScrollAnimation';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { AdminLockButton, AdminLoginModal, AdminActiveBadge } from '../admin/AdminAuth';

const NAV_LINKS = [
  { href: '#projects', label: 'Projects', icon: RiFolderLine },
  { href: '#services', label: 'Services', icon: RiServiceLine },
  { href: '#skills', label: 'Skills', icon: RiToolsLine },
  { href: '#about', label: 'About', icon: RiUserLine },
  { href: '#experience', label: 'Experience', icon: RiBriefcaseLine },
  { href: '/credentials', label: 'Credentials', icon: RiVerifiedBadgeLine, isRoute: true },
  { href: '#contact', label: 'Contact', icon: RiMailLine },
];

const SECTION_IDS = ['projects', 'services', 'skills', 'about', 'experience', 'certifications', 'contact'];

export default function Navbar({ isDark, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);
  const { isAuthenticated, logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [location.pathname]);

  const handleNavClick = (link) => {
    setMenuOpen(false);
    if (link.isRoute) {
      navigate(link.href);
      return;
    }
    if (!isHome) {
      window.location.href = '/' + link.href;
      return;
    }
    const id = link.href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-sm border-b border-gray-200/80 dark:border-gray-800'
        : 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100/60 dark:border-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 py-2 sm:py-2.5">

          {/* Logo */}
          <Link to="/" className="flex items-center group py-1" aria-label="Qaisar Abbas Home">
            <img
              src="/logo.png"
              alt="Qaisar Abbas - Landscape Engineer Building with IT & AI"
              className="h-14 sm:h-18 lg:h-20 w-auto max-h-22 object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-gray-100/70 dark:bg-gray-900/60 p-1.5 rounded-full border border-gray-200/60 dark:border-gray-800">
            {NAV_LINKS.map((link) => {
              const isActive = link.isRoute
                ? location.pathname === link.href
                : isHome && (activeSection === link.href.replace('#', '') || (link.href === '#certifications' && activeSection === 'certifications'));

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link);
                  }}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white dark:bg-gray-800 text-primary-600 dark:text-emerald-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden lg:flex items-center gap-2.5">
            <ThemeToggle isDark={isDark} toggle={toggleTheme} />

            {/* Admin Controls */}
            {isAuthenticated ? (
              <AdminActiveBadge onLogout={logout} />
            ) : (
              <AdminLockButton onOpen={() => setShowAdminLogin(true)} />
            )}

            <Link
              to="/resume"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all shadow-2xs"
            >
              <RiEyeLine size={15} />
              <span>Resume</span>
            </Link>

            <a
              href="/resume/Qaisar-Abbas-Resume.pdf"
              download="Qaisar-Abbas-Resume.pdf"
              className="cta-btn text-xs py-2 px-4 shadow-sm"
            >
              <RiDownloadLine size={15} />
              <span>Download CV</span>
            </a>
          </div>

          {/* Mobile Actions: Theme + Toggle Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle isDark={isDark} toggle={toggleTheme} />
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label="Toggle Navigation Menu"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {menuOpen ? <RiCloseLine size={22} /> : <RiMenu3Line size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-2xl px-4 py-4 shadow-2xl animate-[fadeIn_0.2s_ease-out]">
          <ul className="space-y-1 mb-4">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = link.isRoute
                ? location.pathname === link.href
                : isHome && activeSection === link.href.replace('#', '');

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link);
                    }}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                      isActive
                        ? 'bg-primary-50 dark:bg-emerald-950/40 text-primary-600 dark:text-emerald-400 font-bold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
                    }`}
                  >
                    <Icon size={18} className="text-primary-500" />
                    <span>{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
            <Link
              to="/resume"
              onClick={() => setMenuOpen(false)}
              aria-label="View resume"
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-700 to-teal-600 shadow-sm shadow-emerald-900/15 hover:from-emerald-800 hover:to-teal-700 transition w-full"
            >
              <RiEyeLine size={16} />
              <span>View Resume</span>
            </Link>
            <a
              href="/resume/Qaisar-Abbas-Resume.pdf"
              download="Qaisar-Abbas-Resume.pdf"
              className="cta-btn justify-center text-xs py-2.5 w-full"
            >
              <RiDownloadLine size={15} />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      )}
    </header>

    {/* Admin Login Modal */}
    {showAdminLogin && (
      <AdminLoginModal
        onClose={() => setShowAdminLogin(false)}
        onSuccess={() => setShowAdminLogin(false)}
      />
    )}
  </>
  );
}
