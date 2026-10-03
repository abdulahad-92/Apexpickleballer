'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Users,
  Trophy,
  MapPin,
  Calendar,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
  Award,
  Target,
  Zap,
  Activity,
  Eye,
  CheckCircle2
} from 'lucide-react';
import styles from './LightThemeShowcase.module.css';

type ThemeCategory = 'all' | 'sport' | 'studio';

type ThemeKey =
  | 'courtBlue'
  | 'opticVolt'
  | 'championship'
  | 'desertClay'
  | 'sunsetOrange'
  | 'pacificCyan'
  | 'ivory'
  | 'arctic'
  | 'stone'
  | 'ocean'
  | 'sage';

export interface ThemeTokens {
  bg: string;
  surface: string;
  elevated: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  accentText: string;
  highlight: string;
  border: string;
  borderHover: string;
  cardShadow: string;
  cardShadowHover: string;
}

interface ThemeDefinition {
  key: ThemeKey;
  name: string;
  category: 'sport' | 'studio';
  badge: string;
  courtVibe: string;
  desc: string;
  swatches: string[];
  tokens: ThemeTokens;
}

const THEMES: ThemeDefinition[] = [
  // ─── SPORT & EVENT PALETTES ───
  {
    key: 'courtBlue',
    name: 'Court Blue & Chalk',
    category: 'sport',
    badge: '🎾 Court Surface',
    courtVibe: 'PPA Pro Tour dual-tone blue court + chalk sidelines + tournament navy',
    desc: 'Dual-tone royal court blue + chalk sidelines — PPA & MLP championship courts',
    swatches: ['#f4f7fb', '#1958c7', '#0c192c', '#059669'],
    tokens: {
      bg: '#f4f7fb',
      surface: '#eaf0f8',
      elevated: '#dbe6f4',
      text: '#0c192c',
      textSecondary: '#435875',
      textMuted: '#7e94b2',
      accent: '#1958c7',
      accentHover: '#13459c',
      accentText: '#ffffff',
      highlight: '#1958c7',
      border: 'rgba(25, 88, 199, 0.12)',
      borderHover: 'rgba(25, 88, 199, 0.28)',
      cardShadow: '0 2px 16px rgba(12, 25, 44, 0.05)',
      cardShadowHover: '0 8px 32px rgba(25, 88, 199, 0.12)',
    },
  },
  {
    key: 'opticVolt',
    name: 'Optic Volt & Carbon',
    category: 'sport',
    badge: '🟡 Official Ball',
    courtVibe: 'Dura Fast 40 / Franklin X-40 neon optic yellow ball + raw carbon paddle',
    desc: 'Electric optic-yellow tournament ball on stealth carbon black & court white',
    swatches: ['#f8faf8', '#111813', '#6e9400', '#eff5eb'],
    tokens: {
      bg: '#f8faf8',
      surface: '#eef3ee',
      elevated: '#dfe8de',
      text: '#111813',
      textSecondary: '#4a594d',
      textMuted: '#88988b',
      accent: '#111813',
      accentHover: '#212e24',
      accentText: '#e2f952',
      highlight: '#6e9400',
      border: 'rgba(17, 24, 19, 0.09)',
      borderHover: 'rgba(110, 148, 0, 0.35)',
      cardShadow: '0 2px 14px rgba(17, 24, 19, 0.05)',
      cardShadowHover: '0 8px 30px rgba(17, 24, 19, 0.10)',
    },
  },
  {
    key: 'championship',
    name: 'Championship Emerald',
    category: 'sport',
    badge: '🏆 US Open & Grand Slam',
    courtVibe: 'US Open Naples, FL lawn courts + tournament trophy gold + country club white',
    desc: 'Lush court green + champion trophy gold — US Open & prestigious country clubs',
    swatches: ['#f5f9f6', '#1b5e28', '#b48316', '#0e2315'],
    tokens: {
      bg: '#f5f9f6',
      surface: '#eaf3ec',
      elevated: '#dbe9de',
      text: '#0e2315',
      textSecondary: '#3e5b45',
      textMuted: '#7b9982',
      accent: '#1b5e28',
      accentHover: '#13461e',
      accentText: '#ffffff',
      highlight: '#b48316',
      border: 'rgba(27, 94, 40, 0.10)',
      borderHover: 'rgba(27, 94, 40, 0.25)',
      cardShadow: '0 2px 14px rgba(14, 35, 21, 0.05)',
      cardShadowHover: '0 8px 30px rgba(27, 94, 40, 0.12)',
    },
  },
  {
    key: 'desertClay',
    name: 'Desert Clay & Sun',
    category: 'sport',
    badge: '🏜️ Desert Open Court',
    courtVibe: 'Indian Wells Tennis Garden & Palm Desert terracotta courts + sunlit sandstone',
    desc: 'Sunbaked terracotta clay court + warm desert limestone sidelines',
    swatches: ['#fbf7f2', '#b85429', '#2d1c13', '#e8dcd0'],
    tokens: {
      bg: '#fbf7f2',
      surface: '#f4ece1',
      elevated: '#e8dbcd',
      text: '#2d1c13',
      textSecondary: '#705849',
      textMuted: '#aa9384',
      accent: '#b85429',
      accentHover: '#963f1a',
      accentText: '#ffffff',
      highlight: '#b85429',
      border: 'rgba(45, 28, 19, 0.10)',
      borderHover: 'rgba(184, 84, 41, 0.30)',
      cardShadow: '0 2px 14px rgba(45, 28, 19, 0.05)',
      cardShadowHover: '0 8px 30px rgba(184, 84, 41, 0.12)',
    },
  },
  {
    key: 'sunsetOrange',
    name: 'Sunset Ball & Dusk',
    category: 'sport',
    badge: '🌅 Outdoor Ball / Twilight',
    courtVibe: 'High-visibility outdoor orange ball + twilight stadium exhibition match energy',
    desc: 'High-vis blaze orange ball + twilight stadium ink — evening match sessions',
    swatches: ['#faf7f5', '#dc5819', '#221915', '#ebded6'],
    tokens: {
      bg: '#faf7f5',
      surface: '#f4ece7',
      elevated: '#e8dcd5',
      text: '#221915',
      textSecondary: '#68574e',
      textMuted: '#a39087',
      accent: '#dc5819',
      accentHover: '#b8440e',
      accentText: '#ffffff',
      highlight: '#dc5819',
      border: 'rgba(34, 25, 21, 0.09)',
      borderHover: 'rgba(220, 88, 25, 0.32)',
      cardShadow: '0 2px 14px rgba(34, 25, 21, 0.05)',
      cardShadowHover: '0 8px 30px rgba(220, 88, 25, 0.12)',
    },
  },
  {
    key: 'pacificCyan',
    name: 'Pacific Cyan & Navy',
    category: 'sport',
    badge: '🌊 Coastal PPA Court',
    courtVibe: 'Newport Beach & San Clemente oceanfront two-tone cyan-teal courts',
    desc: 'Bright Pacific cyan court playing zone + deep ocean navy border',
    swatches: ['#f2f8f9', '#0d8194', '#0a1d24', '#d2e6ea'],
    tokens: {
      bg: '#f2f8f9',
      surface: '#e5f1f3',
      elevated: '#d3e5e8',
      text: '#0a1d24',
      textSecondary: '#3e5f68',
      textMuted: '#7c9ca5',
      accent: '#0d8194',
      accentHover: '#086574',
      accentText: '#ffffff',
      highlight: '#0d8194',
      border: 'rgba(13, 129, 148, 0.12)',
      borderHover: 'rgba(13, 129, 148, 0.28)',
      cardShadow: '0 2px 14px rgba(10, 29, 36, 0.05)',
      cardShadowHover: '0 8px 30px rgba(13, 129, 148, 0.12)',
    },
  },

  // ─── MINIMALIST STUDIO PALETTES ───
  {
    key: 'ivory',
    name: 'Ivory Studio',
    category: 'studio',
    badge: '🏛️ Luxury Studio',
    courtVibe: 'Warm cream + espresso + muted gold — Aesop & luxury interiors aesthetic',
    desc: 'Warm cream + espresso + muted gold — editorial & boutique luxury',
    swatches: ['#faf7f2', '#f2ede5', '#2c2520', '#c8a96e'],
    tokens: {
      bg: '#faf7f2',
      surface: '#f2ede5',
      elevated: '#e9e2d7',
      text: '#2c2520',
      textSecondary: '#7a6e62',
      textMuted: '#b5a899',
      accent: '#2c2520',
      accentHover: '#44392f',
      accentText: '#faf7f2',
      highlight: '#c8a96e',
      border: 'rgba(44, 37, 32, 0.10)',
      borderHover: 'rgba(44, 37, 32, 0.22)',
      cardShadow: '0 2px 16px rgba(44, 37, 32, 0.06)',
      cardShadowHover: '0 8px 32px rgba(44, 37, 32, 0.10)',
    },
  },
  {
    key: 'arctic',
    name: 'Arctic Slate',
    category: 'studio',
    badge: '⚡ Tech Minimalist',
    courtVibe: 'Pure white + charcoal + system blue — Apple / Vercel modern precision',
    desc: 'Pure white + charcoal + system blue — Apple, Vercel & Linear clarity',
    swatches: ['#ffffff', '#f5f5f7', '#1d1d1f', '#0071e3'],
    tokens: {
      bg: '#ffffff',
      surface: '#f5f5f7',
      elevated: '#ebebed',
      text: '#1d1d1f',
      textSecondary: '#6e6e73',
      textMuted: '#aeaeb2',
      accent: '#1d1d1f',
      accentHover: '#3a3a3c',
      accentText: '#ffffff',
      highlight: '#0071e3',
      border: 'rgba(0, 0, 0, 0.08)',
      borderHover: 'rgba(0, 0, 0, 0.16)',
      cardShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
      cardShadowHover: '0 8px 28px rgba(0, 0, 0, 0.09)',
    },
  },
  {
    key: 'stone',
    name: 'Warm Stone',
    category: 'studio',
    badge: '🏔️ Resort Club',
    courtVibe: 'Sand + terracotta + deep brown — Rapha & premium athletic resort aesthetic',
    desc: 'Sand + terracotta + deep brown — Rapha & premium resort clubhouse',
    swatches: ['#f4f0eb', '#ebe5dc', '#332b24', '#a16a4a'],
    tokens: {
      bg: '#f4f0eb',
      surface: '#ebe5dc',
      elevated: '#ddd5c9',
      text: '#332b24',
      textSecondary: '#7d7069',
      textMuted: '#b0a49a',
      accent: '#a16a4a',
      accentHover: '#8b5a3d',
      accentText: '#ffffff',
      highlight: '#a16a4a',
      border: 'rgba(51, 43, 36, 0.09)',
      borderHover: 'rgba(51, 43, 36, 0.18)',
      cardShadow: '0 2px 14px rgba(51, 43, 36, 0.06)',
      cardShadowHover: '0 8px 30px rgba(51, 43, 36, 0.10)',
    },
  },
  {
    key: 'ocean',
    name: 'Ocean Breeze',
    category: 'studio',
    badge: '💧 Clean Slate',
    courtVibe: 'Pale blue-gray + navy + teal — Notion / Stripe light modern architecture',
    desc: 'Pale blue-gray + navy + teal — Notion / Stripe light & clean modern SaaS',
    swatches: ['#f7f9fc', '#eef1f6', '#1a2333', '#2a7ae9'],
    tokens: {
      bg: '#f7f9fc',
      surface: '#eef1f6',
      elevated: '#e2e7ef',
      text: '#1a2333',
      textSecondary: '#5a6780',
      textMuted: '#9ba5b7',
      accent: '#1a2333',
      accentHover: '#2c3a50',
      accentText: '#ffffff',
      highlight: '#2a7ae9',
      border: 'rgba(26, 35, 51, 0.08)',
      borderHover: 'rgba(26, 35, 51, 0.16)',
      cardShadow: '0 2px 14px rgba(26, 35, 51, 0.05)',
      cardShadowHover: '0 8px 28px rgba(26, 35, 51, 0.09)',
    },
  },
  {
    key: 'sage',
    name: 'Sage Garden',
    category: 'studio',
    badge: '🌿 Wellness Club',
    courtVibe: 'Off-white green + olive + forest — Equinox light & wellness athletic retreat',
    desc: 'Off-white green + olive + forest — Equinox light & wellness athletic retreat',
    swatches: ['#f5f6f1', '#eaece4', '#2a2e26', '#4a5e3c'],
    tokens: {
      bg: '#f5f6f1',
      surface: '#eaece4',
      elevated: '#dde0d5',
      text: '#2a2e26',
      textSecondary: '#636b58',
      textMuted: '#a0a693',
      accent: '#4a5e3c',
      accentHover: '#3b4d30',
      accentText: '#ffffff',
      highlight: '#4a5e3c',
      border: 'rgba(42, 46, 38, 0.08)',
      borderHover: 'rgba(42, 46, 38, 0.16)',
      cardShadow: '0 2px 14px rgba(42, 46, 38, 0.05)',
      cardShadowHover: '0 8px 28px rgba(42, 46, 38, 0.09)',
    },
  },
];

