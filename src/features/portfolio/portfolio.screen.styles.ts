import { StyleSheet } from 'react-native';
import { colors } from '@ui-kit/foundations/colors';
import { spacing } from '@ui-kit/foundations/spacing';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing['4'],
    paddingVertical: spacing['4'],
    backgroundColor: colors.surface,
  },
  emptyList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    minHeight: 300,
  },
});
