import { StyleSheet } from 'react-native';
import { colors } from '../../foundations/colors';
import { borderRadius, spacing } from '../../foundations/spacing';
import { fontSize, fontWeight } from '../../foundations/typography';

export const styles = StyleSheet.create({
  container: {
    gap: spacing['1'],
  },
  label: {
    marginBottom: spacing['1'],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderWidth: 1.5,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing['3'],
    minHeight: 48,
  },
  disabledContainer: {
    backgroundColor: colors.surfaceSecondary,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    color: colors.textPrimary,
    paddingVertical: spacing['2'],
  },
  disabledText: {
    color: colors.textSecondary,
  },
  prefix: {
    marginRight: spacing['2'],
  },
  suffix: {
    marginLeft: spacing['2'],
  },
  helperText: {
    marginTop: spacing['1'],
  },
});
