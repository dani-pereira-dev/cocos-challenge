import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@ui-kit/components/Text';
import { colors } from '@ui-kit/foundations/colors';
import { formatPercent } from '@/utils/formatters';
import { styles } from './ReturnBadge.styles';

interface ReturnBadgeProps {
  value: number;
}

export function ReturnBadge({ value }: ReturnBadgeProps) {
  const { t } = useTranslation();
  const isPositive = value > 0;
  const isNegative = value < 0;

  const color = isPositive ? colors.success : isNegative ? colors.error : colors.textSecondary;
  const arrow = isPositive
    ? t('returnBadge.up')
    : isNegative
      ? t('returnBadge.down')
      : t('returnBadge.neutral');

  return (
    <View style={styles.container}>
      <Text variant="caption" style={[styles.text, { color }]}>
        {arrow} {formatPercent(value)}
      </Text>
    </View>
  );
}
