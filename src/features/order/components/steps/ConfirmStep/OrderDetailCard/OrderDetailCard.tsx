import { View } from 'react-native';
import { Icon, Text, colors } from '@ui-kit';
import { useTranslation } from 'react-i18next';

import { isMarketOrder, OrderType } from '@/domain/entities/order';
import { formatCurrency } from '@/utils/formatters';
import { styles } from './OrderDetailCard.styles';

interface OrderDetailCardProps {
  orderType: OrderType;
  orderPrice: number;
  today: string;
}

export function OrderDetailCard({ orderType, orderPrice, today }: OrderDetailCardProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <Icon name="time-outline" size={16} color={colors.textSecondary} />
          <Text variant="body" color="secondary">
            {t('order.liquidacionLabel')}
          </Text>
        </View>
        <Text variant="bodySemibold">{t('order.liquidacionValue')}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <Icon name="swap-horizontal-outline" size={16} color={colors.textSecondary} />
          <Text variant="body" color="secondary">
            {isMarketOrder(orderType) ? t('order.priceMarketLabel') : t('order.priceLimitLabel')}
          </Text>
        </View>
        <Text variant="bodySemibold">
          {'≈ '}
          {formatCurrency(orderPrice)}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <Icon name="calendar-outline" size={16} color={colors.textSecondary} />
          <Text variant="body" color="secondary">
            {t('order.validezLabel')}
          </Text>
        </View>
        <Text variant="bodySemibold">{t('order.validezValue', { date: today })}</Text>
      </View>
    </View>
  );
}
