import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@ui-kit/components/Text';
import { TickerAvatar } from '@/components/TickerAvatar';
import { styles } from './QuantityAssetHeader.styles';

interface QuantityAssetHeaderProps {
  ticker: string;
}

export function QuantityAssetHeader({ ticker }: QuantityAssetHeaderProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TickerAvatar ticker={ticker} size={56} />
      <Text variant="h3" align="center">
        {ticker}
      </Text>
      <Text variant="body" color="secondary" align="center">
        {t('wallets.quantityTitle', { assetName: ticker })}
      </Text>
    </View>
  );
}
