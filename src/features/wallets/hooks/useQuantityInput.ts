import { useState } from 'react';
import { router } from 'expo-router';
import { useWalletsStore } from '../store/walletsStore';
import { usePortfolioQuery } from '@/hooks/usePortfolioQuery';

export function useQuantityInput(walletId: string, ticker: string) {
  const wallet = useWalletsStore((state) => state.wallets.find((w) => w.id === walletId));
  const upsertAllocation = useWalletsStore((state) => state.upsertAllocation);
  const { holdings } = usePortfolioQuery();

  const holding = holdings.find((asset) => asset.ticker === ticker);
  const existingAllocation = wallet?.allocations.find((alloc) => alloc.ticker === ticker);

  const [quantityInput, setQuantityInput] = useState(
    existingAllocation ? existingAllocation.quantity.toString() : ''
  );

  const parsedQuantity = parseInt(quantityInput.replace(',', '.'), 10);
  const hasInput = quantityInput.trim().length > 0 && !isNaN(parsedQuantity);
  const exceedsHolding = hasInput && holding !== undefined && parsedQuantity > holding.quantity;
  const isValidQuantity = hasInput && parsedQuantity > 0 && !exceedsHolding;
  const estimatedValue = isValidQuantity && holding ? parsedQuantity * holding.last_price : null;

  function handleUseAll() {
    if (holding) setQuantityInput(holding.quantity.toString());
  }

  function handleConfirm() {
    if (!isValidQuantity) return;
    upsertAllocation(walletId, { ticker, quantity: parsedQuantity });
    router.back();
  }

  return {
    holding,
    quantityInput,
    setQuantityInput,
    exceedsHolding,
    isValidQuantity,
    estimatedValue,
    handleUseAll,
    handleConfirm,
  };
}
