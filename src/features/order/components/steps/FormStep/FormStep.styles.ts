import { StyleSheet } from 'react-native';
import { colors } from '@ui-kit/foundations/colors';
import { borderRadius, spacing } from '@ui-kit/foundations/spacing';
import { fontSize, fontWeight } from '@ui-kit/foundations/typography';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: 60,
    borderTopLeftRadius: borderRadius['2xl'],
    borderTopRightRadius: borderRadius['2xl'],
    overflow: 'hidden',
  },
  flex: {
    flex: 1,
  },
  content: {
    padding: spacing['4'],
    gap: spacing['3'],
    paddingBottom: spacing['6'],
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing['4'],
  },
  availableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing['4'],
    paddingTop: spacing['3'],
    paddingBottom: spacing['1'],
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing['4'],
    paddingBottom: spacing['3'],
  },
  currencyPrefix: {
    fontSize: fontSize.xl,
    color: colors.textSecondary,
    marginRight: spacing['1'],
  },
  amountInputContainer: {
    flex: 1,
  },
  amountInputInner: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    minHeight: 48,
  },
  amountInputText: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    textAlign: 'right',
  },
  limitPriceRow: {
    paddingHorizontal: spacing['4'],
    paddingBottom: spacing['3'],
  },
  marketPriceDisplay: {
    paddingHorizontal: spacing['4'],
    paddingVertical: spacing['3'],
    backgroundColor: colors.surfaceSecondary,
    marginHorizontal: spacing['4'],
    marginBottom: spacing['3'],
    borderRadius: borderRadius.md,
  },
  errorText: {
    textAlign: 'center',
  },
  footer: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing['4'],
    paddingTop: spacing['3'],
    paddingBottom: spacing['8'],
    gap: spacing['2'],
  },
  footerHint: {
    textAlign: 'center',
  },
});
