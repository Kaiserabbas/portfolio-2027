import { RiGraduationCapLine, RiMapPinLine, RiCalendarLine, RiExternalLinkLine, RiShieldCheckLine } from 'react-icons/ri';
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
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-white via-white to-emerald-50/70 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-950/10 dark:border-gray-700 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-950/20 dark:hover:border-emerald-700 sm:p-7"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-emerald-600 to-cyan-500 opacity-70 transition-opacity group-hover:opacity-100" />
              <div>
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3.5">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-500 text-white shadow-md shadow-emerald-800/20 transition-transform duration-300 group-hover:scale-105">
                      <RiGraduationCapLine size={23} />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300 sm:text-lg">
                        {edu.degree}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-emerald-800/80 dark:text-emerald-300/90">
                        {edu.institution}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <RiMapPinLine size={13} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        {edu.location}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-emerald-100 bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-300">
                    <RiCalendarLine size={13} />
                    {edu.year}
                  </span>
                </div>

                <p className="border-t border-emerald-100/70 pt-4 text-sm leading-relaxed text-gray-600 dark:border-emerald-900/40 dark:text-gray-300">
                  {edu.description}
                </p>

                {edu.credentialUrl && (
                  <div className="mt-4 pt-3 border-t border-emerald-100/60 dark:border-emerald-900/30 flex items-center justify-between">
                    <a
                      href={edu.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 transition hover:underline"
                    >
                      <RiShieldCheckLine size={15} className="text-emerald-600 dark:text-emerald-400" />
                      <span>Verify Credential on Credential.net</span>
                      <RiExternalLinkLine size={13} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
