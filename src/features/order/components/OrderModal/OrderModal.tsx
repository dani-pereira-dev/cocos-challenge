import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useOrderForm } from '../../hooks/useOrderForm';
import { SelectStep } from '../steps/SelectStep/SelectStep';
import { FormStep } from '../steps/FormStep/FormStep';
import { ConfirmStep } from '../steps/ConfirmStep/ConfirmStep';
import { OrderResult } from '../OrderResult';
import { styles } from './OrderModal.styles';

export function OrderModal() {
  const form = useOrderForm();
  const { visible, instrument, closeOrder, step, setStep, reset } = form;

  if (!instrument) return null;

  function handleConfirmBack() {
    form.setSystemError(null);
    setStep('form');
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={closeOrder}
      onShow={reset}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={step === 'select' ? closeOrder : undefined}
        />

        {step === 'select' && (
          <SelectStep
            instrument={instrument}
            onBuy={() => form.goToForm('BUY')}
            onSell={() => form.goToForm('SELL')}
            onCancel={closeOrder}
          />
        )}

        {step === 'form' && (
          <FormStep
            instrument={instrument}
            side={form.side}
            orderType={form.orderType}
            quantityMode={form.quantityMode}
            amountInput={form.amountInput}
            limitPriceInput={form.limitPriceInput}
            validationError={form.validationError}
            submitBlockReason={form.submitBlockReason}
            estimatedValid={form.estimatedValid}
            isSubmitDisabled={form.isSubmitDisabled}
            showUseAll={form.showUseAll}
            cash={form.cash}
            derivedTotal={form.derivedTotal}
            subSheet={form.subSheet}
            onBack={form.goBack}
            onClose={closeOrder}
            onAmountChange={(v) => {
              form.setAmountInput(v);
              form.setValidationError(null);
            }}
            onLimitPriceChange={(v) => {
              form.setLimitPriceInput(v);
              form.setValidationError(null);
            }}
            onUseAll={form.handleUseAll}
            onOpenModeSheet={() => form.setSubSheet('mode')}
            onOpenPriceSheet={() => form.setSubSheet('price')}
            onSubmit={() => setStep('confirm')}
            onCloseSubSheet={() => form.setSubSheet(null)}
            onSelectQuantityMode={(mode) => {
              form.setQuantityMode(mode);
              form.setAmountInput('');
              form.setSubSheet(null);
            }}
            onSelectOrderType={(type) => {
              form.setOrderType(type);
              form.setSubSheet(null);
            }}
          />
        )}

        {step === 'confirm' && (
          <ConfirmStep
            instrument={instrument}
            side={form.side}
            orderType={form.orderType}
            derivedShares={form.derivedShares}
            limitPriceInput={form.limitPriceInput}
            systemError={form.systemError}
            isPending={form.isPending}
            onBack={handleConfirmBack}
            onSubmit={form.handleSubmit}
          />
        )}

        {step === 'result' && form.result && (
          <View style={styles.resultSheet}>
            <View style={styles.handle} />
            <OrderResult result={form.result} onClose={closeOrder} />
          </View>
        )}
      </View>
    </Modal>
  );
}
