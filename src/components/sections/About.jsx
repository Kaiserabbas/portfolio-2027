import { Link } from 'react-router-dom';
import { RiDownloadLine, RiEyeLine, RiMapPinLine } from 'react-icons/ri';
import StatCounter from '../ui/StatCounter';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-24 px-4 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`fade-up ${isVisible ? 'visible' : ''}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <h2 className="section-title mb-8">About Me</h2>

              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-5">
                <RiMapPinLine className="text-primary-500" size={16} />
                Dubai, United Arab Emirates
              </div>

              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  I'm an innovative Landscape &amp; Agricultural Engineer with <strong className="text-gray-900 dark:text-white">15+ years of proven expertise</strong> in the UAE market. My career is defined by a unique ability to blend traditional horticulture with modern technology and AI-driven solutions.
                </p>
                <p>
                  What sets me apart is my dual mastery: I design and execute <strong className="text-gray-900 dark:text-white">sustainable, high-end commercial and residential landscapes</strong> that create lasting impressions, while simultaneously building <strong className="text-gray-900 dark:text-white">intelligent web and mobile applications</strong> that streamline operations.
                </p>
                <p>
                  I'm adept at full-cycle project planning, cross-functional team leadership, and leveraging modern digital tools, from AI-driven corporate branding to front-end web development, to enhance client presentations and streamline operations.
                </p>
                <p>
                  Whether managing landscape redesigns for high-traffic restaurants, building AI agents that automate business workflows, or developing mobile apps for real-time plant health monitoring, I bring technical depth and creative problem-solving to every project.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/resume" className="cta-btn">
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
            </div>

            {/* Right: Stats + Highlights */}
            <div className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { end: 15, suffix: '+', label: 'Years in Landscaping' },
                  { end: 50, suffix: '+', label: 'Projects Delivered' },
                  { end: 100, suffix: '%', label: 'Client Satisfaction' },
                ].map(({ end, suffix, label }) => (
                  <div key={label} className="text-center bg-gray-50 dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
                    <div className="text-3xl font-bold gradient-text">
                      <StatCounter end={end} suffix={suffix} />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">{label}</p>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              {[
                { emoji: '🌿', title: 'Landscape Expert', text: 'From site analysis to biophilic design and smart irrigation, backed by 15+ years of hands-on UAE expertise.' },
                { emoji: '🤖', title: 'AI & Web Developer', text: 'Claude API agents, React apps, Android apps, bridging agritech and modern software engineering.' },
                { emoji: '🏆', title: 'Project Leader', text: 'Led cross-functional teams delivering 50+ projects on time, from Dubai to Ajman.' },
              ].map(({ emoji, title, text }) => (
                <div key={title} className="flex gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                  <span className="text-3xl flex-shrink-0">{emoji}</span>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">{title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
