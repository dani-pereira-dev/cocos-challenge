import { StyleSheet } from 'react-native';
import { colors, spacing } from '@ui-kit';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing['5'],
    paddingTop: spacing['8'],
    paddingBottom: spacing['6'],
    gap: spacing['2'],
  },
  gainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['2'],
    marginTop: spacing['1'],
  },
  bone: {
    backgroundColor: colors.onDarkSurfaceSubtle,
  },
});
