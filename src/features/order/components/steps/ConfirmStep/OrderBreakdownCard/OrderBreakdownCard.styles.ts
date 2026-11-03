import { StyleSheet } from 'react-native';
import { borderRadius, colors, spacing } from '@ui-kit';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing['4'],
    paddingVertical: spacing['2'],
    gap: spacing['3'],
    paddingBottom: spacing['4'],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing['2'],
  },
  label: {
    flex: 1,
    marginRight: spacing['2'],
  },
  value: {
    flexShrink: 1,
    textAlign: 'right',
  },
  deduction: {
    color: colors.error,
  },
});
