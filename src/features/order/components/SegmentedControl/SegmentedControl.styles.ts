import { StyleSheet } from 'react-native';
import { colors } from '@ui-kit/foundations/colors';
import { borderRadius, spacing } from '@ui-kit/foundations/spacing';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSecondary,
    borderRadius: borderRadius.md,
    padding: 3,
    gap: 3,
  },
  compact: {
    borderRadius: borderRadius.sm,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['2'],
    borderRadius: borderRadius.sm,
    borderWidth: 1.5,
    borderColor: colors.transparent,
  },
});
