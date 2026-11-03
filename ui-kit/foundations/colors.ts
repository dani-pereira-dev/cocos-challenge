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

  // Overlays
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  overlayDark: 'rgba(0, 0, 0, 0.55)',

  // Sobre fondo oscuro (ej: header con fondo primary)
  onDarkSecondary: 'rgba(255, 255, 255, 0.55)',
  onDarkTertiary: 'rgba(255, 255, 255, 0.7)',
  onDarkSubtle: 'rgba(255, 255, 255, 0.75)',
  onDarkStrong: 'rgba(255, 255, 255, 0.8)',
  onDarkSurface: 'rgba(255, 255, 255, 0.1)',
  onDarkSurfaceSubtle: 'rgba(255, 255, 255, 0.2)',
  successOnDark: '#4ADE80',
  errorOnDark: '#F87171',

  // UI específica
  sell: '#374151',

  transparent: 'transparent',
  black: '#000000',
  white: '#FFFFFF',
} as const;

export type ColorToken = keyof typeof colors;
