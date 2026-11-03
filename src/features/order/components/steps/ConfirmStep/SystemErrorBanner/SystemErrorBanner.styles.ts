import { StyleSheet } from 'react-native';
import { borderRadius, colors, spacing } from '@ui-kit';

export const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['2'],
    backgroundColor: colors.warningLight,
    borderWidth: 1,
    borderColor: colors.warningBorder,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing['3'],
    paddingVertical: spacing['2'],
  },
  text: {
    flex: 1,
    color: colors.warning,
  },
});
