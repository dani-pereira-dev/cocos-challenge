import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@ui-kit/components/Text';
import { PortfolioAssetWithMetrics } from '@/domain/entities/portfolio';
import { resolveGainColor } from '@/utils/colors';
import { formatCurrency } from '@/utils/formatters';
import { styles } from './PortfolioSummaryHeader.styles';

interface PortfolioSummaryHeaderProps {
  assets: PortfolioAssetWithMetrics[];
  cash?: number;
}

export function PortfolioSummaryHeader({ assets, cash }: PortfolioSummaryHeaderProps) {
  const { t } = useTranslation();
  const totalValue = assets.reduce((sum, a) => sum + a.market_value, 0);
  const totalGain = assets.reduce((sum, a) => sum + a.gain_amount, 0);

  const gainColor = resolveGainColor(totalGain);
  const gainPrefix = totalGain > 0 ? '+' : '';

  return (
    <View style={styles.container}>
      <View style={styles.stat}>
        <Text variant="caption" color="secondary">
          {t('portfolio.totalValueLabel')}
        </Text>
        <Text variant="priceXl">{formatCurrency(totalValue)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.stat}>
        <Text variant="caption" color="secondary">
          {t('portfolio.totalGainLabel')}
        </Text>
        <Text variant="bodyMedium" style={{ color: gainColor }}>
          {gainPrefix}
          {formatCurrency(totalGain)}
        </Text>
        {cash !== undefined ? (
          <Text variant="caption" color="tertiary">
            {t('portfolio.cashLabel')}: {formatCurrency(cash)}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
