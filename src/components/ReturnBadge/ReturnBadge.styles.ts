import { StyleSheet } from 'react-native';
import { colors } from '@ui-kit';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    alignSelf: 'flex-end',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 100,
    backgroundColor: colors.pillBackground,
  },
  text: {
    fontWeight: '700',
  },
});
