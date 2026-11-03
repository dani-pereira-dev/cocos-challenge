import { ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useOrderModalStore } from '../../store/orderModal.store';
import { OrderFormProvider, useOrderFormContext } from '../../contexts/OrderFormContext';
import { Step } from '../../hooks/useOrderForm';
import { SelectStep } from '../steps/SelectStep/SelectStep';
import { FormStep } from '../steps/FormStep/FormStep';
import { ConfirmStep } from '../steps/ConfirmStep/ConfirmStep';
import { OrderResult } from '../OrderResult';
import { styles } from './OrderModal.styles';

export function OrderModal() {
  const { visible, instrument, closeOrder, resetToken } = useOrderModalStore();
  if (!instrument) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={closeOrder}
      statusBarTranslucent
    >
      <OrderFormProvider key={resetToken}>
        <OrderModalInner onClose={closeOrder} />
      </OrderFormProvider>
    </Modal>
  );
}

interface OrderModalInnerProps {
  onClose: () => void;
}

function OrderModalInner({ onClose }: OrderModalInnerProps) {
  const { step, result } = useOrderFormContext();

  const stepRenderers: Record<Step, () => ReactNode> = {
    select: () => <SelectStep />,
    form: () => <FormStep />,
    confirm: () => <ConfirmStep />,
    result: () =>
      result ? (
        <View style={styles.resultSheet}>
          <View style={styles.handle} />
          <OrderResult result={result} onClose={onClose} />
        </View>
      ) : null,
  };

  return (
    <View style={styles.overlay}>
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={step === 'select' ? onClose : undefined}
      />
      {stepRenderers[step]()}
    </View>
  );
}
