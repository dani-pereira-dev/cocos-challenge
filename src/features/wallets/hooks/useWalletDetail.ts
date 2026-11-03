import { useMemo } from 'react';
import { PortfolioAssetWithMetrics } from '@/domain/entities/portfolio';
import { WalletAllocation } from '@/domain/entities/wallet';
import { usePortfolioQuery } from '@/hooks/usePortfolioQuery';
import { useWalletsStore } from '../store/walletsStore';

export interface EnrichedAllocation extends WalletAllocation {
  holding: PortfolioAssetWithMetrics | null;
  currentValue: number;
}

export function useWalletDetail(walletId: string) {
  const wallet = useWalletsStore((state) => state.wallets.find((w) => w.id === walletId));
  const { holdings, isLoading, isError, error } = usePortfolioQuery();

  const holdingsMap = useMemo(
    () =>
      new Map<string, PortfolioAssetWithMetrics>(
        holdings.map((holding) => [holding.ticker, holding]),
      ),
    [holdings],
  );

  const enrichedAllocations = useMemo<EnrichedAllocation[]>(() => {
    if (!wallet) return [];
    return wallet.allocations.map((alloc) => {
      const holding = holdingsMap.get(alloc.ticker) ?? null;
      return {
        ...alloc,
        holding,
        currentValue: holding ? alloc.quantity * holding.last_price : 0,
      };
    });
  }, [wallet, holdingsMap]);

  const totalValue = useMemo(
    () => enrichedAllocations.reduce((sum, alloc) => sum + alloc.currentValue, 0),
    [enrichedAllocations],
  );

  return { wallet, enrichedAllocations, totalValue, isLoading, isError, error };
}
