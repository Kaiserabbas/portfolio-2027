import {
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
  { icon: RiLeafLine, label: 'Landscape Design', sub: 'Biophilic & Sustainable' },
  { icon: RiCodeSSlashLine, label: 'Web Development', sub: 'React & Modern Tech' },
  { icon: RiRobotLine, label: 'AI Agents', sub: 'Claude & Automation' },
  { icon: RiDatabase2Line, label: 'Databases', sub: 'Architecture & Design' },
];

export default function Hero() {
  const typedTitle = useTypewriter(TITLES, { speed: 80, deleteSpeed: 50, pause: 2200 });

  return (
    <section className="bg-white dark:bg-gray-950 pt-5 sm:pt-7 lg:pt-8 pb-16 lg:pb-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="animate-[fadeInUp_0.7s_ease-out_forwards]">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Available for projects in Gulf &amp; Remote
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
                className="cta-btn text-base px-7 py-3">
                View My Work
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
            {SERVICE_ICONS.map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="group bg-gradient-to-b from-emerald-50/50 via-white to-emerald-50/20 dark:from-emerald-950/20 dark:via-gray-900 dark:to-emerald-950/10 border-2 border-emerald-100/80 dark:border-emerald-900/40 hover:border-emerald-400/80 dark:hover:border-emerald-600/70 rounded-2xl p-6 sm:p-7 text-center hover:shadow-xl hover:shadow-emerald-900/5 dark:hover:shadow-emerald-950/30 hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center mx-auto mb-3.5 shadow-md shadow-emerald-600/20 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-600/30 transition-all duration-300">
                  <Icon size={30} />
                </div>
                <p className="font-bold text-gray-900 dark:text-white text-sm sm:text-base group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {label}
                </p>
                <p className="text-xs text-emerald-800/70 dark:text-emerald-400/80 font-medium mt-1">
                  {sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
