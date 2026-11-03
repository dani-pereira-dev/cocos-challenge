import { StyleSheet } from 'react-native';
import { colors } from '@ui-kit/foundations/colors';
import { borderRadius, spacing } from '@ui-kit/foundations/spacing';

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
  sectionTitle: {
    marginTop: spacing['2'],
    marginBottom: spacing['1'],
  },
});
