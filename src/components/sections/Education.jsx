import { RiGraduationCapLine, RiMapPinLine, RiCalendarLine } from 'react-icons/ri';
import { education } from '../../data/education';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function Education() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 px-4 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`fade-up ${isVisible ? 'visible' : ''} mb-12`}>
          <h2 className="section-title mb-3">Education</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Academic foundations and professional development</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, i) => (
            <div
              key={edu.id}
              className="group bg-gradient-to-b from-emerald-50/50 via-white to-emerald-50/20 dark:from-emerald-950/20 dark:via-gray-900 dark:to-emerald-950/10 border-2 border-emerald-100/80 dark:border-emerald-900/40 hover:border-emerald-400/80 dark:hover:border-emerald-600/70 rounded-2xl p-6 sm:p-7 hover:shadow-xl hover:shadow-emerald-900/5 dark:hover:shadow-emerald-950/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-600/20 group-hover:scale-105 group-hover:shadow-emerald-600/30 transition-all duration-300">
                      <RiGraduationCapLine size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                        {edu.degree}
                      </h3>
                      <p className="text-emerald-800/80 dark:text-emerald-300/90 text-sm font-semibold mt-0.5">
                        {edu.institution}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs flex items-center gap-1 mt-1">
                        <RiMapPinLine size={13} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        {edu.location}
                      </p>
                    </div>
                  </div>

                  <span className="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-500 shadow-sm shadow-emerald-500/20">
                    <RiCalendarLine size={12} />
                    {edu.year}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed pt-3.5 border-t border-emerald-100/70 dark:border-emerald-900/40">
                  {edu.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
