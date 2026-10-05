import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RiLockLine,
  RiCloseLine,
  RiEyeLine,
  RiEyeOffLine,
  RiShieldCheckLine,
  RiLogoutBoxLine,
} from 'react-icons/ri';
import { useAdminAuth } from '../../hooks/useAdminAuth';

/**
 * Small, low-visibility lock icon that opens the admin login modal.
 * Lives in the Navbar.
 */
export function AdminLockButton({ onOpen }) {
  return (
    <button
      onClick={onOpen}
      title="Admin Panel"
      aria-label="Open Admin Panel"
      className="opacity-20 hover:opacity-60 transition-opacity duration-300 text-gray-500 dark:text-gray-400 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <RiLockLine size={15} />
    </button>
  );
}

/**
 * Password gate modal shown when clicking the lock icon.
 */
export function AdminLoginModal({ onClose, onSuccess }) {
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [shaking, setShaking] = useState(false);
  const { login, error, clearError } = useAdminAuth();
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = login(password);
    if (ok) {
      onSuccess();
    } else {
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
      setPassword('');
      inputRef.current?.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-gray-950/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
        className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-200 dark:border-gray-800 overflow-hidden ${shaking ? 'animate-[wiggle_0.5s_ease-in-out]' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <RiShieldCheckLine size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">Admin Access</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Portfolio Control Panel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <RiCloseLine size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); clearError(); }}
                placeholder="Enter admin password"
                autoFocus
                className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-white"
              >
                {showPwd ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
              </button>
            </div>
            {error && (
              <p className="mt-1.5 text-xs text-red-500 dark:text-red-400 font-medium">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700 transition shadow-sm"
          >
            Unlock Panel
          </button>
        </form>
      </div>
    </div>
  );
}

/**
 * Small floating badge shown when admin is authenticated (not on admin page).
 */
export function AdminActiveBadge({ onGoToPanel, onLogout }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => { navigate('/admin'); if (onGoToPanel) onGoToPanel(); }}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition"
      >
        <RiShieldCheckLine size={13} />
        <span>Admin</span>
      </button>
      <button
        onClick={onLogout}
        title="Logout"
        className="p-1 text-gray-400 hover:text-red-500 transition"
      >
        <RiLogoutBoxLine size={14} />
      </button>
    </div>
  );
}