const THEME_CLASS_MAP: Record<ThemeKey, string> = {
  courtBlue: styles.themeCourtBlue,
  opticVolt: styles.themeOpticVolt,
  championship: styles.themeChampionship,
  desertClay: styles.themeDesertClay,
  sunsetOrange: styles.themeSunsetOrange,
  pacificCyan: styles.themePacificCyan,
  ivory: styles.themeIvory,
  arctic: styles.themeArctic,
  stone: styles.themeStone,
  ocean: styles.themeOcean,
  sage: styles.themeSage,
};

// Data
const camps = [
  {
    id: 'c1', title: 'Intermediate Breakthrough Camp', city: 'Scottsdale', stateCode: 'AZ',
    date: 'Sat, Oct 11, 2025', time: '9 AM – 1 PM', venue: 'Scottsdale Sports Complex',
    level: 'Intermediate', price: 249, seatsLeft: 2,
  },
  {
    id: 'c2', title: "Women's Competitive Strategy", city: 'Austin', stateCode: 'TX',
    date: 'Sat, Oct 18, 2025', time: '12 PM – 4 PM', venue: 'Austin Racquet Club',
    level: "Women's Only", price: 269, seatsLeft: 3,
  },
  {
    id: 'c3', title: 'Beginner Fundamental Foundations', city: 'San Diego', stateCode: 'CA',
    date: 'Sat, Oct 25, 2025', time: '9 AM – 1 PM', venue: 'Bobby Riggs Racket Club',
    level: 'Beginner', price: 199, seatsLeft: 5,
  },
];

