import { StyleSheet } from 'react-native';
import { colors, spacing } from '@ui-kit';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing['4'],
    paddingVertical: spacing['3'],
    backgroundColor: colors.surface,
    gap: spacing['3'],
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  pressed: {
    backgroundColor: colors.surfaceSecondary,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  metrics: {
    alignItems: 'flex-end',
    gap: 2,
  },
});
