import { Pressable, View } from 'react-native';
import { Text } from '@ui-kit/components/Text';
import { colors } from '@ui-kit/foundations/colors';
import { PortfolioAssetWithMetrics } from '@/domain/entities/portfolio';
import { TickerAvatar } from '@/features/market/components/TickerAvatar';
import { ReturnBadge } from '@/features/market/components/ReturnBadge';
import { formatCurrency } from '@/utils/formatters';
import { copy } from '@/constants/copy';
import { styles } from './PortfolioListItem.styles';

interface PortfolioListItemProps {
  asset: PortfolioAssetWithMetrics;
  onPress?: (asset: PortfolioAssetWithMetrics) => void;
}

export function PortfolioListItem({ asset, onPress }: PortfolioListItemProps) {
  const gainColor =
    asset.gain_amount > 0
      ? colors.success
      : asset.gain_amount < 0
        ? colors.error
        : colors.textSecondary;

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
          {copy.portfolio.shares(asset.quantity)}
        </Text>
      </View>

      <View style={styles.metrics}>
        <Text variant="bodySemibold" align="right">
          {formatCurrency(asset.market_value)}
        </Text>
        <Text variant="caption" align="right" style={{ color: gainColor }}>
          {gainPrefix}{formatCurrency(asset.gain_amount)}
        </Text>
        <ReturnBadge value={asset.gain_percent} />
      </View>
    </Pressable>
  );
}
