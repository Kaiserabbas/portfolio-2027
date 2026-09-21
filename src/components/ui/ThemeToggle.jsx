import { RiMoonFill, RiSunFill } from 'react-icons/ri';

export default function ThemeToggle({ isDark, toggle }) {
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 text-gray-600 dark:text-yellow-400"
    >
      {isDark ? <RiSunFill size={18} /> : <RiMoonFill size={18} />}
    </button>
  );
}
