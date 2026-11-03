import { useState } from 'react';
import {
  isBuyOrder,
  isSellOrder,
  OrderableInstrument,
  OrderSide,
  OrderType,
} from '@/domain/entities/order';
import { calculateSharesFromAmount } from '@/domain/use-cases/calculations';
import { computeUseAllValue, isUseAllAvailable, QuantityMode } from '../utils/order-form';

interface Params {
  instrument: OrderableInstrument | null;
  cash?: number;
}

export function useOrderInputs({ instrument, cash }: Params) {
  const [side, setSide] = useState<OrderSide>('BUY');
  const [orderType, setOrderType] = useState<OrderType>('MARKET');
  const [quantityMode, setQuantityMode] = useState<QuantityMode>('amount');
  const [amountInput, setAmountInput] = useState('');
  const [limitPriceInput, setLimitPriceInput] = useState('');

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

  function resetInputs() {
    setSide('BUY');
    setOrderType('MARKET');
    setQuantityMode('amount');
    setAmountInput('');
    setLimitPriceInput('');
  }

  return {
    side,
    setSide,
    orderType,
    setOrderType,
    quantityMode,
    setQuantityMode,
    amountInput,
    setAmountInput,
    limitPriceInput,
    setLimitPriceInput,
    parsedAmount,
    derivedShares,
    derivedTotal,
    estimatedValid,
    showUseAll,
    exceedsCash,
    exceedsShares,
    handleUseAll,
    resetInputs,
  };
}
