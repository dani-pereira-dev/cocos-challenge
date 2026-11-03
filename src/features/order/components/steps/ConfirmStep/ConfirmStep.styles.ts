import { StyleSheet } from 'react-native';
import { borderRadius, colors, spacing } from '@ui-kit';

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
    gap: spacing['4'],
    paddingBottom: spacing['6'],
  },
  sectionTitle: {
    marginTop: spacing['1'],
    marginBottom: spacing['1'],
  },
});
