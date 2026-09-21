import { education } from '../../data/education';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const colorMap = {
  blue: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-500',
  green: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-500',
  purple: 'from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-500',
  orange: 'from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-500',
};

const badgeColor = {
  blue: 'from-blue-500 to-cyan-500',
  green: 'from-green-500 to-emerald-500',
  purple: 'from-purple-500 to-violet-500',
  orange: 'from-orange-500 to-amber-500',
};

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
              className={`bg-gradient-to-br ${colorMap[edu.color]} border-l-4 rounded-2xl p-7 hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{edu.degree}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{edu.institution}</p>
                  <p className="text-gray-500 dark:text-gray-500 text-xs">{edu.location}</p>
                </div>
                <span className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${badgeColor[edu.color]}`}>
                  {edu.year}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
