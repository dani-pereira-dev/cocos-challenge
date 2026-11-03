import { StyleSheet } from 'react-native';
import { spacing } from '@ui-kit';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: spacing['6'],
    paddingVertical: spacing['8'],
    gap: spacing['3'],
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing['2'],
  },
  button: {
    marginTop: spacing['4'],
    width: '100%',
  },
});
