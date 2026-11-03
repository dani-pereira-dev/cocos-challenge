import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@ui-kit';
import { PortfolioAssetWithMetrics } from '@/domain/entities/portfolio';
import { resolveGainColor } from '@/utils/colors';
import { TickerAvatar } from '@/components/TickerAvatar';
import { ReturnBadge } from '@/components/ReturnBadge';
import { formatCurrency } from '@/utils/formatters';
import { styles } from './PortfolioListItem.styles';

interface PortfolioListItemProps {
  asset: PortfolioAssetWithMetrics;
  onPress?: (asset: PortfolioAssetWithMetrics) => void;
}

export function PortfolioListItem({ asset, onPress }: PortfolioListItemProps) {
  const { t } = useTranslation();
  const gainColor = resolveGainColor(asset.gain_amount);

  const gainPrefix = asset.gain_amount > 0 ? '+' : '';

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => onPress?.(asset)}
    >
      <TickerAvatar ticker={asset.ticker} size={44} />

      <View style={styles.info}>
        <Text variant="bodySemibold" numberOfLines={1}>
          {asset.ticker}
        </Text>
        <Text variant="caption" color="tertiary">
          {t('portfolio.shares', { count: asset.quantity })}
        </Text>
      </View>

      <View style={styles.metrics}>
        <Text variant="bodySemibold" align="right">
          {formatCurrency(asset.market_value)}
        </Text>
        <Text variant="caption" align="right" style={{ color: gainColor }}>
          {gainPrefix}
          {formatCurrency(asset.gain_amount)}
        </Text>
        <ReturnBadge value={asset.gain_percent} />
      </View>
    </Pressable>
  );
}
