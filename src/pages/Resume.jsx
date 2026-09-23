import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  RiDownloadLine, RiArrowLeftLine, RiExternalLinkLine,
  RiPrinterLine, RiEyeLine,
} from 'react-icons/ri';

const RESUME_PDF = '/resume/Qaisar-Abbas-Resume.pdf';

export default function Resume() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Header Bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
          {/* Left */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            >
              <RiArrowLeftLine size={18} />
              Back to Portfolio
            </Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <div className="flex items-center gap-2">
              <RiEyeLine className="text-primary-500" size={16} />
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Resume: Qaisar Abbas
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <RiPrinterLine size={15} />
              Print
            </button>
            <a
              href={RESUME_PDF}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <RiExternalLinkLine size={15} />
              Open Tab
            </a>
            <a
              href={RESUME_PDF}
              download="Qaisar-Abbas-Resume.pdf"
              className="cta-btn text-xs px-4 py-2"
            >
              <RiDownloadLine size={15} />
              Download CV
            </a>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Loading skeleton */}
          {!loaded && (
            <div className="w-full h-[80vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 gap-4">
              <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Loading resume...</p>
            </div>
          )}

          <iframe
            src={`${RESUME_PDF}#toolbar=0&navpanes=0&scrollbar=1`}
            title="Qaisar Abbas Resume"
            className="w-full border-0"
            style={{
              height: '85vh',
              display: loaded ? 'block' : 'none',
            }}
            onLoad={() => setLoaded(true)}
          />
        </div>

        {/* Fallback message */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Can't view the PDF?{' '}
          <a href={RESUME_PDF} download className="text-primary-500 hover:underline font-semibold">
            Download it directly
          </a>{' '}
          or{' '}
          <a href={RESUME_PDF} target="_blank" rel="noreferrer" className="text-primary-500 hover:underline font-semibold">
            open in a new tab
          </a>.
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 bg-gradient-to-br from-green-50 to-cyan-50 dark:from-green-900/20 dark:to-cyan-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 text-center">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Interested in working together?</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
            Let's discuss how I can contribute to your next landscape or technology project.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={RESUME_PDF}
              download="Qaisar-Abbas-Resume.pdf"
              className="cta-btn"
            >
              <RiDownloadLine size={18} />
              Download Resume
            </a>
            <Link to="/#contact" className="btn-outline">
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
