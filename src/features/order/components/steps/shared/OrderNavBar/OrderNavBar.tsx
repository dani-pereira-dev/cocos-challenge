import { Pressable, View } from 'react-native';
import { Icon, Text } from '@ui-kit';

import { styles } from './OrderNavBar.styles';

interface OrderNavBarProps {
  title: string;
  onClose: () => void;
}

export function OrderNavBar({ title, onClose }: OrderNavBarProps) {
  return (
    <View style={styles.navBar}>
      <View style={styles.navButton} />

      <Text variant="bodySemibold" style={styles.navTitle}>
        {title}
      </Text>

      <Pressable onPress={onClose} hitSlop={12} style={styles.navButton}>
        <Icon name="close" size={22} color={styles.navTitle.color} />
      </Pressable>
    </View>
  );
}
