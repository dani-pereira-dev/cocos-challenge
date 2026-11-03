import { StyleSheet } from 'react-native';
import { colors } from '@ui-kit/foundations/colors';
import { borderRadius, spacing } from '@ui-kit/foundations/spacing';
import { fontSize } from '@ui-kit/foundations/typography';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing['4'],
    paddingVertical: spacing['3'],
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: spacing['3'],
    height: 44,
    gap: spacing['2'],
  },
  icon: {
    flexShrink: 0,
  },
  input: {
    flex: 1,
    fontSize: fontSize.base,
    color: colors.textPrimary,
    padding: 0,
  },
});
