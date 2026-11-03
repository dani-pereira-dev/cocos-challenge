import { StyleSheet } from 'react-native';
import { colors } from '@ui-kit/foundations/colors';
import { fontSize, fontWeight } from '@ui-kit/foundations/typography';
import { spacing } from '@ui-kit/foundations/spacing';

export const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing['4'],
    paddingTop: spacing['3'],
    paddingBottom: spacing['3'],
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  navButton: {
    width: 36,
    alignItems: 'center',
  },
  navTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
});
