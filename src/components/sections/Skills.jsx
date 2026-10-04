import { landscapeSkills, techSkills, techStack } from '../../data/skills';
import SkillBar from '../ui/SkillBar';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import {
  RiCodeSSlashLine, RiDatabase2Line, RiRobotLine, RiPaletteLine,
} from 'react-icons/ri';

const tagColors = {
  blue: {
    icon: RiCodeSSlashLine,
    styles: 'bg-sky-50 text-sky-800 ring-sky-200/80 hover:bg-sky-100 dark:bg-sky-950/40 dark:text-sky-300 dark:ring-sky-900',
  },
  green: {
    icon: RiDatabase2Line,
    styles: 'bg-emerald-50 text-emerald-800 ring-emerald-200/80 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900',
  },
  purple: {
    icon: RiRobotLine,
    styles: 'bg-violet-50 text-violet-800 ring-violet-200/80 hover:bg-violet-100 dark:bg-violet-950/40 dark:text-violet-300 dark:ring-violet-900',
  },
  orange: {
    icon: RiPaletteLine,
    styles: 'bg-amber-50 text-amber-800 ring-amber-200/80 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900',
  },
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
        <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-white via-white to-emerald-50/70 p-5 shadow-sm dark:border-gray-700 dark:from-gray-800 dark:via-gray-800 dark:to-emerald-950/20 sm:p-8">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400">Tools of the trade</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Technology Stack</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">A practical toolkit for building useful, reliable digital experiences.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Object.entries(techStack).map(([category, { tags, color }]) => {
              const { icon: CategoryIcon, styles } = tagColors[color];
              return (
                <div key={category} className="rounded-2xl border border-gray-100 bg-white/80 p-4 dark:border-gray-700 dark:bg-gray-900/50 sm:p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      <CategoryIcon size={20} />
                    </span>
                    <p className="text-sm font-bold leading-tight text-gray-800 dark:text-gray-100">{category}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <span key={tag} className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold ring-1 ring-inset transition-colors ${styles}`}>
                        <CategoryIcon size={13} aria-hidden="true" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
