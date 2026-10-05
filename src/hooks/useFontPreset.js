import { useState, useEffect, useCallback } from 'react';

const FONT_KEY = 'qaisar_portfolio_font';

export const FONT_PRESETS = [
  {
    id: 'premium-modern',
    label: 'Premium / Modern',
    emoji: '⭐',
    heading: 'Montserrat',
    body: 'Inter',
    impression: 'Clean, professional',
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
    id: 'architecture',
    label: 'Architecture',
    emoji: '🏗️',
    heading: 'Poppins',
    body: 'Inter',
    impression: 'Contemporary, technical',
    headingImport: 'Poppins:wght@400;600;700;800;900',
    bodyImport: 'Inter:wght@300;400;500;600;700',
  },
  {
    id: 'luxury',
    label: 'Luxury',
    emoji: '💎',
    heading: 'Cormorant Garamond',
    body: 'Montserrat',
    impression: 'High-end / sophisticated',
    headingImport: 'Cormorant+Garamond:wght@400;600;700',
    bodyImport: 'Montserrat:wght@300;400;500;600;700',
  },
  {
    id: 'minimal',
    label: 'Minimal',
    emoji: '🌱',
    heading: 'DM Sans',
    body: 'Inter',
    impression: 'Simple, modern',
    headingImport: 'DM+Sans:wght@400;600;700;800',
    bodyImport: 'Inter:wght@300;400;500;600;700',
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
  {
    id: 'natural-organic',
    label: 'Natural / Organic',
    emoji: '🌳',
    heading: 'Lora',
    body: 'DM Sans',
    impression: 'Warm, elegant',
    headingImport: 'Lora:wght@400;600;700',
    bodyImport: 'DM+Sans:wght@300;400;500;600;700',
  },
];

function applyFont(preset) {
  if (!preset) return;

  // Remove existing dynamic font links
  document.querySelectorAll('link[data-admin-font]').forEach((el) => el.remove());

  // Inject Google Fonts
  const families = encodeURIComponent(`${preset.headingImport}|${preset.bodyImport}`);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${preset.headingImport.replace(':', ':ital,wght@0,').split(':ital,wght@0,').join(':ital,wght@0,')}&family=${preset.bodyImport.replace(':', ':ital,wght@0,').split(':ital,wght@0,').join(':ital,wght@0,')}&display=swap`;
  // simpler href
  link.href = `https://fonts.googleapis.com/css2?family=${preset.headingImport}&family=${preset.bodyImport}&display=swap`;
  link.setAttribute('data-admin-font', 'true');
  document.head.appendChild(link);

  // Apply CSS custom properties
  const root = document.documentElement;
  root.style.setProperty('--font-heading', `'${preset.heading}', sans-serif`);
  root.style.setProperty('--font-body', `'${preset.body}', sans-serif`);

  // Apply to html element
  document.documentElement.style.fontFamily = `'${preset.body}', 'Segoe UI', system-ui, sans-serif`;

  // Apply heading styles via a style tag
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

  // Apply on mount (restore saved preference)
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
