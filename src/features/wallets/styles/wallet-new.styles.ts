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
    paddingTop: spacing['8'],
    gap: spacing['4'],
    alignItems: 'stretch',
  },
  iconWrapper: {
    alignItems: 'center',
    marginBottom: spacing['2'],
  },
  fieldWrapper: {
    gap: spacing['2'],
  },
  label: {
    marginBottom: 2,
  },
  footer: {
    padding: spacing['4'],
    paddingBottom: spacing['6'],
  },
});
