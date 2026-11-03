import { StyleSheet, View, ViewStyle } from 'react-native';
import { Text } from '@ui-kit/components/Text';
import { spacing } from '@ui-kit/foundations/spacing';
import { copy } from '@/constants/copy';

interface EmptyViewProps {
  title?: string;
  message?: string;
  style?: ViewStyle;
}

export function EmptyView({
  title = copy.common.noResults,
  message,
  style,
}: EmptyViewProps) {
  return (
    <View style={[styles.container, style]}>
      <Text variant="h3" align="center" style={styles.icon}>🔍</Text>
      <Text variant="bodyMedium" color="primary" align="center">
        {title}
      </Text>
      {message ? (
        <Text variant="body" color="secondary" align="center">
          {message}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['8'],
    gap: spacing['2'],
  },
  icon: {
    fontSize: 40,
    marginBottom: spacing['2'],
  },
});
