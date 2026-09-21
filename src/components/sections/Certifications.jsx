import {
  RiMedalLine, RiAwardLine, RiLeafLine, RiShieldLine,
  RiGraduationCapLine, RiIdCardLine, RiBriefcaseLine,
} from 'react-icons/ri';
import { certifications } from '../../data/certifications';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const iconMap = {
  certificate: RiMedalLine,
  award: RiAwardLine,
  leaf: RiLeafLine,
  shield: RiShieldLine,
  graduation: RiGraduationCapLine,
  'id-card': RiIdCardLine,
  briefcase: RiBriefcaseLine,
};

export default function Certifications() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 px-4 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`fade-up ${isVisible ? 'visible' : ''} mb-12`}>
          <h2 className="section-title mb-3">Certifications &amp; Training</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Professional credentials and specialized training</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => {
            const Icon = iconMap[cert.icon] || RiMedalLine;
            return (
              <div
                key={cert.id}
                className="cert-card"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-orange-50 dark:bg-orange-900/20 flex-shrink-0">
                    <Icon size={20} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm leading-snug">{cert.title}</p>
                    <p className="text-xs text-orange-500 font-semibold mt-0.5">{cert.year}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{cert.description}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{cert.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
