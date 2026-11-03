import { StyleSheet } from 'react-native';
import { colors, spacing } from '@ui-kit';

export const boundaryStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing['6'],
    gap: spacing['3'],
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  detail: {
    fontSize: 12,
    color: colors.error,
    textAlign: 'center',
  },
  button: {
    marginTop: spacing['2'],
    paddingHorizontal: spacing['5'],
    paddingVertical: spacing['3'],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
});
