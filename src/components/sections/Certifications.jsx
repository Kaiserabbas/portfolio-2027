import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  RiMedalLine, RiAwardLine, RiLeafLine, RiShieldLine,
  RiGraduationCapLine, RiIdCardLine, RiBriefcaseLine,
  RiCodeSSlashLine, RiExternalLinkLine, RiVerifiedBadgeFill,
  RiEyeLine, RiCloseLine, RiArrowRightLine,
} from 'react-icons/ri';
import { certifications } from '../../data/certifications';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const iconMap = {
  code: RiCodeSSlashLine,
  certificate: RiMedalLine,
  award: RiAwardLine,
  leaf: RiLeafLine,
  shield: RiShieldLine,
  graduation: RiGraduationCapLine,
  'id-card': RiIdCardLine,
  briefcase: RiBriefcaseLine,
};

export default function Certifications() {
  const { ref, isVisible } = useScrollAnimation();
  const [activeTab, setActiveTab] = useState('all');
  const [activeModalCert, setActiveModalCert] = useState(null);

  const filteredCerts = certifications.filter((cert) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'software') return cert.category === 'software';
    if (activeTab === 'engineering') return cert.category !== 'software';
    return true;
  });

  return (
    <section id="certifications" className="py-24 px-4 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`fade-up ${isVisible ? 'visible' : ''} mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6`}>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 mb-3">
              <RiVerifiedBadgeFill size={14} />
              <span>Verified Qualifications</span>
            </div>
            <h2 className="section-title mb-3">Certifications &amp; Credentials</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Software engineering credentials verified on Credential.net and specialized industry training
            </p>
          </div>

          <Link
            to="/credentials"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 transition group self-start md:self-auto"
          >
            <span>View Full Credentials Gallery</span>
            <RiArrowRightLine size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-emerald-700 to-teal-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            All Credentials ({certifications.length})
          </button>
          <button
            onClick={() => setActiveTab('software')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'software'
                ? 'bg-gradient-to-r from-emerald-700 to-teal-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            Software Development ({certifications.filter(c => c.category === 'software').length})
          </button>
          <button
            onClick={() => setActiveTab('engineering')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'engineering'
                ? 'bg-gradient-to-r from-emerald-700 to-teal-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            Engineering &amp; Training ({certifications.filter(c => c.category !== 'software').length})
          </button>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCerts.map((cert, i) => {
            const Icon = iconMap[cert.icon] || RiMedalLine;
            const isSoftware = cert.category === 'software';

            return (
              <div
                key={cert.id}
                className={`flex flex-col justify-between rounded-2xl bg-gray-50/80 dark:bg-gray-900/80 border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  isSoftware
                    ? 'border-emerald-200/90 dark:border-emerald-900/40 hover:border-emerald-400 dark:hover:border-emerald-600'
                    : 'border-gray-200 dark:border-gray-800 hover:border-orange-400 dark:hover:border-orange-500'
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div>
                  {/* Top Bar with Icon & Year / Badge */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 ${
                        isSoftware
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                          : 'bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400'
                      }`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm leading-snug">
                          {cert.title}
                        </p>
                        <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5">
                          {cert.issuer || (isSoftware ? 'Microverse' : 'Verified')}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 flex-shrink-0">
                      {cert.year}
                    </span>
                  </div>

                  {/* Thumbnail Preview for Software Certs */}
                  {cert.imageUrl && (
                    <div
                      className="relative my-3 rounded-xl overflow-hidden bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 cursor-pointer group"
                      onClick={() => setActiveModalCert(cert)}
                    >
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        className="w-full h-32 object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gray-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-semibold">
                        <RiEyeLine size={16} />
                        <span>Preview Certificate</span>
                      </div>
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 leading-relaxed">
                    {cert.description}
                  </p>
                  <p className="text-2xs text-gray-400 dark:text-gray-500 font-mono mb-3">
                    {cert.detail}
                  </p>
                </div>

                {/* Bottom link */}
                <div className="pt-3 border-t border-gray-200/60 dark:border-gray-800/60 flex items-center justify-between gap-2">
                  {cert.link ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 transition hover:underline"
                    >
                      <RiVerifiedBadgeFill size={14} className="text-emerald-600 dark:text-emerald-400" />
                      <span>Verify on Credential.net</span>
                      <RiExternalLinkLine size={12} />
                    </a>
                  ) : (
                    <span className="text-2xs text-gray-400 dark:text-gray-500">
                      Issued in {cert.year}
                    </span>
                  )}

                  {cert.imageUrl && (
                    <button
                      onClick={() => setActiveModalCert(cert)}
                      className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition p-1"
                      title="Preview Certificate"
                      aria-label="Preview Certificate"
                    >
                      <RiEyeLine size={16} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for certificate preview */}
      {activeModalCert && (
        <div
          className="fixed inset-0 z-50 bg-gray-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setActiveModalCert(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 min-w-0">
                <RiVerifiedBadgeFill className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" size={20} />
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base truncate">
                    {activeModalCert.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activeModalCert.issuer} · {activeModalCert.issueDate || activeModalCert.year}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModalCert(null)}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                aria-label="Close modal"
              >
                <RiCloseLine size={20} />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950">
              {activeModalCert.imageUrl && (
                <img
                  src={activeModalCert.imageUrl}
                  alt={activeModalCert.title}
                  className="max-h-[60vh] max-w-full object-contain rounded-xl shadow-lg border border-gray-200 dark:border-gray-800"
                />
              )}
              <div className="mt-4 text-center">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                  {activeModalCert.description}
                </p>
                <p className="text-2xs sm:text-xs font-mono text-gray-400 mt-1">
                  {activeModalCert.detail}
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-end gap-3 flex-wrap">
              <button
                onClick={() => setActiveModalCert(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Close
              </button>
              {activeModalCert.link && (
                <a
                  href={activeModalCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700 transition shadow-sm"
                >
                  <span>Open Official Credential on Credential.net</span>
                  <RiExternalLinkLine size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
