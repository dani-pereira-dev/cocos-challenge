import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@ui-kit/components/Button';
import { Text } from '@ui-kit/components/Text';
import { colors } from '@ui-kit/foundations/colors';
import { OrderResponse, OrderStatus } from '@/domain/entities/order';
import { styles } from './OrderResult.styles';

interface OrderResultProps {
  result: OrderResponse;
  onClose: () => void;
}

type StatusConfig = { icon: string; labelKey: string; color: string };

const STATUS_CONFIG: Record<OrderStatus, StatusConfig> = {
  FILLED: { icon: '✓', labelKey: 'order.statusFilled', color: colors.success },
  PENDING: { icon: '⏳', labelKey: 'order.statusPending', color: colors.warning },
  REJECTED: { icon: '✕', labelKey: 'order.statusRejected', color: colors.error },
};

export function OrderResult({ result, onClose }: OrderResultProps) {
  const { t } = useTranslation();
  const config = STATUS_CONFIG[result.status];

  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: `${config.color}20` }]}>
        <Text variant="h2" style={{ color: config.color }}>
          {config.icon}
        </Text>
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
