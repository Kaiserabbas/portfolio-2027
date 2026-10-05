import { useState, useEffect, useCallback } from 'react';

const FONT_KEY = 'qaisar_portfolio_font';

const SANS = "'Segoe UI', system-ui, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";

export const FONT_PRESETS = [
  // ── Original presets ──────────────────────────────────────────
  {
    id: 'premium-modern',
    label: 'Premium / Modern',
    emoji: '⭐',
    heading: 'Montserrat',
    body: 'Inter',
    impression: 'Clean & professional',
    headingImport: 'Montserrat:wght@400;600;700;800;900',
    bodyImport: 'Inter:wght@300;400;500;600;700',
    headingFallback: SANS,
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
    headingFallback: SERIF,
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
    headingFallback: SANS,
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
    headingFallback: SANS,
  },

  // ── New presets ───────────────────────────────────────────────
  {
    id: 'editorial',
    label: 'Editorial',
    emoji: '📰',
    heading: 'DM Serif Display',
    body: 'DM Sans',
    impression: 'Magazine-style, confident',
    headingImport: 'DM+Serif+Display:ital@0;1',
    bodyImport: 'DM+Sans:wght@300;400;500;700',
    headingFallback: SERIF,
  },
  {
    id: 'luxury-minimal',
    label: 'Luxury Minimal',
    emoji: '💎',
    heading: 'Cormorant Garamond',
    body: 'Jost',
    impression: 'Refined, high-end, airy',
    headingImport: 'Cormorant+Garamond:wght@400;500;600;700',
    bodyImport: 'Jost:wght@300;400;500;600',
    headingFallback: SERIF,
  },
  {
    id: 'organic-nature',
    label: 'Organic / Nature',
    emoji: '🌱',
    heading: 'Lora',
    body: 'Source Sans 3',
    impression: 'Warm, grounded, readable',
    headingImport: 'Lora:wght@400;500;600;700',
    bodyImport: 'Source+Sans+3:wght@300;400;600;700',
    headingFallback: SERIF,
  },
  {
    id: 'developer',
    label: 'Developer',
    emoji: '💻',
    heading: 'Space Grotesk',
    body: 'IBM Plex Sans',
    impression: 'Technical & distinctive',
    headingImport: 'Space+Grotesk:wght@400;500;600;700',
    bodyImport: 'IBM+Plex+Sans:wght@300;400;500;600',
    headingFallback: SANS,
  },
  {
    id: 'creative-bold',
    label: 'Creative Bold',
    emoji: '🎨',
    heading: 'Outfit',
    body: 'Plus Jakarta Sans',
    impression: 'Friendly, bold, modern',
    headingImport: 'Outfit:wght@400;600;700;800',
    bodyImport: 'Plus+Jakarta+Sans:wght@300;400;500;600;700',
    headingFallback: SANS,
  },
  {
    id: 'friendly-studio',
    label: 'Friendly Studio',
    emoji: '🤝',
    heading: 'Poppins',
    body: 'Nunito Sans',
    impression: 'Approachable & clear',
    headingImport: 'Poppins:wght@400;600;700;800',
    bodyImport: 'Nunito+Sans:wght@300;400;600;700',
    headingFallback: SANS,
  },
  {
    id: 'bilingual-arabic',
    label: 'Bilingual (EN / عربي)',
    emoji: '🌍',
    heading: 'Cairo',
    body: 'Tajawal',
    impression: 'Latin + Arabic support',
    headingImport: 'Cairo:wght@400;600;700;800;900',
    bodyImport: 'Tajawal:wght@300;400;500;700',
    headingFallback: SANS,
  },

  // ── Bold / condensed / modern elegant ─────────────────────────
  {
    id: 'condensed-athletic',
    label: 'Bold Condensed',
    emoji: '🏗️',
    heading: 'Barlow Condensed',
    body: 'Barlow',
    impression: 'Strong, engineered, tidy',
    headingImport: 'Barlow+Condensed:wght@500;600;700;800',
    bodyImport: 'Barlow:wght@300;400;500;600;700',
    headingFallback: SANS,
    headingStyle: 'text-transform: uppercase; letter-spacing: 0.03em;',
  },
  {
    id: 'condensed-classic',
    label: 'Condensed Classic',
    emoji: '📐',
    heading: 'Oswald',
    body: 'Source Sans 3',
    impression: 'Confident headlines, calm body',
    headingImport: 'Oswald:wght@400;500;600;700',
    bodyImport: 'Source+Sans+3:wght@300;400;600;700',
    headingFallback: SANS,
    headingStyle: 'text-transform: uppercase; letter-spacing: 0.04em;',
  },
  {
    id: 'poster-impact',
    label: 'Poster Impact',
    emoji: '🔥',
    heading: 'Bebas Neue',
    body: 'Montserrat',
    impression: 'Big, loud, memorable',
    headingImport: 'Bebas+Neue',
    bodyImport: 'Montserrat:wght@300;400;500;600;700',
    headingFallback: SANS,
    headingStyle: 'text-transform: uppercase; letter-spacing: 0.05em; font-weight: 400;',
  },
  {
    id: 'modern-elegant-serif',
    label: 'Modern Elegant',
    emoji: '🖋️',
    heading: 'Instrument Serif',
    body: 'Instrument Sans',
    impression: 'Slim, stylish, contemporary',
    headingImport: 'Instrument+Serif:ital@0;1',
    bodyImport: 'Instrument+Sans:wght@400;500;600;700',
    headingFallback: SERIF,
    headingStyle: 'font-weight: 400; letter-spacing: -0.01em;',
  },
  {
    id: 'industrial-display',
    label: 'Industrial Display',
    emoji: '🏭',
    heading: 'Big Shoulders Display',
    body: 'Inter',
    impression: 'Architectural, sturdy, modern',
    headingImport: 'Big+Shoulders+Display:wght@500;700;800;900',
    bodyImport: 'Inter:wght@300;400;500;600;700',
    headingFallback: SANS,
    headingStyle: 'text-transform: uppercase; letter-spacing: 0.02em;',
  },
  {
    id: 'extra-condensed-chic',
    label: 'Extra Condensed Chic',
    emoji: '🪶',
    heading: 'Sofia Sans Extra Condensed',
    body: 'Sofia Sans',
    impression: 'Tall, sleek, refined',
    headingImport: 'Sofia+Sans+Extra+Condensed:wght@400;600;800',
    bodyImport: 'Sofia+Sans:wght@300;400;500;600;700',
    headingFallback: SANS,
    headingStyle: 'letter-spacing: 0.01em;',
  },
];

function ensurePreconnect() {
  if (document.querySelector('link[data-admin-font-preconnect]')) return;
  [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ].forEach((href) => {
    const l = document.createElement('link');
    l.rel = 'preconnect';
    l.href = href;
    if (href.includes('gstatic')) l.crossOrigin = 'anonymous';
    l.setAttribute('data-admin-font-preconnect', 'true');
    document.head.appendChild(l);
  });
}

function applyFont(preset) {
  if (!preset) return;

  ensurePreconnect();

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
  const headingFallback = preset.headingFallback || SANS;
  styleTag.textContent = `
    html { font-family: '${preset.body}', ${SANS} !important; }
    h1, h2, h3, h4, h5, h6, .section-title, .section-title-center {
      font-family: '${preset.heading}', ${headingFallback} !important;
      ${preset.headingStyle || ''}
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