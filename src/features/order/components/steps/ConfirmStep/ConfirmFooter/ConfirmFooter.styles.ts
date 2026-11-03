import { StyleSheet } from 'react-native';
import { colors } from '@ui-kit/foundations/colors';
import { fontSize, fontWeight } from '@ui-kit/foundations/typography';
import { spacing } from '@ui-kit/foundations/spacing';

export const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing['4'],
    paddingTop: spacing['3'],
    paddingBottom: spacing['8'],
    gap: spacing['3'],
  },
  total: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalLabel: {
    flex: 1,
    marginRight: spacing['2'],
  },
  totalAmount: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    flexShrink: 1,
    textAlign: 'right',
  },
});
