import { useEffect, useState } from 'react';
import {
  RiCloseLine, RiCalendarLine, RiUserLine, RiTimeLine,
  RiTrophyLine, RiCodeSSlashLine, RiMapPinLine,
  RiArrowLeftSLine, RiArrowRightSLine,
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
      <div className="modal-content">

        {/* Image Gallery */}
        <div className="relative bg-gray-900">
          <img
            src={gallery[imgIndex]}
            alt={`${project.title} — ${imgIndex + 1}`}
            className="w-full h-60 object-cover rounded-t-2xl"
          />

          {/* Gallery nav (only if multiple images) */}
          {gallery.length > 1 && (
            <>
              <button
                onClick={() => setImgIndex(i => (i - 1 + gallery.length) % gallery.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition"
              >
                <RiArrowLeftSLine size={20} />
              </button>
              <button
                onClick={() => setImgIndex(i => (i + 1) % gallery.length)}
                className="absolute right-12 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition"
              >
                <RiArrowRightSLine size={20} />
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
              <span className="absolute bottom-3 right-4 text-xs text-white/70 font-medium">
                {imgIndex + 1}/{gallery.length}
              </span>
            </>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition"
          >
            <RiCloseLine size={20} />
          </button>

          {/* Badge */}
          <span className={`absolute top-3 left-3 ${project.sectorClass} px-3 py-1 rounded-full text-xs font-semibold bg-white/90`}>
            {project.sectorLabel}
          </span>
        </div>

        {/* Thumbnail strip (only if 3+ images) */}
        {gallery.length >= 3 && (
          <div className="flex gap-2 px-5 py-3 bg-gray-50 dark:bg-gray-800/50 overflow-x-auto">
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
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-5">{project.longDescription}</p>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
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
          </div>

          {/* Tags */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <RiCodeSSlashLine className="text-primary-500" size={14} />
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Skills & Tags</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map(tag => (
                <span key={tag} className={project.tagClass}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
