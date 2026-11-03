import { StyleSheet } from 'react-native';
import { colors, spacing } from '@ui-kit';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing['4'],
    paddingTop: spacing['5'],
    paddingBottom: spacing['4'],
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
