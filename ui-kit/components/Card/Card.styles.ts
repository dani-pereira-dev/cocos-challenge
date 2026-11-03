import { StyleSheet } from 'react-native';
import { colors } from '../../foundations/colors';
import { borderRadius, spacing } from '../../foundations/spacing';

export const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  content: {
    padding: spacing['4'],
  },
  pressed: {
    opacity: 0.92,
  },
});
