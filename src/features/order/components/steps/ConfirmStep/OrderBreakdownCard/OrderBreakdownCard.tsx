import { View } from 'react-native';
import { Text } from '@ui-kit/components/Text';
import { OrderSide } from '@/domain/entities/order';
import { formatCurrency } from '@/utils/formatters';
import { copy } from '@/constants/copy';
import { styles } from './OrderBreakdownCard.styles';

interface OrderBreakdownCardProps {
  side: OrderSide;
  derivedShares: number;
  subtotal: number;
  comision: number;
  impuestos: number;
}

export function OrderBreakdownCard({
  side,
  derivedShares,
  subtotal,
  comision,
  impuestos,
}: OrderBreakdownCardProps) {
  const detailLabel =
    side === 'BUY'
      ? copy.order.buyDetailLabel(derivedShares)
      : copy.order.sellDetailLabel(derivedShares);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text variant="body" color="secondary" style={styles.label} numberOfLines={1} ellipsizeMode="tail">
          {detailLabel}
        </Text>
        <Text variant="bodySemibold" style={styles.value} adjustsFontSizeToFit minimumFontScale={0.6} numberOfLines={1}>
          {formatCurrency(subtotal)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text variant="body" color="secondary" style={styles.label} numberOfLines={1} ellipsizeMode="tail">
          {copy.order.comisionesLabel}
        </Text>
        <Text variant="bodySemibold" style={[styles.value, styles.deduction]} adjustsFontSizeToFit minimumFontScale={0.6} numberOfLines={1}>
          {`-${formatCurrency(comision)}`}
        </Text>
      </View>
      <View style={styles.row}>
        <Text variant="body" color="secondary" style={styles.label} numberOfLines={1} ellipsizeMode="tail">
          {copy.order.impuestosLabel}
        </Text>
        <Text variant="bodySemibold" style={[styles.value, styles.deduction]} adjustsFontSizeToFit minimumFontScale={0.6} numberOfLines={1}>
          {`-${formatCurrency(impuestos)}`}
        </Text>
      </View>
    </View>
  );
}
