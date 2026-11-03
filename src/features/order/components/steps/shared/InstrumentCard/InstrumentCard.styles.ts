import { StyleSheet } from 'react-native';
import { borderRadius, colors, shadow, spacing } from '@ui-kit';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing['4'],
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['3'],
    ...shadow.sm,
  },
  info: {
    flex: 1,
    gap: 3,
  },
  priceBox: {
    alignItems: 'flex-end',
    gap: 4,
  },
});
