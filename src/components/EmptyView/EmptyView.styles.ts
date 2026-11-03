import { StyleSheet } from 'react-native';
import { spacing } from '@ui-kit';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['8'],
    gap: spacing['3'],
  },
  icon: {
    marginBottom: spacing['2'],
    opacity: 0.5,
  },
});
