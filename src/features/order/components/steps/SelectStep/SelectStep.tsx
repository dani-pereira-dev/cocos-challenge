import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@ui-kit/components/Text';
import { OrderableInstrument } from '@/domain/entities/order';
import { styles } from './SelectStep.styles';

interface SelectStepProps {
  instrument: OrderableInstrument;
  onBuy: () => void;
  onSell: () => void;
  onCancel: () => void;
}

export function SelectStep({ instrument, onBuy, onSell, onCancel }: SelectStepProps) {
  const { t } = useTranslation();
  const canSell = instrument.quantity != null && instrument.quantity > 0;

  return (
    <View style={styles.sheet}>
      <View style={styles.handle} />

      <Pressable style={[styles.actionButton, styles.buyButton]} onPress={onBuy}>
        <Text variant="bodySemibold" style={styles.buyText}>
          {t('order.buy')}
        </Text>
      </Pressable>

      <Pressable
        style={[styles.actionButton, styles.sellButton, !canSell && styles.disabled]}
        onPress={canSell ? onSell : undefined}
        disabled={!canSell}
      >
        <Text variant="bodySemibold" style={styles.sellText}>
          {t('order.sell')}
        </Text>
        {!canSell ? (
          <Text variant="caption" style={styles.noPositionHint}>
            {t('order.noPositionHint')}
          </Text>
        ) : null}
      </Pressable>

      <Pressable style={[styles.actionButton, styles.cancelButton]} onPress={onCancel}>
        <Text variant="bodySemibold" color="secondary">
          {t('order.cancelButton')}
        </Text>
      </Pressable>
    </View>
  );
}
