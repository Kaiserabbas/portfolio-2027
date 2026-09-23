import { useEffect, useState } from 'react';
import {
  RiCloseLine,
  RiCalendarLine,
  RiUserLine,
  RiTimeLine,
  RiTrophyLine,
  RiCodeSSlashLine,
  RiMapPinLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiExternalLinkLine,
  RiAndroidLine,
  RiGlobalLine,
  RiFileList3Line,
} from 'react-icons/ri';

export default function ProjectModal({ project, onClose }) {
  const [imgIndex, setImgIndex] = useState(0);
  const gallery = (project.gallery && project.gallery.length > 0) ? project.gallery : [project.image];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setImgIndex(i => (i + 1) % gallery.length);
      if (e.key === 'ArrowLeft') setImgIndex(i => (i - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose, gallery.length]);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content max-w-3xl">

        {/* Image Gallery */}
        <div className="relative bg-gray-900">
          <img
            src={gallery[imgIndex]}
            alt={`${project.title} (${imgIndex + 1})`}
            className="w-full h-64 sm:h-72 object-cover rounded-t-2xl"
          />

          {/* Gallery nav (only if multiple images) */}
          {gallery.length > 1 && (
            <>
              <button
                onClick={() => setImgIndex(i => (i - 1 + gallery.length) % gallery.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition"
                aria-label="Previous image"
              >
                <RiArrowLeftSLine size={22} />
              </button>
              <button
                onClick={() => setImgIndex(i => (i + 1) % gallery.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition"
                aria-label="Next image"
              >
                <RiArrowRightSLine size={22} />
              </button>
              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`rounded-full transition-all duration-200 ${i === imgIndex ? 'w-4 h-2 bg-white' : 'w-2 h-2 bg-white/50'}`}
                  />
                ))}
              </div>
              {/* Counter */}
              <span className="absolute bottom-3 right-4 text-xs text-white/80 bg-black/40 px-2 py-0.5 rounded-md font-medium">
                {imgIndex + 1}/{gallery.length}
              </span>
            </>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition"
            aria-label="Close dialog"
          >
            <RiCloseLine size={20} />
          </button>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2 flex-wrap">
            <span className={`${project.sectorClass} px-3 py-1 rounded-full text-xs font-semibold bg-white/95 dark:bg-gray-900/90 shadow-sm`}>
              {project.sectorLabel}
            </span>
            {project.platform === 'both' && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow-sm flex items-center gap-1">
                <RiAndroidLine size={13} />
                <span>Web &amp; Android</span>
              </span>
            )}
            {project.platform === 'webapp' && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-sm flex items-center gap-1">
                <RiGlobalLine size={13} />
                <span>Web App</span>
              </span>
            )}
          </div>
        </div>

        {/* Thumbnail strip (only if 3+ images) */}
        {gallery.length >= 3 && (
          <div className="flex gap-2 px-5 py-3 bg-gray-50 dark:bg-gray-800/50 overflow-x-auto border-b border-gray-100 dark:border-gray-800">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setImgIndex(i)}
                className={`flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition ${
                  i === imgIndex ? 'border-primary-500' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h3>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-primary-600 dark:text-emerald-400 bg-primary-50 dark:bg-emerald-950/40 border border-primary-200 dark:border-emerald-800/60 hover:bg-primary-500 hover:text-white transition self-start"
              >
                <span>Live Website / App</span>
                <RiExternalLinkLine size={14} />
              </a>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-6">
            {project.longDescription}
          </p>

          {/* Meta grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
            {[
              { icon: RiUserLine, label: 'Client', value: project.client },
              { icon: RiMapPinLine, label: 'Location', value: project.location },
              { icon: RiTimeLine, label: 'Duration', value: project.duration },
              { icon: RiTrophyLine, label: 'Result', value: project.result },
              { icon: RiCalendarLine, label: 'Year', value: project.year },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <Icon className="text-primary-500 flex-shrink-0 mt-0.5" size={14} />
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wide">{label}</p>
                  <p className="font-semibold text-xs leading-snug mt-0.5">{value}</p>
                </div>
              </div>
            ))}

            {project.liveUrl && (
              <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <RiExternalLinkLine className="text-primary-500 flex-shrink-0 mt-0.5" size={14} />
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wide">Live URL</p>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 dark:text-emerald-400 hover:underline font-semibold text-xs truncate block max-w-[150px]"
                  >
                    {project.liveUrl.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              </div>
            )}

            {project.studyUrl && (
              <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <RiFileList3Line className="text-primary-500 flex-shrink-0 mt-0.5" size={14} />
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wide">Field Study &amp; Data</p>
                  <a
                    href={project.studyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 dark:text-emerald-400 hover:underline font-semibold text-xs truncate block max-w-[150px]"
                  >
                    View Research Study
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <RiCodeSSlashLine className="text-primary-500" size={14} />
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Skills &amp; Technologies</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map(tag => (
                <span key={tag} className={project.tagClass}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={onClose}
              className="py-2.5 px-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition text-sm"
            >
              Close
            </button>
            {project.studyUrl && (
              <a
                href={project.studyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl border-2 border-primary-500 text-primary-600 dark:text-emerald-400 hover:bg-primary-50 dark:hover:bg-emerald-950/30 font-semibold transition text-sm"
              >
                <RiFileList3Line size={16} />
                <span>Open Study &amp; Telemetry</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn flex-1 justify-center text-sm py-2.5"
              >
                <span>Open Live Application</span>
                <RiExternalLinkLine size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
