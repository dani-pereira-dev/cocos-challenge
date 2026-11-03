import { StyleSheet } from 'react-native';
import { colors, spacing } from '@ui-kit';

export const DELETE_ACTION_WIDTH = 80;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing['4'],
    paddingVertical: spacing['4'],
    backgroundColor: colors.surface,
    gap: spacing['3'],
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  info: {
    flex: 1,
    gap: 3,
  },
  metrics: {
    alignItems: 'flex-end',
    gap: 4,
  },
  deleteAction: {
    width: DELETE_ACTION_WIDTH,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  deleteButton: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  deleteLabel: {
    color: '#fff',
  },
});