const testimonials = [
  {
    initials: 'BM', name: 'Barbara M.', city: 'Scottsdale, AZ',
    gain: '2.5 → 3.5 in 6 Weeks',
    quote: 'The coach spotted my backhand roll error in 10 minutes. 6 weeks later I took Gold in my first 3.5 bracket.',
  },
  {
    initials: 'TR', name: 'Tom R.', city: 'Austin, TX',
    gain: '3.0 → 3.8 Tournament Medalist',
    quote: 'The 8:1 ratio is real. Every single drop shot was scrutinized and perfected. This isn\'t a 40-person clinic.',
  },
  {
    initials: 'LK', name: 'Linda K.', city: 'San Diego, CA',
    gain: 'Kitchen Win Rate +40%',
    quote: 'The transition zone drills alone changed how I see every single point. Highest energy athletic weekend.',
  },
];

const faqs = [
  {
    q: 'How does the 100% Breakthrough Guarantee work?',
    a: 'If you attend the full 4 hours and don\'t feel a measurable breakthrough, notify your coach before leaving for a full, hassle-free refund.'
  },
  {
    q: 'What skill level should I select?',
    a: 'Beginner (2.0–3.0) if you\'re still building consistency. Intermediate (3.0–4.0+) if you play regular rec and want tournament-level mechanics.'
  },
  {
    q: 'What is the player-to-coach ratio?',
    a: 'Strict 8:1 maximum. Each camp is capped at 8 players per court/coach for dedicated, hands-on feedback on every drill.'
  },
  {
    q: 'What happens if there is rain?',
    a: 'All outdoor locations have guaranteed indoor backup venues. In the rare event of postponement, reschedule to any date or claim a full refund.'
  },
];

