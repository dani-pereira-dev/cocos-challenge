import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';
import { Text } from '@ui-kit/components/Text';
import { colors } from '@ui-kit/foundations/colors';

interface LoadingViewProps {
  message?: string;
  style?: ViewStyle;
}

export function LoadingView({ message, style }: LoadingViewProps) {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="large" color={colors.primary} />
      {message ? (
        <Text variant="body" color="secondary" style={styles.message}>
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
    gap: 12,
  },
  message: {
    marginTop: 4,
  },
});
