import { StyleSheet } from 'react-native';
import { colors, spacing } from '@ui-kit';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing['4'],
    paddingTop: spacing['6'],
    gap: spacing['4'],
  },
  assetCard: {
    alignItems: 'center',
    gap: spacing['3'],
    paddingBottom: spacing['2'],
  },
  inputCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing['4'],
    gap: spacing['3'],
  },
  inputHeader: {
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
  footer: {
    padding: spacing['4'],
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
});
