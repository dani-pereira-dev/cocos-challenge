import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kit/components/Text';
import { colors } from '@ui-kit/foundations/colors';
import { spacing } from '@ui-kit/foundations/spacing';
import { PortfolioAssetWithMetrics } from '@/domain/entities/portfolio';
import { formatCurrency } from '@/utils/formatters';
import { copy } from '@/constants/copy';

interface PortfolioSummaryHeaderProps {
  assets: PortfolioAssetWithMetrics[];
  cash?: number;
}

export function PortfolioSummaryHeader({ assets, cash }: PortfolioSummaryHeaderProps) {
  const totalValue = assets.reduce((sum, a) => sum + a.market_value, 0);
  const totalGain = assets.reduce((sum, a) => sum + a.gain_amount, 0);

  const gainColor =
    totalGain > 0 ? colors.success : totalGain < 0 ? colors.error : colors.textSecondary;
  const gainPrefix = totalGain > 0 ? '+' : '';

  return (
    <View style={styles.container}>
      <View style={styles.stat}>
        <Text variant="caption" color="secondary">
          {copy.portfolio.totalValueLabel}
        </Text>
        <Text variant="priceXl">{formatCurrency(totalValue)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.stat}>
        <Text variant="caption" color="secondary">
          {copy.portfolio.totalGainLabel}
        </Text>
        <Text variant="bodyMedium" style={{ color: gainColor }}>
          {gainPrefix}{formatCurrency(totalGain)}
        </Text>
        {cash !== undefined && (
          <Text variant="caption" color="tertiary">
            {copy.portfolio.cashLabel}: {formatCurrency(cash)}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing['4'],
    paddingVertical: spacing['5'],
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing['4'],
  },
  stat: {
    flex: 1,
    gap: spacing['1'],
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
    marginVertical: spacing['1'],
  },
});
