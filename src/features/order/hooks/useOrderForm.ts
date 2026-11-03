import { useState } from 'react';
import {
  isBuyOrder,
  isLimitOrder,
  isSellOrder,
  OrderRequest,
  OrderResponse,
  OrderSide,
  OrderType,
} from '@/domain/entities/order';
import { isUserError, resolveErrorMessage } from '@/domain/interfaces/api-error';
import { calculateSharesFromAmount } from '@/domain/use-cases/calculations';
import { usePortfolioQuery } from '@/hooks/usePortfolioQuery';
import { useSubmitOrderMutation } from '@/hooks/useSubmitOrderMutation';
import { useOrderModalStore } from '@/store';
import { copy } from '@/constants/copy';
import { computeUseAllValue, isUseAllAvailable, QuantityMode } from '../utils/order-form';

export type Step = 'select' | 'form' | 'confirm' | 'result';
export type SubSheetType = 'mode' | 'price' | null;

export function useOrderForm() {
  const { visible, instrument, closeOrder } = useOrderModalStore();
  const { mutateAsync, isPending } = useSubmitOrderMutation();
  const { cash } = usePortfolioQuery();

  const [step, setStep] = useState<Step>('select');
  const [side, setSide] = useState<OrderSide>('BUY');
  const [orderType, setOrderType] = useState<OrderType>('MARKET');
  const [quantityMode, setQuantityMode] = useState<QuantityMode>('amount');
  const [amountInput, setAmountInput] = useState('');
  const [limitPriceInput, setLimitPriceInput] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [systemError, setSystemError] = useState<string | null>(null);
  const [result, setResult] = useState<OrderResponse | null>(null);
  const [subSheet, setSubSheet] = useState<SubSheetType>(null);

  function reset() {
    setStep('select');
    setSide('BUY');
    setOrderType('MARKET');
    setQuantityMode('amount');
    setAmountInput('');
    setLimitPriceInput('');
    setValidationError(null);
    setSystemError(null);
    setResult(null);
    setSubSheet(null);
  }

  const parsedAmount = parseFloat(amountInput.replace(/\./g, '').replace(',', '.')) || 0;

  const derivedShares =
    quantityMode === 'amount'
      ? calculateSharesFromAmount(parsedAmount, instrument?.last_price ?? 0)
      : parseInt(amountInput, 10) || 0;

  const derivedTotal =
    quantityMode === 'amount' ? parsedAmount : derivedShares * (instrument?.last_price ?? 0);

  const estimatedValid = derivedShares > 0 && Number.isFinite(derivedShares);

  const showUseAll = isUseAllAvailable({ side, cash, ownedShares: instrument?.quantity });

  const exceedsCash = isBuyOrder(side) && cash != null && estimatedValid && derivedTotal > cash;
  const exceedsShares =
    isSellOrder(side) &&
    instrument?.quantity != null &&
    estimatedValid &&
    derivedShares > instrument.quantity;

  const submitBlockReason = exceedsCash
    ? copy.order.exceedsCash
    : exceedsShares
      ? copy.order.exceedsShares
      : null;

  const isSubmitDisabled =
    isPending ||
    !estimatedValid ||
    (isLimitOrder(orderType) && limitPriceInput.trim() === '') ||
    exceedsCash ||
    exceedsShares;

  function goToForm(selected: OrderSide) {
    setSide(selected);
    setStep('form');
  }

  function goBack() {
    if (subSheet) {
      setSubSheet(null);
    } else {
      setStep('select');
    }
  }

  function handleUseAll() {
    if (!instrument) return;
    const value = computeUseAllValue({
      side,
      quantityMode,
      cash,
      ownedShares: instrument.quantity,
      lastPrice: instrument.last_price,
    });
    if (value !== null) setAmountInput(value);
  }

  async function handleSubmit() {
    if (!instrument) return;
    setValidationError(null);

    if (!estimatedValid) {
      setValidationError(copy.order.invalidQuantity);
      return;
    }

    let limitPrice: number | undefined;
    if (isLimitOrder(orderType)) {
      limitPrice = parseFloat(limitPriceInput.replace(',', '.'));
      if (!limitPrice || limitPrice <= 0 || !Number.isFinite(limitPrice)) {
        setValidationError(copy.order.invalidPrice);
        return;
      }
    }

    const request: OrderRequest = {
      instrument_id: instrument.id,
      side,
      type: orderType,
      quantity: derivedShares,
      price: limitPrice,
    };

    try {
      const response = await mutateAsync(request);
      setResult(response);
      setStep('result');
    } catch (err) {
      const message = resolveErrorMessage(err, copy.order.fetchError);
      if (isUserError(err)) {
        setValidationError(message);
        setStep('form');
      } else {
        setSystemError(message);
      }
    }
  }

  return {
    visible,
    instrument,
    closeOrder,
    cash,
    isPending,
    step,
    setStep,
    reset,
    goToForm,
    goBack,
    side,
    orderType,
    setOrderType,
    quantityMode,
    setQuantityMode,
    amountInput,
    setAmountInput,
    limitPriceInput,
    setLimitPriceInput,
    validationError,
    setValidationError,
    systemError,
    setSystemError,
    result,
    subSheet,
    setSubSheet,
    derivedShares,
    derivedTotal,
    estimatedValid,
    showUseAll,
    submitBlockReason,
    isSubmitDisabled,
    handleUseAll,
    handleSubmit,
  };
}
