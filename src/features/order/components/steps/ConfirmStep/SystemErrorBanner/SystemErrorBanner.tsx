import { View } from 'react-native';
import { Icon, Text, colors } from '@ui-kit';

import { styles } from './SystemErrorBanner.styles';

interface SystemErrorBannerProps {
  message: string;
}

export function SystemErrorBanner({ message }: SystemErrorBannerProps) {
  return (
    <View style={styles.banner}>
      <Icon name="alert-circle-outline" size={16} color={colors.warning} />
      <Text variant="caption" style={styles.text}>
        {message}
      </Text>
    </View>
  );
}
