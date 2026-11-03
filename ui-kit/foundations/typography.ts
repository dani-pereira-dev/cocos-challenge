import { Platform, TextStyle } from 'react-native';

export const fontFamily = {
  regular: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
  medium: Platform.select({ ios: 'System', android: 'Roboto-Medium', default: 'System' }),
  semibold: Platform.select({ ios: 'System', android: 'Roboto-Medium', default: 'System' }),
  bold: Platform.select({ ios: 'System', android: 'Roboto-Bold', default: 'System' }),
} as const;

export const fontSize = {
  xs: 11,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const lineHeight = {
  xs: 16,
  sm: 18,
  base: 20,
  md: 24,
  lg: 26,
  xl: 28,
  '2xl': 32,
  '3xl': 36,
  '4xl': 40,
} as const;

export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.3,
  wider: 0.5,
} as const;

// Estilos de texto precompuestos (para uso directo en StyleSheet)
export const textStyles = {
  h1: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight['3xl'],
    letterSpacing: letterSpacing.tight,
  } satisfies TextStyle,
  h2: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight['2xl'],
    letterSpacing: letterSpacing.tight,
  } satisfies TextStyle,
  h3: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.xl,
  } satisfies TextStyle,
  bodyLarge: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.md,
  } satisfies TextStyle,
  body: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.base,
  } satisfies TextStyle,
  bodyMedium: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.base,
  } satisfies TextStyle,
  bodySemibold: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.base,
  } satisfies TextStyle,
  caption: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.sm,
  } satisfies TextStyle,
  captionMedium: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.sm,
  } satisfies TextStyle,
  overline: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.xs,
    letterSpacing: letterSpacing.wider,
    textTransform: 'uppercase',
  } satisfies TextStyle,
  // Específicos para fintech
  priceXl: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight['2xl'],
    letterSpacing: letterSpacing.tight,
  } satisfies TextStyle,
  priceLg: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.lg,
  } satisfies TextStyle,
  priceSm: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.base,
  } satisfies TextStyle,
  ticker: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.base,
    letterSpacing: letterSpacing.wide,
  } satisfies TextStyle,
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.sm,
  } satisfies TextStyle,
  button: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.md,
  } satisfies TextStyle,
  buttonSm: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.base,
  } satisfies TextStyle,
} as const;

export type TextStyleToken = keyof typeof textStyles;
export type FontSizeToken = keyof typeof fontSize;
export type FontWeightToken = keyof typeof fontWeight;
