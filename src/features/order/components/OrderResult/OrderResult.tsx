import { View } from 'react-native';
import { Button } from '@ui-kit/components/Button';
import { Text } from '@ui-kit/components/Text';
import { colors } from '@ui-kit/foundations/colors';
import { OrderResponse, OrderStatus } from '@/domain/entities/order';
import { copy } from '@/constants/copy';
import { styles } from './OrderResult.styles';

interface OrderResultProps {
  result: OrderResponse;
  onClose: () => void;
}

const STATUS_CONFIG: Record<OrderStatus, { icon: string; label: string; color: string }> = {
  FILLED: { icon: '✓', label: copy.order.statusFilled, color: colors.success },
  PENDING: { icon: '⏳', label: copy.order.statusPending, color: colors.warning },
  REJECTED: { icon: '✕', label: copy.order.statusRejected, color: colors.error },
};

export function OrderResult({ result, onClose }: OrderResultProps) {
  const config = STATUS_CONFIG[result.status];

  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: `${config.color}20` }]}>
        <Text variant="h2" style={{ color: config.color }}>
          {config.icon}
        </Text>
      </View>

      <Text variant="h3" align="center">
        {copy.order.resultTitle(result.id)}
      </Text>

      <Text variant="bodyMedium" align="center" style={{ color: config.color }}>
        {config.label}
      </Text>

      <Button
        label={copy.order.closeButton}
        onPress={onClose}
        variant="outline"
        fullWidth
        style={styles.button}
      />
    </View>
  );
}
