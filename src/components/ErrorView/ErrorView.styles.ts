import { StyleSheet } from 'react-native';
import { spacing } from '@ui-kit';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['8'],
    gap: spacing['4'],
  },
  icon: {
    marginBottom: spacing['1'],
    opacity: 0.7,
  },
  message: {
    marginBottom: spacing['2'],
    textAlign: 'center',
  },
  button: {
    marginTop: spacing['2'],
    minWidth: 160,
  },
});
