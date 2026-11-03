import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isLimitOrder, OrderRequest, OrderResponse, OrderSide } from '@/domain/entities/order';
import { isUserError, resolveErrorMessage } from '@/domain/interfaces/api-error';
import { usePortfolioQuery } from '@/hooks/usePortfolioQuery';
import { useSubmitOrderMutation } from '@/hooks/useSubmitOrderMutation';
import { useOrderModalStore } from '@/store';
import { useOrderNavigation } from './useOrderNavigation';
import { useOrderInputs } from './useOrderInputs';

export type { Step, SubSheetType } from './useOrderNavigation';

export function useOrderForm() {
  const { t } = useTranslation();
  const { instrument, closeOrder } = useOrderModalStore();
  const { mutateAsync: submitOrder, isPending } = useSubmitOrderMutation();
  const { cash } = usePortfolioQuery();

  const navigation = useOrderNavigation();
  const inputs = useOrderInputs({ instrument, cash });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [systemError, setSystemError] = useState<string | null>(null);
  const [result, setResult] = useState<OrderResponse | null>(null);

  const submitBlockReason = inputs.exceedsCash
    ? t('order.exceedsCash')
    : inputs.exceedsShares
      ? t('order.exceedsShares')
      : null;

  const isSubmitDisabled =
    isPending ||
    !inputs.estimatedValid ||
    (isLimitOrder(inputs.orderType) && inputs.limitPriceInput.trim() === '') ||
    inputs.exceedsCash ||
    inputs.exceedsShares;

  function goToForm(selected: OrderSide) {
    inputs.setSide(selected);
    navigation.setStep('form');
  }

  function reset() {
    navigation.resetNavigation();
    inputs.resetInputs();
    setValidationError(null);
    setSystemError(null);
    setResult(null);
  }

  async function handleSubmit() {
    if (!instrument) return;
    setValidationError(null);

    if (!inputs.estimatedValid) {
      setValidationError(t('order.invalidQuantity'));
      return;
    }

    let limitPrice: number | undefined;
    if (isLimitOrder(inputs.orderType)) {
      limitPrice = parseFloat(inputs.limitPriceInput.replace(',', '.'));
      if (!limitPrice || limitPrice <= 0 || !Number.isFinite(limitPrice)) {
        setValidationError(t('order.invalidPrice'));
        return;
      }
    }

    const request: OrderRequest = {
      instrument_id: instrument.id,
      side: inputs.side,
      type: inputs.orderType,
      quantity: inputs.derivedShares,
      price: limitPrice,
    };

    try {
      const response = await submitOrder(request);
      setResult(response);
      navigation.setStep('result');
    } catch (err) {
      const message = resolveErrorMessage(err, t('order.fetchError'));
      if (isUserError(err)) {
        setValidationError(message);
        navigation.setStep('form');
      } else {
        setSystemError(message);
      }
    }
  }

  return {
    instrument,
    closeOrder,
    cash,
    isPending,
    // Navigation
    step: navigation.step,
    setStep: navigation.setStep,
    subSheet: navigation.subSheet,
    setSubSheet: navigation.setSubSheet,
    goBack: navigation.goBack,
    goToForm,
    reset,
    // Form fields
    side: inputs.side,
    orderType: inputs.orderType,
    setOrderType: inputs.setOrderType,
    quantityMode: inputs.quantityMode,
    setQuantityMode: inputs.setQuantityMode,
    amountInput: inputs.amountInput,
    setAmountInput: inputs.setAmountInput,
    limitPriceInput: inputs.limitPriceInput,
    setLimitPriceInput: inputs.setLimitPriceInput,
    // Derived
    derivedShares: inputs.derivedShares,
    derivedTotal: inputs.derivedTotal,
    estimatedValid: inputs.estimatedValid,
    showUseAll: inputs.showUseAll,
    handleUseAll: inputs.handleUseAll,
    // Submit
    handleSubmit,
    isSubmitDisabled,
    submitBlockReason,
    // State
    validationError,
    setValidationError,
    systemError,
    setSystemError,
    result,
  };
}
