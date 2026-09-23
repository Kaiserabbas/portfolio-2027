import { useState } from 'react';
import {
  RiLayoutGridLine, RiLeafLine, RiCodeSSlashLine, RiSmartphoneLine,
} from 'react-icons/ri';
import { projects } from '../../data/projects';
import ProjectCard from '../ui/ProjectCard';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const FILTERS = [
  { key: 'all', label: 'All Projects', icon: RiLayoutGridLine },
  { key: 'landscape', label: 'Landscape Engineering', icon: RiLeafLine },
  { key: 'it', label: 'Web & AI Solutions', icon: RiCodeSSlashLine },
  { key: 'both', label: 'Web & Android Apps', icon: RiSmartphoneLine },
];

const PAGE_SIZE = 6;

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  const filtered = activeFilter === 'all'
    ? projects
    : activeFilter === 'both'
    ? projects.filter(p => p.platform === 'both')
    : projects.filter(p => p.category === activeFilter);

  const displayed = showAll ? filtered : filtered.slice(0, PAGE_SIZE);
  const hasMore = filtered.length > PAGE_SIZE && !showAll;

  return (
    <section id="projects" className="py-24 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`fade-up ${isVisible ? 'visible' : ''} mb-3`}>
          <h2 className="section-title mb-3">Featured Projects</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg max-w-2xl">
            Explore my work across landscape engineering, agritech research, and AI-powered technology solutions
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          {FILTERS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => { setActiveFilter(key); setShowAll(false); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeFilter === key
                  ? 'filter-active'
                  : 'border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 60} />
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="btn-outline px-8 py-3"
            >
              Show All Projects
            </button>
          </div>
        )}
        {showAll && filtered.length > PAGE_SIZE && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(false)}
              className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition underline"
            >
              Show Less
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
