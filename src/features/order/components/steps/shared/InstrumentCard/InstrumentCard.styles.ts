import { StyleSheet } from 'react-native';
import { colors } from '@ui-kit/foundations/colors';
import { borderRadius, spacing } from '@ui-kit/foundations/spacing';

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
