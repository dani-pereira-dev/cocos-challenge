import { useMemo } from 'react';
import { CustomWallet } from '@/domain/entities/wallet';
import { usePortfolioQuery } from '@/hooks/usePortfolioQuery';

export function useWalletTotals(wallet: CustomWallet): number {
  const { holdings } = usePortfolioQuery();

  return useMemo(() => {
    const priceMap = new Map(holdings.map((holding) => [holding.ticker, holding.last_price]));
    return wallet.allocations.reduce((sum, alloc) => {
      const price = priceMap.get(alloc.ticker) ?? 0;
      return sum + alloc.quantity * price;
    }, 0);
  }, [wallet.allocations, holdings]);
}
