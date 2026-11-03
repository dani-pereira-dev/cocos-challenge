import { StyleSheet } from 'react-native';
import { spacing } from '@ui-kit';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing['4'],
    paddingVertical: spacing['3'],
  },
  label: {
    flex: 1,
  },
});
