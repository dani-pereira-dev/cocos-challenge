import { StyleSheet } from 'react-native';
import { colors } from '@ui-kit/foundations/colors';
import { borderRadius, spacing } from '@ui-kit/foundations/spacing';

export const styles = StyleSheet.create({
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius['2xl'],
    borderTopRightRadius: borderRadius['2xl'],
    paddingHorizontal: spacing['4'],
    paddingBottom: spacing['8'],
    gap: spacing['3'],
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: spacing['3'],
    marginBottom: spacing['2'],
  },
  actionButton: {
    height: 56,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButton: {
    backgroundColor: colors.successLight,
  },
  buyText: {
    color: colors.success,
  },
  sellButton: {
    backgroundColor: colors.errorLight,
  },
  sellText: {
    color: colors.error,
  },
  cancelButton: {
    backgroundColor: colors.surfaceSecondary,
  },
  disabled: {
    opacity: 0.45,
  },
  noPositionHint: {
    color: colors.error,
    fontSize: 11,
    marginTop: 2,
  },
});
