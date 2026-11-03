import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@ui-kit/components/Text';
import { colors } from '@ui-kit/foundations/colors';
import { styles } from './SystemErrorBanner.styles';

interface SystemErrorBannerProps {
  message: string;
}

export function SystemErrorBanner({ message }: SystemErrorBannerProps) {
  return (
    <View style={styles.banner}>
      <Ionicons name="alert-circle-outline" size={16} color={colors.warning} />
      <Text variant="caption" style={styles.text}>
        {message}
      </Text>
    </View>
  );
}
