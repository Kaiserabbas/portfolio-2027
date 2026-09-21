import { useRef, useEffect } from 'react';
import { RiMapPinLine, RiCheckboxCircleLine, RiCalendarLine } from 'react-icons/ri';
import { experiences } from '../../data/experience';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

function ExperienceItem({ exp, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isGreen = exp.periodColor === 'green';

  return (
    <div
      ref={ref}
      className="experience-item fade-up"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex flex-col lg:flex-row gap-5">

        {/* Thumbnail */}
        {exp.image && (
          <div className="flex-shrink-0">
            <img
              src={exp.image}
              alt={exp.company}
              className="w-full lg:w-36 h-28 object-cover rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm"
              loading="lazy"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                {exp.title}
              </h3>
              <p className="text-base font-semibold text-primary-500 dark:text-green-400 mt-0.5">
                {exp.company}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-1">
                <RiMapPinLine size={13} className="flex-shrink-0" />
                {exp.location}
              </div>
            </div>
            <span
              className={`flex-shrink-0 self-start flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                isGreen
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
              }`}
            >
              <RiCalendarLine size={12} />
              {exp.period}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
            {exp.description}
          </p>

          {/* Highlights */}
          {exp.highlights && exp.highlights.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                Key Projects
              </p>
              <ul className="space-y-1.5">
                {exp.highlights.map((hl) => (
                  <li key={hl} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <RiCheckboxCircleLine
                      size={15}
                      className="text-primary-500 flex-shrink-0 mt-0.5"
                    />
                    {hl}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {exp.tags.map((tag, j) => (
              <span
                key={tag}
                className={exp.tagTypes[j] === 'tech' ? 'tag-blue' : 'tag-green'}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="experience" className="py-24 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div ref={ref} className={`fade-up ${isVisible ? 'visible' : ''} mb-12`}>
          <h2 className="section-title mb-3">Professional Experience</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            20+ years delivering landmark landscape projects across the UAE &amp; beyond
          </p>
        </div>

        <div className="experience-timeline">
          {experiences.map((exp, i) => (
            <ExperienceItem key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
