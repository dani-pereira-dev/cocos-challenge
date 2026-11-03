import { View, ViewStyle } from 'react-native';
import { Text } from '@ui-kit/components/Text';
import { copy } from '@/constants/copy';
import { styles } from './EmptyView.styles';

interface EmptyViewProps {
  title?: string;
  message?: string;
  style?: ViewStyle;
}

export function EmptyView({ title = copy.common.noResults, message, style }: EmptyViewProps) {
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
