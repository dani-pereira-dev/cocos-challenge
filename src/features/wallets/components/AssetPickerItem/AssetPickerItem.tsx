import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@ui-kit/components/Text';
import { TickerAvatar } from '@/components/TickerAvatar';
import { PortfolioAssetWithMetrics } from '@/domain/entities/portfolio';
import { colors } from '@ui-kit/foundations/colors';
import { formatCurrency } from '@/utils/formatters';
import { styles } from './AssetPickerItem.styles';

interface AssetPickerItemProps {
  asset: PortfolioAssetWithMetrics;
  assignedQuantity: number | null;
  onPress: (asset: PortfolioAssetWithMetrics) => void;
}

export function AssetPickerItem({ asset, assignedQuantity, onPress }: AssetPickerItemProps) {
  const { t } = useTranslation();
  const isAssigned = assignedQuantity !== null;

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => onPress(asset)}
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

      <View style={styles.right}>
        <Text variant="caption" color="secondary" align="right">
          {formatCurrency(asset.market_value)}
        </Text>
        {isAssigned ? (
          <Text variant="caption" color="brand" align="right">
            {t('wallets.assignedCount', { count: assignedQuantity })}
          </Text>
        ) : null}
      </View>

      <Ionicons
        name={isAssigned ? 'create-outline' : 'add-circle-outline'}
        size={22}
        color={colors.primary}
        style={styles.actionIcon}
      />
    </Pressable>
  );
}
