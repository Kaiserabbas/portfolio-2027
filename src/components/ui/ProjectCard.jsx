import { useState } from 'react';
import { RiZoomInLine } from 'react-icons/ri';
import ProjectModal from '../ui/ProjectModal';

export default function ProjectCard({ project, delay = 0 }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="project-card cursor-pointer group"
        style={{ animationDelay: `${delay}ms` }}
        onClick={() => setShowModal(true)}
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
              <RiZoomInLine className="text-primary-500" size={22} />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <span className={`${project.sectorClass} text-xs font-semibold px-3 py-1 rounded-full`}>
            {project.sectorLabel}
          </span>
          <h3 className="text-lg font-bold mt-4 mb-2 text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* Quick meta */}
          <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400 mb-4">
            <p><span className="font-semibold text-gray-700 dark:text-gray-300">Client:</span> {project.client}</p>
            <p><span className="font-semibold text-gray-700 dark:text-gray-300">Result:</span> {project.result}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className={`${project.tagClass} text-xs`}>{tag}</span>
            ))}
            {project.tags.length > 3 && (
              <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded text-xs">
                +{project.tags.length - 3} more
              </span>
            )}
          </div>

          <button
            className="mt-4 w-full py-2 text-sm font-semibold rounded-lg border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-500 dark:hover:text-primary-500 transition-all duration-200"
          >
            View Details →
          </button>
        </div>
      </div>

      {showModal && (
        <ProjectModal project={project} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
