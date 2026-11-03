import { StyleSheet } from 'react-native';
import { borderRadius, colors, spacing } from '@ui-kit';

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
