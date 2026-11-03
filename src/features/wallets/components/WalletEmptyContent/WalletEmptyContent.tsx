import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { Icon } from '@ui-kit';
import { Button } from '@ui-kit/components/Button';
import { Text } from '@ui-kit/components/Text';
import { colors } from '@ui-kit/foundations/colors';
import { styles } from './WalletEmptyContent.styles';

interface WalletEmptyContentProps {
  walletId: string;
}

export function WalletEmptyContent({ walletId }: WalletEmptyContentProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Icon name="briefcase-outline" size={64} color={colors.primary} />
      <Text variant="h3" align="center">
        {t('wallets.emptyDetailTitle')}
      </Text>
      <Text variant="body" color="secondary" align="center">
        {t('wallets.emptyDetailBody')}
      </Text>
      <View style={styles.cta}>
        <Button
          label={t('wallets.addAssets')}
          onPress={() => router.push(`/wallets/${walletId}/add-asset`)}
          size="md"
          fullWidth
        />
      </View>
    </View>
  );
}
