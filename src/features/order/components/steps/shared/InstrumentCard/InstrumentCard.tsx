import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@ui-kit';
import { TickerAvatar } from '@/components/TickerAvatar';
import { formatAmount } from '@/utils/formatters';
import { styles } from './InstrumentCard.styles';

interface InstrumentCardProps {
  ticker: string;
  name?: string;
  lastPrice?: number;
  avatarSize?: number;
}

export function InstrumentCard({ ticker, name, lastPrice, avatarSize = 40 }: InstrumentCardProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.card}>
      <TickerAvatar ticker={ticker} size={avatarSize} />
      <View style={styles.info}>
        <Text variant="bodySemibold">{ticker}</Text>
        {name ? (
          <Text variant="caption" color="secondary" numberOfLines={1}>
            {name}
          </Text>
        ) : null}
      </View>
      {lastPrice != null ? (
        <View style={styles.priceBox}>
          <Text variant="caption" color="secondary">
            {t('common.currencyPrefix')}
          </Text>
          <Text variant="bodySemibold">{formatAmount(lastPrice)}</Text>
        </View>
      ) : null}
    </View>
  );
}
