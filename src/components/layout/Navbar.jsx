import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  RiMenu3Line, RiCloseLine, RiDownloadLine, RiEyeLine,
} from 'react-icons/ri';
import ThemeToggle from '../ui/ThemeToggle';
import { useActiveSection } from '../../hooks/useScrollAnimation';

const NAV_LINKS = [
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

const SECTION_IDS = ['projects', 'skills', 'about', 'experience', 'contact'];

export default function Navbar({ isDark, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [location.pathname]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    if (!isHome) return;
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
      ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-md border-b border-gray-100 dark:border-gray-800'
      : 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold gradient-text tracking-tight">
            Qaisar Abbas
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {isHome && NAV_LINKS.map(({ href, label }) => {
              const id = href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-primary-500 bg-green-50 dark:bg-green-900/20'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle isDark={isDark} toggle={toggleTheme} />
            <Link
              to="/resume"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            >
              <RiEyeLine size={16} />
              View Resume
            </Link>
            <a
              href="/resume/Qaisar-Abbas-Resume.pdf"
              download="Qaisar-Abbas-Resume.pdf"
              className="cta-btn text-sm px-5 py-2.5"
            >
              <RiDownloadLine size={16} />
              Download CV
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle isDark={isDark} toggle={toggleTheme} />
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
              className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {menuOpen ? <RiCloseLine size={22} /> : <RiMenu3Line size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 pb-4 pt-2 shadow-xl">
          <ul className="space-y-1 mb-4">
            {isHome && NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
            <Link
              to="/resume"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
            >
              <RiEyeLine size={16} />
              View Resume
            </Link>
            <a
              href="/resume/Qaisar-Abbas-Resume.pdf"
              download="Qaisar-Abbas-Resume.pdf"
              className="cta-btn justify-center text-sm"
            >
              <RiDownloadLine size={16} />
              Download CV
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
