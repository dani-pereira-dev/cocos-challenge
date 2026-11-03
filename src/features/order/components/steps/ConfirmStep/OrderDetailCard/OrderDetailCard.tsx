import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@ui-kit/components/Text';
import { colors } from '@ui-kit/foundations/colors';
import { OrderType } from '@/domain/entities/order';
import { formatCurrency } from '@/utils/formatters';
import { copy } from '@/constants/copy';
import { styles } from './OrderDetailCard.styles';

interface OrderDetailCardProps {
  orderType: OrderType;
  orderPrice: number;
  today: string;
}

export function OrderDetailCard({ orderType, orderPrice, today }: OrderDetailCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
          <Text variant="body" color="secondary">{copy.order.liquidacionLabel}</Text>
        </View>
        <Text variant="bodySemibold">{copy.order.liquidacionValue}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <Ionicons name="swap-horizontal-outline" size={16} color={colors.textSecondary} />
          <Text variant="body" color="secondary">
            {orderType === 'MARKET' ? copy.order.priceMarketLabel : copy.order.priceLimitLabel}
          </Text>
        </View>
        <Text variant="bodySemibold">{'≈ '}{formatCurrency(orderPrice)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <Ionicons name="calendar-outline" size={16} color={colors.textSecondary} />
          <Text variant="body" color="secondary">{copy.order.validezLabel}</Text>
        </View>
        <Text variant="bodySemibold">{copy.order.validezValue(today)}</Text>
      </View>
    </View>
  );
}
