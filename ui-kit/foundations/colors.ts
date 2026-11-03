export const colors = {
  // Marca
  primary: '#2563EB',
  primaryLight: '#EFF6FF',
  primaryDark: '#1D4ED8',

  // Fondos
  background: '#F8F9FA',
  surface: '#FFFFFF',
  surfaceSecondary: '#F1F5F9',

  // Texto
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  textInverse: '#FFFFFF',
  textBrand: '#2563EB',

  // Estados
  success: '#16A34A',
  successLight: '#DCFCE7',
  error: '#DC2626',
  errorLight: '#FEE2E2',
  warning: '#D97706',
  warningLight: '#FEF3C7',
  warningBorder: '#F59E0B',

  // Bordes y separadores
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  divider: '#E2E8F0',

  // Tab bar
  tabActive: '#2563EB',
  tabInactive: '#94A3B8',

  // Inputs
  inputBackground: '#F8FAFC',
  inputBorder: '#CBD5E1',
  inputFocusBorder: '#2563EB',
  placeholder: '#94A3B8',

  // Pill / Badge
  pillBackground: '#F1F5F9',
  pillBorder: '#E2E8F0',

  // Varios
  overlay: 'rgba(0, 0, 0, 0.5)',
  transparent: 'transparent',
  black: '#000000',
  white: '#FFFFFF',
} as const;

export type ColorToken = keyof typeof colors;
