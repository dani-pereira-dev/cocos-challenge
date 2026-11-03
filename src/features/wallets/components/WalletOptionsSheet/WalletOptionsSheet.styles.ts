import { StyleSheet } from 'react-native';
import { colors, spacing } from '@ui-kit';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: spacing['4'],
    paddingBottom: spacing['4'],
    gap: spacing['2'],
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginVertical: spacing['3'],
  },
  option: {
    paddingVertical: spacing['3'],
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing['2'],
  },
});
