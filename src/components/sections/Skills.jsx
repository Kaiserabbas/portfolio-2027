import { landscapeSkills, techSkills, techStack } from '../../data/skills';
import SkillBar from '../ui/SkillBar';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const tagColors = {
  blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  green: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
};

export default function Skills() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="skills" className="py-24 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`fade-up ${isVisible ? 'visible' : ''} mb-16`}>
          <h2 className="section-title mb-3">Skills &amp; Expertise</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Two decades of cross-disciplinary mastery
          </p>
        </div>

        {/* Skill Bars */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Landscape Skills */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-8 text-green-700 dark:text-green-400 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
              Landscape &amp; Agriculture
            </h3>
            <div className="space-y-6">
              {landscapeSkills.map(skill => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>
          </div>

          {/* Tech Skills */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-8 text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
              Technology &amp; Development
            </h3>
            <div className="space-y-6">
              {techSkills.map(skill => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-8 text-center text-gray-900 dark:text-white">Technology Stack</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(techStack).map(([category, { tags, color }]) => (
              <div key={category} className="text-center">
                <p className="font-semibold text-gray-800 dark:text-gray-200 mb-4 text-sm uppercase tracking-wider">{category}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {tags.map(tag => (
                    <span key={tag} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${tagColors[color]}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
