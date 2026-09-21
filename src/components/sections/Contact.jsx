import { useState } from 'react';
import {
  RiMailLine, RiPhoneLine, RiMapPinLine,
  RiLinkedinBoxFill, RiGithubFill, RiSendPlaneLine,
  RiFileCopyLine,
} from 'react-icons/ri';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import Toast from '../ui/Toast';

const EMAIL = 'qaisar.abbas@email.com';

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation();
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => setToast('Email copied to clipboard!'));
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission
    await new Promise(r => setTimeout(r, 1000));
    setToast('Message sent! I\'ll get back to you soon.');
    setForm({ name: '', email: '', subject: '', message: '' });
    setSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`fade-up ${isVisible ? 'visible' : ''} mb-12`}>
          <h2 className="section-title mb-3">Get In Touch</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl">
            Let's discuss your next landscape project or AI-powered web solution
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-5">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-7 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>

              <div className="space-y-5">
                {/* Email with copy */}
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-green-50 dark:bg-green-900/20 flex-shrink-0">
                    <RiMailLine className="text-primary-500" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">Email</p>
                    <a href={`mailto:${EMAIL}`} className="text-gray-800 dark:text-gray-200 font-medium text-sm hover:text-primary-500 transition truncate block">
                      {EMAIL}
                    </a>
                  </div>
                  <button
                    onClick={copyEmail}
                    title="Copy email"
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-primary-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition flex-shrink-0"
                  >
                    <RiFileCopyLine size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 flex-shrink-0">
                    <RiPhoneLine className="text-blue-500" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">Phone</p>
                    <a href="tel:+971" className="text-gray-800 dark:text-gray-200 font-medium text-sm hover:text-primary-500 transition">
                      +971 XX XXX XXXX
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-orange-50 dark:bg-orange-900/20 flex-shrink-0">
                    <RiMapPinLine className="text-orange-500" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">Location</p>
                    <p className="text-gray-800 dark:text-gray-200 font-medium text-sm">Dubai, United Arab Emirates</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="border-t border-gray-100 dark:border-gray-700 mt-6 pt-6">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-3">Connect</p>
                <div className="flex gap-3">
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition">
                    <RiLinkedinBoxFill size={16} /> LinkedIn
                  </a>
                  <a href="https://github.com" target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                    <RiGithubFill size={16} /> GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Availability Card */}
            <div className="bg-gradient-to-br from-green-50 to-cyan-50 dark:from-green-900/20 dark:to-cyan-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-sm font-bold text-green-700 dark:text-green-400">Available for Work</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Open to landscape consulting, web development, and AI integration projects in Dubai and remotely worldwide.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl p-7 shadow-sm border border-gray-100 dark:border-gray-700 space-y-5">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Send a Message</h3>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Name</label>
                <input
                  type="text" name="name" value={form.name} onChange={handleChange} required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Email</label>
                <input
                  type="email" name="email" value={form.email} onChange={handleChange} required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Subject</label>
              <input
                type="text" name="subject" value={form.subject} onChange={handleChange} required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Message</label>
              <textarea
                name="message" value={form.message} onChange={handleChange} required rows={5}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="cta-btn w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Sending...
                </span>
              ) : (
                <>
                  <RiSendPlaneLine size={18} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </section>
  );
}
