import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@ui-kit/components/Text';
import { isBuyOrder, OrderSide } from '@/domain/entities/order';
import { formatCurrency } from '@/utils/formatters';
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
  const { t } = useTranslation();
  const detailLabel = isBuyOrder(side)
    ? t('order.buyDetailLabel', { count: derivedShares })
    : t('order.sellDetailLabel', { count: derivedShares });

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text
          variant="body"
          color="secondary"
          style={styles.label}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {detailLabel}
        </Text>
        <Text
          variant="bodySemibold"
          style={styles.value}
          adjustsFontSizeToFit
          minimumFontScale={0.6}
          numberOfLines={1}
        >
          {formatCurrency(subtotal)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text
          variant="body"
          color="secondary"
          style={styles.label}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {t('order.comisionesLabel')}
        </Text>
        <Text
          variant="bodySemibold"
          style={[styles.value, styles.deduction]}
          adjustsFontSizeToFit
          minimumFontScale={0.6}
          numberOfLines={1}
        >
          {`-${formatCurrency(comision)}`}
        </Text>
      </View>
      <View style={styles.row}>
        <Text
          variant="body"
          color="secondary"
          style={styles.label}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {t('order.impuestosLabel')}
        </Text>
        <Text
          variant="bodySemibold"
          style={[styles.value, styles.deduction]}
          adjustsFontSizeToFit
          minimumFontScale={0.6}
          numberOfLines={1}
        >
          {`-${formatCurrency(impuestos)}`}
        </Text>
      </View>
    </View>
  );
}
