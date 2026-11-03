import { StyleSheet } from 'react-native';
import { borderRadius, colors, spacing } from '@ui-kit';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing['4'],
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['3'],
  },
  info: {
    flex: 1,
    gap: 2,
  },
  priceBox: {
    alignItems: 'flex-end',
    gap: 2,
  },
});
