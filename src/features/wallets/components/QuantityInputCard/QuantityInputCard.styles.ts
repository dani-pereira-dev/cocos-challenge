import { StyleSheet } from 'react-native';
import { borderRadius, colors, shadow, spacing } from '@ui-kit';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing['4'],
    gap: spacing['3'],
    ...shadow.sm,
  },
  header: {
    gap: spacing['2'],
  },
  availableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceHint: {
    marginTop: spacing['1'],
  },
});
