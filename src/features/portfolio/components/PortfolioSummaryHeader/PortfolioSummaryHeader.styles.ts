import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '@ui-kit';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing['5'],
    paddingTop: spacing['8'],
    paddingBottom: spacing['6'],
  },
  label: {
    color: colors.onDarkSecondary,
    marginBottom: spacing['1'],
  },
  heroAmount: {
    fontSize: 38,
    fontWeight: '700',
    lineHeight: 46,
    letterSpacing: -1,
    color: colors.white,
  },
  cashRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing['3'],
    alignSelf: 'flex-start',
    backgroundColor: colors.onDarkSurface,
    paddingHorizontal: spacing['3'],
    paddingVertical: 6,
    borderRadius: borderRadius.full,
  },
  cashDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.successOnDark,
  },
  cashText: {
    color: colors.onDarkStrong,
  },
  gainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing['2'],
  },
  gainLabel: {
    color: colors.onDarkSecondary,
  },
  gainPositive: {
    color: colors.successOnDark,
    fontWeight: '600',
  },
  gainNegative: {
    color: colors.errorOnDark,
    fontWeight: '600',
  },
  gainNeutral: {
    color: colors.onDarkTertiary,
    fontWeight: '600',
  },
});
