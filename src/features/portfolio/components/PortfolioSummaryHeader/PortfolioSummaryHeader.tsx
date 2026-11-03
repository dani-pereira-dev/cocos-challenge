import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@ui-kit';
import { PortfolioAssetWithMetrics } from '@/domain/entities/portfolio';
import { formatCurrency } from '@/utils/formatters';
import { styles } from './PortfolioSummaryHeader.styles';

interface PortfolioSummaryHeaderProps {
  assets: PortfolioAssetWithMetrics[];
  cash?: number;
}

export function PortfolioSummaryHeader({ assets, cash }: PortfolioSummaryHeaderProps) {
  const { t } = useTranslation();
  const totalValue = assets.reduce((sum, a) => sum + a.market_value, 0);
  const dailyChange = assets.reduce(
    (sum, a) => sum + (a.last_price - a.close_price) * a.quantity,
    0,
  );
  const dailyChangePrefix = dailyChange > 0 ? '+' : '';

  function gainStyle(value: number) {
    if (value > 0) return styles.gainPositive;
    if (value < 0) return styles.gainNegative;
    return styles.gainNeutral;
  }

  return (
    <View style={styles.container}>
      <Text variant="overline" style={styles.label}>
        {t('portfolio.totalValueLabel')}
      </Text>
      <Text style={styles.heroAmount}>{formatCurrency(totalValue)}</Text>
      <View style={styles.gainRow}>
        <Text variant="caption" style={styles.gainLabel}>
          {t('portfolio.dailyChangeLabel')}
        </Text>
        <Text variant="caption" style={gainStyle(dailyChange)}>
          {dailyChangePrefix}
          {formatCurrency(dailyChange)}
        </Text>
      </View>
      {cash !== undefined && (
        <View style={styles.cashRow}>
          <View style={styles.cashDot} />
          <Text variant="caption" style={styles.cashText}>
            {t('portfolio.cashLabel')}: {formatCurrency(cash)}
          </Text>
        </View>
      )}
    </View>
  );
}
