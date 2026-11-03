import { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@ui-kit/components/Text';
import { colors } from '@ui-kit/foundations/colors';
import { styles } from './WalletNavBar.styles';

interface WalletNavBarProps {
  title: string;
  onBack?: () => void;
  rightElement?: ReactNode;
}

export function WalletNavBar({ title, onBack, rightElement }: WalletNavBarProps) {
  function handleBack() {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handleBack} hitSlop={12} style={styles.backButton}>
        <Ionicons name="arrow-back" size={22} color={colors.textBrand} />
      </Pressable>

      <Text variant="h3" style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {rightElement ? (
        <View style={styles.right}>{rightElement}</View>
      ) : (
        <View style={styles.rightPlaceholder} />
      )}
    </View>
  );
}
