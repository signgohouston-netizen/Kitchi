/**
 * KitchiKitchi brand system — ported from the web app.
 * Green primary #16a34a, orange accent #f97316.
 */
export const Brand = {
  name: 'Kitchi Kitchi',
  shortName: 'KitchiKitchi',
  tagline: 'Homemade Food. Healthy Choices. Local Love.',
  city: 'Houston, TX',

  // Core palette
  primary: '#16a34a',
  primaryDark: '#15803d',
  primaryTint: '#dcfce7',
  accent: '#f97316',
  accentTint: '#ffedd5',

  // Neutrals
  bg: '#ffffff',
  bgMuted: '#f8faf9',
  card: '#ffffff',
  border: '#e8ebe9',
  text: '#111827',
  textMuted: '#6b7280',
  textInverse: '#ffffff',

  // Feedback
  star: '#f59e0b',
  danger: '#dc2626',
} as const;

export const DELIVERY_FEE = 2.99;

export const radius = { sm: 10, md: 14, lg: 20, xl: 28, pill: 999 } as const;
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;
export const shadow = {
  card: {
    shadowColor: '#0f172a',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
} as const;
