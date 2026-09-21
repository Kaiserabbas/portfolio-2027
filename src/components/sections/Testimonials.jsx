import { useState, useEffect, useCallback } from 'react';
import { RiStarFill, RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
import { testimonials } from '../../data/testimonials';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const colorMap = {
  green: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
};

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  const next = useCallback(() => setCurrent(c => (c + 1) % testimonials.length), []);
  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, isPaused]);

  const t = testimonials[current];

  return (
    <section className="py-24 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div ref={ref} className={`fade-up ${isVisible ? 'visible' : ''} text-center mb-14`}>
          <h2 className="section-title-center mb-3">What Clients Say</h2>
          <p className="text-gray-500 dark:text-gray-400">Trusted by businesses across Dubai</p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Card */}
          <div className="testimonial-card">
            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <RiStarFill key={i} className="text-amber-400" size={18} />
              ))}
            </div>

            <blockquote className="text-gray-700 dark:text-gray-300 text-lg italic leading-relaxed mb-6">
              {t.quote}
            </blockquote>

            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${colorMap[t.color]}`}>
                {t.initials}
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{t.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.title}, {t.company}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-primary-500 hover:text-primary-500 transition"
            >
              <RiArrowLeftLine size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${i === current
                    ? 'w-6 h-2.5 bg-primary-500'
                    : 'w-2.5 h-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-primary-500 hover:text-primary-500 transition"
            >
              <RiArrowRightLine size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
