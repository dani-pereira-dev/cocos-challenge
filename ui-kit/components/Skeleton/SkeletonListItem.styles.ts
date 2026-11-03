import { StyleSheet } from 'react-native';
import { colors } from '../../foundations/colors';
import { spacing } from '../../foundations/spacing';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing['4'],
    paddingVertical: spacing['3'],
    backgroundColor: colors.surface,
    gap: spacing['3'],
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  left: {
    flex: 1,
    gap: spacing['1'],
  },
  right: {
    alignItems: 'flex-end',
    gap: spacing['1'],
  },
});
