import { StyleSheet } from 'react-native';
import { colors } from '@ui-kit/foundations/colors';
import { spacing } from '@ui-kit/foundations/spacing';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing['4'],
    paddingVertical: spacing['5'],
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing['4'],
  },
  stat: {
    flex: 1,
    gap: spacing['1'],
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
    marginVertical: spacing['1'],
  },
});
