import { useEffect, useState } from 'react';
import { RiArrowUpLine } from 'react-icons/ri';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 left-6 z-50 w-11 h-11 flex items-center justify-center rounded-full text-white shadow-lg hover:scale-110 transition-all duration-300"
      style={{ background: 'linear-gradient(135deg, #1a7659 0%, #0ea5e9 100%)' }}
    >
      <RiArrowUpLine size={20} />
    </button>
  );
}
