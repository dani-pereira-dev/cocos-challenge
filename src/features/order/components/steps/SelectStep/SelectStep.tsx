import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@ui-kit/components/Text';
import { useOrderFormContext } from '@/features/order/contexts/OrderFormContext';
import { styles } from './SelectStep.styles';

export function SelectStep() {
  const { t } = useTranslation();
  const { instrument, goToForm, closeOrder } = useOrderFormContext();
  const canSell = instrument!.quantity != null && instrument!.quantity > 0;

  return (
    <View style={styles.sheet}>
      <View style={styles.handle} />

      <Pressable style={[styles.actionButton, styles.buyButton]} onPress={() => goToForm('BUY')}>
        <Text variant="bodySemibold" style={styles.buyText}>
          {t('order.buy')}
        </Text>
      </Pressable>

      <Pressable
        style={[styles.actionButton, styles.sellButton, !canSell && styles.disabled]}
        onPress={canSell ? () => goToForm('SELL') : undefined}
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

      <Pressable style={[styles.actionButton, styles.cancelButton]} onPress={closeOrder}>
        <Text variant="bodySemibold" color="secondary">
          {t('order.cancelButton')}
        </Text>
      </Pressable>
    </View>
  );
}
