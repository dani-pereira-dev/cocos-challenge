import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Icon, Text, colors, type IconName } from '@ui-kit';

import { OrderResponse, OrderStatus } from '@/domain/entities/order';
import { styles } from './OrderResult.styles';

interface OrderResultProps {
  result: OrderResponse;
  onClose: () => void;
}

type StatusConfig = { iconName: IconName; labelKey: string; color: string };

const STATUS_CONFIG: Record<OrderStatus, StatusConfig> = {
  FILLED: { iconName: 'checkmark-circle', labelKey: 'order.statusFilled', color: colors.success },
  PENDING: { iconName: 'time', labelKey: 'order.statusPending', color: colors.warning },
  REJECTED: { iconName: 'close-circle', labelKey: 'order.statusRejected', color: colors.error },
};

export function OrderResult({ result, onClose }: OrderResultProps) {
  const { t } = useTranslation();
  const config = STATUS_CONFIG[result.status];

  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: `${config.color}20` }]}>
        <Icon name={config.iconName} size={48} color={config.color} />
      </View>

      <Text variant="h3" align="center">
        {t('order.resultTitle', { id: result.id })}
      </Text>

      <Text variant="bodyMedium" align="center" style={{ color: config.color }}>
        {t(config.labelKey)}
      </Text>

      <Button
        label={t('order.closeButton')}
        onPress={onClose}
        variant="outline"
        fullWidth
        style={styles.button}
      />
    </View>
  );
}
