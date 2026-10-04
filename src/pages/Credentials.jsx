import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  RiArrowLeftLine,
  RiExternalLinkLine,
  RiEyeLine,
  RiVerifiedBadgeFill,
  RiCloseLine,
  RiCodeSSlashLine,
  RiMedalLine,
  RiAwardLine,
  RiLeafLine,
  RiShieldLine,
  RiGraduationCapLine,
  RiIdCardLine,
  RiBriefcaseLine,
} from 'react-icons/ri';
import { certifications } from '../data/certifications';

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

export default function Credentials() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModalCert, setActiveModalCert] = useState(null);

  const filteredCerts = certifications.filter((cert) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'software') return cert.category === 'software';
    if (selectedCategory === 'professional') return cert.category !== 'software';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      {/* Top Header Bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-emerald-400 transition"
            >
              <RiArrowLeftLine size={18} />
              <span className="hidden sm:inline">Back to Portfolio</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <div className="flex items-center gap-2">
              <RiVerifiedBadgeFill className="text-emerald-600 dark:text-emerald-400" size={18} />
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Verified Credentials &amp; Certifications
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/resume"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <RiEyeLine size={15} />
              <span>View Resume</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 mb-4">
            <RiVerifiedBadgeFill size={15} />
            <span>Authenticated Digital Credentials</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Verified Certifications
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Authentic verifiable digital credentials awarded by Microverse and international institutions.
            Each software engineering credential is cryptographic and verifiable on Accredible (credential.net).
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-8 p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm max-w-2xl mx-auto">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-primary-600 dark:text-emerald-400">6</p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mt-0.5">Software Credentials</p>
            </div>
            <div className="border-x border-gray-100 dark:border-gray-800">
              <p className="text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400">100%</p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mt-0.5">Verified on Credential.net</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-orange-500">13+</p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mt-0.5">Total Certifications</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-emerald-700 to-teal-600 text-white shadow-md shadow-emerald-900/20'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-750'
            }`}
          >
            All Credentials ({certifications.length})
          </button>
          <button
            onClick={() => setSelectedCategory('software')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition ${
              selectedCategory === 'software'
                ? 'bg-gradient-to-r from-emerald-700 to-teal-600 text-white shadow-md shadow-emerald-900/20'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-750'
            }`}
          >
            Software Development ({certifications.filter(c => c.category === 'software').length})
          </button>
          <button
            onClick={() => setSelectedCategory('professional')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition ${
              selectedCategory === 'professional'
                ? 'bg-gradient-to-r from-emerald-700 to-teal-600 text-white shadow-md shadow-emerald-900/20'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-750'
            }`}
          >
            Engineering &amp; Professional ({certifications.filter(c => c.category !== 'software').length})
          </button>
        </div>

        {/* Credentials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => {
            const Icon = iconMap[cert.icon] || RiMedalLine;
            const isSoftware = cert.category === 'software';

            return (
              <div
                key={cert.id}
                className={`flex flex-col justify-between rounded-2xl bg-white dark:bg-gray-900 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  isSoftware
                    ? 'border-emerald-200 dark:border-emerald-900/50 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-emerald-950/10'
                    : 'border-gray-200 dark:border-gray-800 hover:border-orange-400 dark:hover:border-orange-500'
                }`}
              >
                <div>
                  {/* Image Preview for Certificates with Images */}
                  {cert.imageUrl ? (
                    <div
                      className="relative overflow-hidden rounded-t-2xl bg-gray-100 dark:bg-gray-950 p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer group"
                      onClick={() => setActiveModalCert(cert)}
                    >
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        className="w-full h-44 object-contain transition-transform duration-300 group-hover:scale-105 rounded-lg shadow-2xs"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gray-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold">
                        <RiEyeLine size={18} />
                        <span>Preview Certificate</span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-2xs font-bold uppercase tracking-wider bg-white/95 dark:bg-gray-900/95 text-emerald-700 dark:text-emerald-400 shadow-sm border border-emerald-200 dark:border-emerald-800">
                          <RiVerifiedBadgeFill size={13} />
                          Verified
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 pb-0 flex items-center justify-between">
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-950/30 text-orange-500">
                        <Icon size={20} />
                      </div>
                      <span className="text-xs font-semibold text-orange-500 bg-orange-50 dark:bg-orange-950/40 px-2.5 py-1 rounded-full">
                        {cert.year}
                      </span>
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="mb-2">
                      {isSoftware && (
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                            {cert.issuer}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            {cert.issueDate || cert.year}
                          </span>
                        </div>
                      )}
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-snug">
                        {cert.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                      {cert.description}
                    </p>

                    <p className="text-2xs sm:text-xs text-gray-400 dark:text-gray-500 font-mono">
                      {cert.detail}
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-5 pt-0 mt-auto flex items-center gap-2">
                  {cert.link ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700 transition shadow-sm"
                    >
                      <span>Verify on Credential.net</span>
                      <RiExternalLinkLine size={14} />
                    </a>
                  ) : (
                    <div className="w-full text-center py-2 text-xs text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-800">
                      {cert.issuer}
                    </div>
                  )}

                  {cert.imageUrl && (
                    <button
                      onClick={() => setActiveModalCert(cert)}
                      className="px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                      title="Preview"
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

        {/* Modal for full certificate view */}
        {activeModalCert && (
          <div
            className="fixed inset-0 z-50 bg-gray-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]"
            onClick={() => setActiveModalCert(null)}
          >
            <div
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
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

              {/* Modal Body */}
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

              {/* Modal Footer */}
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

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/30 dark:via-gray-900 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-3xl p-8 text-center max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Looking for a Software Engineer &amp; Landscape Specialist?
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-6">
            Explore my featured applications, landscape projects, or reach out directly for collaborations.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/#projects" className="cta-btn text-xs px-6 py-3">
              Explore Projects
            </Link>
            <Link to="/resume" className="btn-outline text-xs px-6 py-3">
              View Complete Resume
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
