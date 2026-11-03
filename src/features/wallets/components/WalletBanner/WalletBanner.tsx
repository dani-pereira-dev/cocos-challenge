import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon, Text, colors } from '@ui-kit';

import { styles } from './WalletBanner.styles';

export function WalletBanner() {
  const { t } = useTranslation();

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => router.push('/wallets')}
    >
      <View style={styles.iconContainer}>
        <Icon name="briefcase-outline" size={24} color={colors.textInverse} />
      </View>

      <View style={styles.textContainer}>
        <Text variant="bodySemibold" style={styles.title}>
          {t('wallets.bannerTitle')}
        </Text>
        <Text variant="caption" style={styles.subtitle}>
          {t('wallets.bannerSubtitle')}
        </Text>
      </View>

      <Icon name="chevron-forward" size={20} color={colors.textInverse} />
    </Pressable>
  );
}
