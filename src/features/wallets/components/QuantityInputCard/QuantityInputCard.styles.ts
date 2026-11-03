import { StyleSheet } from 'react-native';
import { colors, spacing } from '@ui-kit';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing['4'],
    gap: spacing['3'],
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
