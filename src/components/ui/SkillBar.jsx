import { useEffect, useRef } from 'react';

export default function SkillBar({ name, level, label }) {
  const fillRef = useRef(null);

  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.width = `${level}%`;
          observer.unobserve(el.parentElement);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el.parentElement);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{name}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</span>
      </div>
      <div className="skill-bar">
        <div
          ref={fillRef}
          className="skill-fill"
          style={{ width: 0, transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </div>
    </div>
  );
}
