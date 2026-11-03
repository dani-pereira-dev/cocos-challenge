import { StyleSheet } from 'react-native';
import { colors, spacing } from '@ui-kit';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    flex: 1,
  },
  footer: {
    padding: spacing['4'],
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
});
