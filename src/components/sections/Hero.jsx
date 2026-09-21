import { Link } from 'react-router-dom';
import {
  RiDownloadLine, RiEyeLine, RiMailLine,
  RiLeafLine, RiCodeSSlashLine, RiRobotLine, RiDatabase2Line,
} from 'react-icons/ri';
import { useTypewriter } from '../../hooks/useTypewriter';
import StatCounter from '../ui/StatCounter';

const TITLES = [
  'Landscape Engineer',
  'AI Solutions Developer',
  'Full-Stack Developer',
  'Agritech Innovator',
];

const SERVICE_ICONS = [
  { icon: RiLeafLine, label: 'Landscape Design', sub: 'Biophilic & Sustainable', color: 'green' },
  { icon: RiCodeSSlashLine, label: 'Web Development', sub: 'React & Modern Tech', color: 'blue' },
  { icon: RiRobotLine, label: 'AI Agents', sub: 'Claude & Automation', color: 'purple' },
  { icon: RiDatabase2Line, label: 'Databases', sub: 'Architecture & Design', color: 'orange' },
];

const colorMap = {
  green: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 text-green-600',
  blue: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800 text-blue-600',
  purple: 'from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-800 text-purple-600',
  orange: 'from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200 dark:border-orange-800 text-orange-600',
};

export default function Hero() {
  const typedTitle = useTypewriter(TITLES, { speed: 80, deleteSpeed: 50, pause: 2200 });

  return (
    <section className="bg-white dark:bg-gray-950 py-20 lg:py-28 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="animate-[fadeInUp_0.7s_ease-out_forwards]">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Available for projects in Dubai & Remote
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
              Bridging<br />
              <span className="gradient-text">Horticulture &amp; Technology</span>
            </h1>

            {/* Typewriter */}
            <div className="text-xl sm:text-2xl font-semibold text-gray-500 dark:text-gray-400 mb-6 h-9 flex items-center">
              <span className="gradient-text">{typedTitle}</span>
              <span className="typewriter-cursor" />
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-xl">
              15+ years of landscape engineering expertise combined with cutting-edge AI-powered web solutions.
              I design sustainable spaces and build intelligent systems that transform how businesses operate.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#projects" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="cta-btn">
                View My Work
              </a>
              <Link to="/resume" className="btn-outline">
                <RiEyeLine size={18} />
                View Resume
              </Link>
              <a
                href="/resume/Qaisar-Abbas-Resume.pdf"
                download="Qaisar-Abbas-Resume.pdf"
                className="btn-outline"
              >
                <RiDownloadLine size={18} />
                Download CV
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { end: 15, suffix: '+', label: 'Years Experience' },
                { end: 50, suffix: '+', label: 'Projects Delivered' },
                { end: 100, suffix: '%', label: 'Client Satisfaction' },
              ].map(({ end, suffix, label }) => (
                <div key={label} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-center border border-gray-100 dark:border-gray-800">
                  <div className="text-3xl font-bold gradient-text">
                    <StatCounter end={end} suffix={suffix} />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Service Icons Grid */}
          <div className="grid grid-cols-2 gap-4 animate-[fadeInUp_0.7s_ease-out_0.2s_forwards] opacity-0">
            {SERVICE_ICONS.map(({ icon: Icon, label, sub, color }) => (
              <div
                key={label}
                className={`bg-gradient-to-br ${colorMap[color]} border-2 rounded-2xl p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default`}
              >
                <Icon size={48} className={`mx-auto mb-4 ${colorMap[color].split(' ').find(c => c.startsWith('text-'))}`} />
                <p className="font-bold text-gray-900 dark:text-white text-sm">{label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
