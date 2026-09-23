import { Link } from 'react-router-dom';
import {
  RiLinkedinBoxFill, RiGithubFill, RiMailLine,
  RiPhoneLine, RiMapPinLine, RiHeartFill,
} from 'react-icons/ri';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <span className="text-xl font-bold gradient-text">Qaisar Abbas</span>
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              Landscape Engineer & AI Solutions Developer bridging 15+ years of horticulture expertise with cutting-edge technology in Dubai, UAE.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://www.linkedin.com/in/kaisar-abbas/" target="_blank" rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-primary-500 transition text-gray-300 hover:text-white"
                title="LinkedIn Profile">
                <RiLinkedinBoxFill size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-primary-500 transition text-gray-300 hover:text-white"
                title="GitHub Profile">
                <RiGithubFill size={18} />
              </a>
              <a href="mailto:Kayser.abbas@gmail.com"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-primary-500 transition text-gray-300 hover:text-white"
                title="Email Kayser">
                <RiMailLine size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['projects', 'services', 'skills', 'about', 'experience', 'contact'].map(link => (
                <li key={link}>
                  <a href={`#${link}`} className="text-gray-400 hover:text-white transition capitalize">
                    {link}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/resume" className="text-gray-400 hover:text-white transition">
                  View Resume
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-400">
                <RiMapPinLine className="text-primary-500 flex-shrink-0" size={16} />
                Dubai, United Arab Emirates
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <RiMailLine className="text-primary-500 flex-shrink-0" size={16} />
                <a href="mailto:Kayser.abbas@gmail.com" className="hover:text-white transition">
                  Kayser.abbas@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <RiPhoneLine className="text-primary-500 flex-shrink-0" size={16} />
                <a href="tel:+971551740572" className="hover:text-white transition">+971 55 1740572</a>
              </li>
            </ul>
            <a
              href="/resume/Qaisar-Abbas-Resume.pdf"
              download="Qaisar-Abbas-Resume.pdf"
              className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition"
              style={{ background: 'linear-gradient(135deg, #1a7659 0%, #0ea5e9 100%)' }}
            >
              Download Resume
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>© {year} Qaisar Abbas. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <RiHeartFill className="text-red-500" size={12} /> in Dubai
          </p>
        </div>
      </div>
    </footer>
  );
}
