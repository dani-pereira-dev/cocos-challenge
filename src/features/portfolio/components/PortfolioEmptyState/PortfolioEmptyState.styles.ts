import { StyleSheet } from 'react-native';
import { borderRadius, colors, spacing } from '@ui-kit';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['8'],
    gap: spacing['4'],
  },
  iconWrapper: {
    width: 88,
    height: 88,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing['2'],
  },
  title: {
    color: colors.textPrimary,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 22,
  },
  link: {
    color: colors.primary,
    fontWeight: '600',
  },
});
