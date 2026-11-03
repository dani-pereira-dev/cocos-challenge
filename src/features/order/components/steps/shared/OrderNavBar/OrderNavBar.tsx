import { Pressable, View } from 'react-native';
import { Icon } from '@ui-kit';
import { Text } from '@ui-kit/components/Text';
import { styles } from './OrderNavBar.styles';

interface OrderNavBarProps {
  title: string;
  accentColor: string;
  onBack: () => void;
  onClose?: () => void;
}

export function OrderNavBar({ title, accentColor, onBack, onClose }: OrderNavBarProps) {
  return (
    <View style={styles.navBar}>
      <Pressable onPress={onBack} hitSlop={12} style={styles.navButton}>
        <Icon name="arrow-back" size={22} color={accentColor} />
      </Pressable>

      <Text variant="bodySemibold" style={[styles.navTitle, { color: accentColor }]}>
        {title}
      </Text>

      {onClose ? (
        <Pressable onPress={onClose} hitSlop={12} style={styles.navButton}>
          <Icon name="close" size={22} color={accentColor} />
        </Pressable>
      ) : (
        <View style={styles.navButton} />
      )}
    </View>
  );
}
