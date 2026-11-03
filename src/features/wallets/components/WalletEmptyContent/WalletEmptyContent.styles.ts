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
  cta: {
    width: '100%',
    marginTop: spacing['4'],
  },
});
