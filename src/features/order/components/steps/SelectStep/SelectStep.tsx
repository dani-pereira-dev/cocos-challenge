import { Pressable, View } from 'react-native';
import { Text } from '@ui-kit/components/Text';
import { OrderableInstrument } from '@/domain/entities/order';
import { copy } from '@/constants/copy';
import { styles } from './SelectStep.styles';

interface SelectStepProps {
  instrument: OrderableInstrument;
  onBuy: () => void;
  onSell: () => void;
  onCancel: () => void;
}

export function SelectStep({ instrument, onBuy, onSell, onCancel }: SelectStepProps) {
  const canSell = instrument.quantity != null && instrument.quantity > 0;

  return (
    <View style={styles.sheet}>
      <View style={styles.handle} />

      <Pressable style={[styles.actionButton, styles.buyButton]} onPress={onBuy}>
        <Text variant="bodySemibold" style={styles.buyText}>
          {copy.order.buy}
        </Text>
      </Pressable>

      <Pressable
        style={[styles.actionButton, styles.sellButton, !canSell && styles.disabled]}
        onPress={canSell ? onSell : undefined}
        disabled={!canSell}
      >
        <Text variant="bodySemibold" style={styles.sellText}>
          {copy.order.sell}
        </Text>
        {!canSell ? (
          <Text variant="caption" style={styles.noPositionHint}>
            {copy.order.noPositionHint}
          </Text>
        ) : null}
      </Pressable>

      <Pressable style={[styles.actionButton, styles.cancelButton]} onPress={onCancel}>
        <Text variant="bodySemibold" color="secondary">
          {copy.order.cancelButton}
        </Text>
      </Pressable>
    </View>
  );
}
