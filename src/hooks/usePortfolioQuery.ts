import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PortfolioAssetWithMetrics } from '@/domain/entities/portfolio';
import {
  calculateGainAmount,
  calculateGainPercent,
  calculateMarketValue,
} from '@/domain/use-cases/calculations';
import { fetchPortfolio } from '@/services/portfolio.service';
import { queryKeys } from './query-keys';

/**
 * Obtiene y cachea el portafolio del usuario.
 * Retorna `holdings` (posiciones enriquecidas con métricas) y `cash` (efectivo disponible).
 */
export function usePortfolioQuery() {
  const query = useQuery({
    queryKey: queryKeys.portfolio.all,
    queryFn: fetchPortfolio,
  });

  const holdings = useMemo((): PortfolioAssetWithMetrics[] => {
    const raw = query.data?.holdings;
    if (!Array.isArray(raw)) return [];
    return raw.map((asset) => ({
      ...asset,
      market_value: calculateMarketValue(asset.quantity, asset.last_price),
      gain_amount: calculateGainAmount(asset.last_price, asset.avg_cost_price, asset.quantity),
      gain_percent: calculateGainPercent(asset.last_price, asset.avg_cost_price),
    }));
  }, [query.data]);

  return {
    ...query,
    holdings,
    cash: query.data?.cash,
  };
}
