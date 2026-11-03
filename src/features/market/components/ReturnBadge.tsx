import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kit/components/Text';
import { colors } from '@ui-kit/foundations/colors';
import { formatPercent } from '@/utils/formatters';
import { copy } from '@/constants/copy';

interface ReturnBadgeProps {
  value: number;
}

/**
 * Muestra el porcentaje de retorno con color y flecha según si es positivo, negativo o neutro.
 */
export function ReturnBadge({ value }: ReturnBadgeProps) {
  const isPositive = value > 0;
  const isNegative = value < 0;

  const color = isPositive ? colors.success : isNegative ? colors.error : colors.textSecondary;
  const arrow = isPositive ? copy.returnBadge.up : isNegative ? copy.returnBadge.down : copy.returnBadge.neutral;

  return (
    <View style={styles.container}>
      <Text variant="caption" style={[styles.text, { color }]}>
        {arrow} {formatPercent(value)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  text: {
    fontWeight: '600',
  },
});
