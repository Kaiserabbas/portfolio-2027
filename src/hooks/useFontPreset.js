import { useState, useEffect, useCallback } from 'react';

const FONT_KEY = 'qaisar_portfolio_font';

export const FONT_PRESETS = [
  {
    id: 'premium-modern',
    label: 'Premium / Modern',
    emoji: '⭐',
    heading: 'Montserrat',
    body: 'Inter',
    impression: 'Clean & professional',
    headingImport: 'Montserrat:wght@400;600;700;800;900',
    bodyImport: 'Inter:wght@300;400;500;600;700',
  },
  {
    id: 'landscape-elegant',
    label: 'Landscape / Elegant',
    emoji: '🌿',
    heading: 'Playfair Display',
    body: 'Montserrat',
    impression: 'Luxury + natural',
    headingImport: 'Playfair+Display:wght@400;600;700;800;900',
    bodyImport: 'Montserrat:wght@300;400;500;600;700',
  },
  {
    id: 'corporate',
    label: 'Corporate',
    emoji: '🏢',
    heading: 'Manrope',
    body: 'Inter',
    impression: 'Professional & polished',
    headingImport: 'Manrope:wght@400;600;700;800',
    bodyImport: 'Inter:wght@300;400;500;600;700',
  },
  {
    id: 'premium-tech',
    label: 'Premium Tech',
    emoji: '✨',
    heading: 'Sora',
    body: 'Inter',
    impression: 'Modern portfolio portal',
    headingImport: 'Sora:wght@400;600;700;800',
    bodyImport: 'Inter:wght@300;400;500;600;700',
  },
];

function applyFont(preset) {
  if (!preset) return;

  // Remove existing dynamic font links
  document.querySelectorAll('link[data-admin-font]').forEach((el) => el.remove());

  // Inject Google Fonts
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${preset.headingImport}&family=${preset.bodyImport}&display=swap`;
  link.setAttribute('data-admin-font', 'true');
  document.head.appendChild(link);

  // Apply via style tag override
  let styleTag = document.getElementById('admin-font-override');
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'admin-font-override';
    document.head.appendChild(styleTag);
  }
  styleTag.textContent = `
    html { font-family: '${preset.body}', 'Segoe UI', system-ui, sans-serif !important; }
    h1, h2, h3, h4, h5, h6, .section-title, .section-title-center {
      font-family: '${preset.heading}', serif !important;
    }
  `;
}

export function useFontPreset() {
  const [activePresetId, setActivePresetId] = useState(() => {
    return localStorage.getItem(FONT_KEY) || null;
  });

  // Restore on mount
  useEffect(() => {
    if (activePresetId) {
      const preset = FONT_PRESETS.find((p) => p.id === activePresetId);
      if (preset) applyFont(preset);
    }
  }, []); // eslint-disable-line

  const setPreset = useCallback((presetId) => {
    const preset = FONT_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    applyFont(preset);
    setActivePresetId(presetId);
    localStorage.setItem(FONT_KEY, presetId);
  }, []);

  const resetFont = useCallback(() => {
    document.querySelectorAll('link[data-admin-font]').forEach((el) => el.remove());
    const styleTag = document.getElementById('admin-font-override');
    if (styleTag) styleTag.textContent = '';
    document.documentElement.style.fontFamily = '';
    setActivePresetId(null);
    localStorage.removeItem(FONT_KEY);
  }, []);

  return { activePresetId, setPreset, resetFont };
}
