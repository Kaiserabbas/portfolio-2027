import { useState } from 'react';
import {
  RiZoomInLine,
  RiExternalLinkLine,
  RiAndroidLine,
  RiGlobalLine,
} from 'react-icons/ri';
import ProjectModal from '../ui/ProjectModal';

export default function ProjectCard({ project, delay = 0 }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="project-card cursor-pointer group flex flex-col justify-between"
        style={{ animationDelay: `${delay}ms` }}
        onClick={() => setShowModal(true)}
      >
        <div>
          {/* Image */}
          <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-900">
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

            {/* Quick Live Link Button on top of image */}
            {(project.liveUrl || project.studyUrl) && (
              <a
                href={project.liveUrl || project.studyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="absolute top-3 right-3 z-10 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 dark:bg-gray-900/95 text-primary-500 dark:text-emerald-400 shadow-md hover:bg-primary-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-gray-900 transition-all duration-200"
                title={`Open ${project.title} in new tab`}
              >
                <span>{project.studyUrl ? 'Live Study & App' : 'Live App'}</span>
                <RiExternalLinkLine size={13} />
              </a>
            )}
          </div>

          {/* Body */}
          <div className="p-6">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
              <span className={`${project.sectorClass} text-xs font-semibold px-3 py-1 rounded-full`}>
                {project.sectorLabel}
              </span>

              {project.platform === 'both' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  <RiAndroidLine size={12} />
                  <span>Web &amp; Android</span>
                </span>
              )}
              {project.platform === 'webapp' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  <RiGlobalLine size={12} />
                  <span>Web App</span>
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
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
          </div>
        </div>

        {/* Action Button(s) */}
        <div className="px-6 pb-6 pt-0">
          {(project.liveUrl || project.studyUrl) ? (
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(true);
                }}
                className="w-full py-2 text-xs font-semibold rounded-lg border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-500 dark:hover:text-primary-500 transition-all duration-200"
              >
                Details
              </button>
              <a
                href={project.liveUrl || project.studyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="cta-btn text-xs py-2 px-3 justify-center text-center"
              >
                <span>{project.studyUrl ? 'Open Study' : 'Open App'}</span>
                <RiExternalLinkLine size={13} className="flex-shrink-0" />
              </a>
            </div>
          ) : (
            <button
              type="button"
              className="mt-2 w-full py-2 text-sm font-semibold rounded-lg border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-500 dark:hover:text-primary-500 transition-all duration-200"
            >
              View Details →
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <ProjectModal project={project} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
