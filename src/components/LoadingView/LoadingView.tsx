import { ActivityIndicator, View, ViewStyle } from 'react-native';
import { Text, colors } from '@ui-kit';

import { styles } from './LoadingView.styles';

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