export default function LightThemeShowcase() {
  const [theme, setTheme] = useState<ThemeKey>('courtBlue');
  const [categoryFilter, setCategoryFilter] = useState<ThemeCategory>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const currentTheme = THEMES.find(t => t.key === theme) || THEMES[0];

  const sportThemes = THEMES.filter(t => t.category === 'sport');
  const studioThemes = THEMES.filter(t => t.category === 'studio');

  const visibleThemes = THEMES.filter(t => {
    if (categoryFilter === 'all') return true;
    return t.category === categoryFilter;
  });

  return (
    <div
      className={`${styles.showcase} ${THEME_CLASS_MAP[theme] || ''}`}
      style={{
        '--lt-bg': currentTheme.tokens.bg,
        '--lt-surface': currentTheme.tokens.surface,
        '--lt-elevated': currentTheme.tokens.elevated,
        '--lt-text': currentTheme.tokens.text,
        '--lt-text-secondary': currentTheme.tokens.textSecondary,
        '--lt-text-muted': currentTheme.tokens.textMuted,
        '--lt-accent': currentTheme.tokens.accent,
        '--lt-accent-hover': currentTheme.tokens.accentHover,
        '--lt-accent-text': currentTheme.tokens.accentText,
        '--lt-highlight': currentTheme.tokens.highlight,
        '--lt-border': currentTheme.tokens.border,
        '--lt-border-hover': currentTheme.tokens.borderHover,
        '--lt-card-shadow': currentTheme.tokens.cardShadow,
        '--lt-card-shadow-hover': currentTheme.tokens.cardShadowHover,
        backgroundColor: currentTheme.tokens.bg,
        color: currentTheme.tokens.text,
      } as React.CSSProperties}
    >
      {/* ─── STICKY CONTROL BAR ─── */}
      <div
        className={styles.controlBar}
        style={{
          backgroundColor: currentTheme.tokens.bg,
          borderColor: currentTheme.tokens.border,
        }}
      >
        <div className={styles.controlInner}>
          <div className={styles.controlLeft}>
            <div className={styles.controlBrandBlock}>
              <div className={styles.controlLabel}>Color Palette Studio</div>
              <div className={styles.controlBrand}>Apex Pickleball — Theme Engine</div>
            </div>

            {/* Category Filter Pills */}
            <div className={styles.categoryPills}>
              <button
                type="button"
                className={`${styles.categoryPill} ${categoryFilter === 'all' ? styles.categoryPillActive : ''}`}
                onClick={() => setCategoryFilter('all')}
              >
                All (11)
              </button>
              <button
                type="button"
                className={`${styles.categoryPill} ${categoryFilter === 'sport' ? styles.categoryPillActive : ''}`}
                onClick={() => setCategoryFilter('sport')}
              >
                🎾 Courts & Balls (6)
              </button>
              <button
                type="button"
                className={`${styles.categoryPill} ${categoryFilter === 'studio' ? styles.categoryPillActive : ''}`}
                onClick={() => setCategoryFilter('studio')}
              >
                ✨ Luxury Studio (5)
              </button>
            </div>
          </div>

          <div className={styles.themeDropdown}>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as ThemeKey)}
              className={styles.dropdownSelect}
              style={{
                backgroundColor: currentTheme.tokens.surface,
                color: currentTheme.tokens.text,
                borderColor: currentTheme.tokens.border,
              }}
            >
              {categoryFilter === 'all' ? (
                <>
                  <optgroup label="🎾 Courts, Balls & Events (Sport DNA)">
                    {sportThemes.map(t => (
                      <option key={t.key} value={t.key}>
                        {t.name} — {t.desc.split(' — ')[1] || t.desc}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="✨ Minimalist Studio Palettes">
                    {studioThemes.map(t => (
                      <option key={t.key} value={t.key}>
                        {t.name} — {t.desc.split(' — ')[1] || t.desc}
                      </option>
                    ))}
                  </optgroup>
                </>
              ) : (
                visibleThemes.map(t => (
                  <option key={t.key} value={t.key}>
                    {t.name} — {t.desc.split(' — ')[1] || t.desc}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Quick Theme Switcher Pill Buttons */}
        <div className={styles.themeButtonsStrip}>
          <div className={styles.themeButtonsGroup}>
            <span className={styles.themeButtonsGroupLabel}>Courts & Balls:</span>
            {sportThemes.map(t => {
              const isSelected = t.key === theme;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTheme(t.key)}
                  className={`${styles.themePillBtn} ${isSelected ? styles.themePillBtnActive : ''}`}
                  style={{
                    borderColor: isSelected ? t.tokens.highlight : currentTheme.tokens.border,
                    backgroundColor: isSelected ? t.tokens.surface : currentTheme.tokens.surface,
                    color: currentTheme.tokens.text,
                  }}
                >
                  <span
                    className={styles.themePillDot}
                    style={{ background: t.tokens.accent }}
                  />
                  <span className={styles.themePillName}>{t.name}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.themeButtonsGroup}>
            <span className={styles.themeButtonsGroupLabel}>Luxury Studio:</span>
            {studioThemes.map(t => {
              const isSelected = t.key === theme;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTheme(t.key)}
                  className={`${styles.themePillBtn} ${isSelected ? styles.themePillBtnActive : ''}`}
                  style={{
                    borderColor: isSelected ? t.tokens.highlight : currentTheme.tokens.border,
                    backgroundColor: isSelected ? t.tokens.surface : currentTheme.tokens.surface,
                    color: currentTheme.tokens.text,
                  }}
                >
                  <span
                    className={styles.themePillDot}
                    style={{ background: t.tokens.accent }}
                  />
                  <span className={styles.themePillName}>{t.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sub-bar: Real-world Vibe & Live Hex Chips */}
        <div className={styles.vibeBar}>
          <div className={styles.vibeMeta}>
            <span className={styles.vibeTag}>{currentTheme.badge}</span>
            <span className={styles.vibeDesc}>{currentTheme.courtVibe}</span>
          </div>

          <div className={styles.swatchGroup}>
            {currentTheme.swatches.map((color, i) => (
              <span key={i} className={styles.swatchChip} title={`Token ${i + 1}: ${color}`}>
                <span className={styles.swatchDot} style={{ background: color }} />
                {color}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── HERO ─── */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>
          AMERICA&apos;S MOST DISCIPLINED PICKLEBALL INTENSIVE
        </div>

        <h1 className={styles.heroTitle}>
          THE BREAKTHROUGH.<br />
          <span className={styles.heroTitleAccent}>IN ONE FOCUSED MORNING.</span>
        </h1>

        <p className={styles.heroSub}>
          No crowded clinics. No random dinking. An elite 4-hour coaching architecture
          engineered to rebuild your mechanics, master the transition zone, and unlock
          tournament-level confidence.
        </p>

        <button className={styles.heroCta}>
          <span>Find A Camp Near You</span>
          <ArrowRight size={16} />
        </button>

        <div className={styles.heroTrust}>
          <span><Star size={14} /> <strong>4.98 / 5.0</strong> (2,400+ Alumni)</span>
          <span><Users size={14} /> <strong>8:1</strong> Ratio</span>
          <span><ShieldCheck size={14} /> <strong>100%</strong> Guarantee</span>
        </div>
      </section>

      {/* ─── AUTHORITY RIBBON ─── */}
      <section className={styles.ribbon}>
        <div className={styles.ribbonInner}>
          <div className={styles.ribbonStat}>
            <span className={styles.ribbonVal}>35+</span>
            <span className={styles.ribbonLabel}>US States On Tour</span>
          </div>
          <div className={styles.ribbonDiv} />
          <div className={styles.ribbonStat}>
            <span className={styles.ribbonVal}>8 : 1</span>
            <span className={styles.ribbonLabel}>Max Player-To-Coach</span>
          </div>
          <div className={styles.ribbonDiv} />
          <div className={styles.ribbonStat}>
            <span className={styles.ribbonVal}>14,000+</span>
            <span className={styles.ribbonLabel}>Alumni Transformed</span>
          </div>
          <div className={styles.ribbonDiv} />
          <div className={styles.ribbonStat}>
            <span className={styles.ribbonVal}>PPR</span>
            <span className={styles.ribbonLabel}>Certified Coaches</span>
          </div>
          <div className={styles.ribbonDiv} />
          <div className={styles.ribbonStat}>
            <span className={styles.ribbonVal}>100%</span>
            <span className={styles.ribbonLabel}>Guarantee</span>
          </div>
        </div>
      </section>

      {/* ─── BENTO FEATURES ─── */}
      <section className={styles.sectionWrap}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>THE BREAKTHROUGH ARCHITECTURE</div>
          <h2 className={styles.sectionTitle}>THE 4-HOUR SYSTEM.</h2>
          <p className={styles.sectionDesc}>
            Most clinics waste 3 hours on unstructured games. We designed a four-phase
            biomechanical blueprint where every minute has a targeted purpose.
          </p>
        </div>

        <div className={styles.bentoGrid}>
          <div className={`${styles.bentoCard} ${styles.bentoCardWide}`}>
            <div className={styles.bentoIcon}><Users size={20} /></div>
            <div className={styles.bentoLabel}>PILLAR 01 · PROPRIETARY METHOD</div>
            <h3 className={styles.bentoCardTitle}>Strict 8:1 Player-to-Coach Ratio & Video Diagnostics</h3>
            <p className={styles.bentoCardText}>
              You never get lost in a crowd. With exactly 8 players per court, your coach
              analyzes your contact point, body angle, and paddle trajectory after every drill.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className={styles.bentoStat}><Users size={14} /> 8 Players Max</span>
              <span className={styles.bentoStat}><Eye size={14} /> Personal Video Replay</span>
              <span className={styles.bentoStat}><Award size={14} /> PPR Certified Staff</span>
            </div>
          </div>

          <div className={styles.bentoCard}>
            <div className={styles.bentoIcon}><Target size={20} /></div>
            <div className={styles.bentoLabel}>PILLAR 02 · TRANSITION</div>
            <h3 className={styles.bentoCardTitle}>Transition Zone & Soft Hands</h3>
            <p className={styles.bentoCardText}>
              Learn how to absorb 60mph drives and reset them dead into the kitchen
              with dynamic split-step footwork.
            </p>
          </div>

          <div className={styles.bentoCard}>
            <div className={styles.bentoIcon}><Activity size={20} /></div>
            <div className={styles.bentoLabel}>PILLAR 03 · TACTICAL IQ</div>
            <h3 className={styles.bentoCardTitle}>Kitchen Dominance & Speedup Defense</h3>
            <p className={styles.bentoCardText}>
              Turn defensive scrambling into aggressive kitchen positioning with precise
              footwork triggers and roll volleys.
            </p>
          </div>

          <div className={styles.bentoCard}>
            <div className={styles.bentoIcon}><ShieldCheck size={20} /></div>
            <div className={styles.bentoLabel}>PILLAR 04 · ZERO RISK</div>
            <h3 className={styles.bentoCardTitle}>100% Breakthrough Guarantee</h3>
            <p className={styles.bentoCardText}>
              If you don&apos;t feel a decisive breakthrough in shot mechanics and confidence,
              we refund 100% of your fee on site.
            </p>
          </div>

          <div className={styles.bentoCard}>
            <div className={styles.bentoIcon}><Zap size={20} /></div>
            <div className={styles.bentoLabel}>PILLAR 05 · HIGH PRESSURE</div>
            <h3 className={styles.bentoCardTitle}>Tournament Simulation & Live Playback</h3>
            <p className={styles.bentoCardText}>
              9-9 match scenarios with active coach intervention. Side-by-side comparison
              with your Hour 1 footage.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CAMP CARDS ─── */}
      <section className={styles.sectionWrapAlt}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>UPCOMING BOOTCAMPS</div>
          <h2 className={styles.sectionTitle}>SELECT YOUR EXPERIENCE.</h2>
          <p className={styles.sectionDesc}>
            Reserve your court before spots fill. Every intensive is capped at 8 seats.
          </p>
        </div>

        <div className={styles.campGrid}>
          {camps.map(camp => (
            <div key={camp.id} className={styles.campCard}>
              <div className={styles.campTags}>
                <span className={styles.campTag}>{camp.stateCode}</span>
                <span className={`${styles.campTag} ${camp.level === "Women's Only" ? styles.campTagAccent : ''}`}>
                  {camp.level}
                </span>
                {camp.seatsLeft <= 3 && (
                  <span className={styles.campTag}>Only {camp.seatsLeft} left</span>
                )}
              </div>

              <h4 className={styles.campTitle}>{camp.title}</h4>

              <div className={styles.campMeta}>
                <div className={styles.campMetaRow}><Calendar size={14} /> {camp.date}</div>
                <div className={styles.campMetaRow}><Clock size={14} /> {camp.time}</div>
                <div className={styles.campMetaRow}><MapPin size={14} /> {camp.city}, {camp.stateCode} · {camp.venue}</div>
              </div>

              <div className={styles.campFooter}>
                <div>
                  <div className={styles.campPrice}>${camp.price}</div>
                  <div className={styles.campPriceSub}>All-Inclusive · Guaranteed</div>
                </div>
                <button className={styles.campBtn}>
                  Reserve Seat <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className={styles.sectionWrap}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>VERIFIED PROOF</div>
          <h2 className={styles.sectionTitle}>REAL PLAYERS. REAL RESULTS.</h2>
          <p className={styles.sectionDesc}>
            Typical outcomes from players who completed our 4-hour curriculum.
          </p>
        </div>

        <div className={styles.testimonialGrid}>
          {testimonials.map((t, idx) => (
            <div key={idx} className={styles.testimonialCard}>
              <div className={styles.testimonialTop}>
                <div className={styles.testimonialAvatar}>{t.initials}</div>
                <div>
                  <div className={styles.testimonialName}>{t.name}</div>
                  <div className={styles.testimonialCity}>{t.city}</div>
                </div>
              </div>
              <div className={styles.testimonialStars}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className={styles.testimonialQuote}>&ldquo;{t.quote}&rdquo;</p>
              <span className={styles.testimonialGain}>{t.gain}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className={styles.sectionWrapAlt}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>COMMON QUESTIONS</div>
          <h2 className={styles.sectionTitle}>TRANSPARENCY & POLICIES.</h2>
          <p className={styles.sectionDesc}>Everything you need to know before stepping onto the court.</p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`${styles.faqItem} ${openFaq === idx ? styles.faqItemOpen : ''}`}
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <div className={styles.faqHead}>
                <span className={styles.faqQ}>{faq.q}</span>
                <span className={styles.faqChevron}>
                  {openFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </div>
              {openFaq === idx && (
                <div className={styles.faqBody}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className={styles.finalCta}>
        <div className={styles.finalCtaCard}>
          <div className={styles.sectionTag}>LIMITED SEATS REMAINING</div>
          <h2 className={styles.finalCtaTitle}>YOUR BREAKTHROUGH STARTS HERE.</h2>
          <p className={styles.finalCtaDesc}>
            Capped at 8 players per court. Backed by our 100% money-back satisfaction guarantee.
          </p>
          <button className={styles.finalCtaBtn}>
            Find A Camp In Your State <ArrowRight size={16} />
          </button>
          <div className={styles.finalCtaNote}>
            <ShieldCheck size={14} />
            <span>Zero-risk registration · Instant refund if not 100% satisfied</span>
          </div>
        </div>
      </section>
    </div>
  );
}
