import { StyleSheet } from 'react-native';
import { colors, spacing } from '@ui-kit';

export const styles = StyleSheet.create({
  header: {
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
    gap: spacing['2'],
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
    marginVertical: spacing['1'],
  },
});
