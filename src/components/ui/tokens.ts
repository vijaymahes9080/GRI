/**
 * GRI Design System — Token Definitions
 *
 * Single source of truth for all design decisions.
 * All screens and components must import from here instead of using
 * magic numbers, hard-coded hex values, or ad-hoc Tailwind classes.
 *
 * Alignment Rule: If a spacing/color value appears more than once in
 * the codebase, it must be a token.
 */

// ─── Brand Colors ────────────────────────────────────────────────────────────

export const colors = {
  // Primary — Gandhigram Green (institution's primary identity color)
  primary: '#518214',
  primaryDark: '#3d6110',
  primaryLight: '#6ba31a',
  primarySurface: '#f0f7e6',
  primaryBorder: '#c8e6a0',

  // Secondary — Deep Maroon (heritage, heritage, trust)
  secondary: '#911C03',
  secondaryDark: '#6d1502',
  secondaryLight: '#b52204',
  secondarySurface: '#fdf0ee',

  // Accent — Saffron (energy, notifications, CTAs)
  accent: '#F16236',
  accentDark: '#d14f25',
  accentSurface: '#fff3ef',

  // Neutral
  white: '#FFFFFF',
  black: '#000000',

  // Surface
  surface: '#FFFFFF',
  surfaceElevated: '#F8FAFC',
  surfaceSubtle: '#F1F5F9',

  // Text
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textTertiary: '#94A3B8',
  textDisabled: '#CBD5E1',
  textInverse: '#FFFFFF',
  textLink: '#518214',

  // Border
  border: '#E2E8F0',
  borderStrong: '#CBD5E1',
  borderFocus: '#518214',

  // Status
  success: '#16A34A',
  successLight: '#DCFCE7',
  warning: '#D97706',
  warningLight: '#FEF3C7',
  error: '#DC2626',
  errorLight: '#FEE2E2',
  info: '#2563EB',
  infoLight: '#DBEAFE',

  // Dark mode surfaces (admin panel)
  darkBg: '#020617',
  darkSurface: '#0F172A',
  darkCard: '#1E293B',
  darkBorder: '#334155',
  darkText: '#F1F5F9',
  darkTextMuted: '#64748B',

  // Priority badges
  urgentBg: '#FEE2E2',
  urgentText: '#991B1B',
  importantBg: '#FEF3C7',
  importantText: '#92400E',
  normalBg: '#DBEAFE',
  normalText: '#1E40AF',

  // Category colors
  examColor: '#7C3AED',
  academicColor: '#0891B2',
  admissionColor: '#059669',
  adminColor: '#D97706',
  careerColor: '#DB2777',

  // Transparent overlays
  overlay20: 'rgba(0,0,0,0.20)',
  overlay40: 'rgba(0,0,0,0.40)',
  overlay60: 'rgba(0,0,0,0.60)',
  overlay80: 'rgba(0,0,0,0.80)',
  white10: 'rgba(255,255,255,0.10)',
  white15: 'rgba(255,255,255,0.15)',
  white20: 'rgba(255,255,255,0.20)',
} as const;

// ─── Spacing ─────────────────────────────────────────────────────────────────
// 4px base grid. Never use arbitrary numbers outside this scale.

export const spacing = {
  0: 0,
  px: 1,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,

  // Named aliases for readability
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,

  // Layout constants
  screenPaddingH: 16,       // Horizontal padding for screen content
  screenPaddingTop: 12,     // Top padding inside tab screens
  cardPadding: 16,          // Standard card internal padding
  sectionGap: 24,           // Gap between page sections
  itemGap: 12,              // Gap between list items
  iconContainerSize: 44,    // Minimum tappable area for icon buttons
} as const;

// ─── Border Radii ─────────────────────────────────────────────────────────────

export const radii = {
  none: 0,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  '2xl': 24,
  '3xl': 32,
  full: 9999,

  // Component-specific
  card: 16,
  button: 12,
  badge: 9999,
  input: 12,
  chip: 9999,
  modal: 24,
  avatar: 9999,
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────
// Font sizes in sp (scale-independent pixels)

export const fontSizes = {
  '2xs': 10,
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
} as const;

export const fontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
  black: '900' as const,
};

export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.6,
} as const;

// Semantic typography roles
export const typography = {
  display: { fontSize: fontSizes['3xl'], fontWeight: fontWeights.black, lineHeight: fontSizes['3xl'] * lineHeights.tight },
  heading: { fontSize: fontSizes['2xl'], fontWeight: fontWeights.bold, lineHeight: fontSizes['2xl'] * lineHeights.tight },
  title: { fontSize: fontSizes.xl, fontWeight: fontWeights.bold, lineHeight: fontSizes.xl * lineHeights.normal },
  titleSm: { fontSize: fontSizes.lg, fontWeight: fontWeights.bold, lineHeight: fontSizes.lg * lineHeights.normal },
  body: { fontSize: fontSizes.base, fontWeight: fontWeights.regular, lineHeight: fontSizes.base * lineHeights.normal },
  bodySm: { fontSize: fontSizes.sm, fontWeight: fontWeights.regular, lineHeight: fontSizes.sm * lineHeights.relaxed },
  label: { fontSize: fontSizes.sm, fontWeight: fontWeights.semibold, lineHeight: fontSizes.sm * lineHeights.normal },
  labelSm: { fontSize: fontSizes.xs, fontWeight: fontWeights.semibold, lineHeight: fontSizes.xs * lineHeights.normal },
  caption: { fontSize: fontSizes.xs, fontWeight: fontWeights.regular, lineHeight: fontSizes.xs * lineHeights.relaxed },
  captionSm: { fontSize: fontSizes['2xs'], fontWeight: fontWeights.regular, lineHeight: fontSizes['2xs'] * lineHeights.relaxed },
  button: { fontSize: fontSizes.sm, fontWeight: fontWeights.bold, lineHeight: fontSizes.sm * lineHeights.normal },
  buttonLg: { fontSize: fontSizes.base, fontWeight: fontWeights.bold, lineHeight: fontSizes.base * lineHeights.normal },
  overline: { fontSize: fontSizes['2xs'], fontWeight: fontWeights.bold, letterSpacing: 1.5 },
} as const;

// ─── Shadows ──────────────────────────────────────────────────────────────────

export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 8,
  },
  card: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
} as const;

// ─── Z-Index ──────────────────────────────────────────────────────────────────

export const zIndex = {
  base: 0,
  card: 10,
  sticky: 100,
  overlay: 200,
  modal: 300,
  toast: 400,
} as const;

// ─── Animation ────────────────────────────────────────────────────────────────

export const animation = {
  fast: 150,
  normal: 250,
  slow: 400,
} as const;

// ─── Icon sizes ───────────────────────────────────────────────────────────────

export const iconSizes = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  '2xl': 36,
  '3xl': 48,
} as const;
