import { StyleSheet } from 'react-native';
import { colors, spacing } from '@ui-kit';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: spacing['4'],
    padding: spacing['4'],
    backgroundColor: colors.primary,
    borderRadius: 16,
    gap: spacing['3'],
  },
  pressed: {
    opacity: 0.9,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  title: {
    color: colors.textInverse,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.75)',
  },
});
