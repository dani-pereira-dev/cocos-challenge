import { StyleSheet } from 'react-native';
import { spacing } from '@ui-kit/foundations/spacing';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['8'],
    gap: spacing['3'],
  },
  icon: {
    fontSize: 40,
  },
  message: {
    marginBottom: spacing['2'],
  },
  button: {
    marginTop: spacing['2'],
  },
});
