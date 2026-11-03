import { calculateSharesFromAmount } from '@/domain/use-cases/calculations';
import { isBuyOrder, isSellOrder, OrderSide } from '@/domain/entities/order';

export type QuantityMode = 'amount' | 'shares';

export interface UseAllParams {
  side: OrderSide;
  quantityMode: QuantityMode;
  cash?: number;
  ownedShares?: number;
  lastPrice: number;
}

/**
 * Calcula el valor a insertar en el input cuando el usuario toca "Usar todo".
 * Retorna null si no hay suficiente información para calcular (ej: SELL sin cantidad en cartera).
 */
export function computeUseAllValue(params: UseAllParams): string | null {
  const { side, quantityMode, cash, ownedShares, lastPrice } = params;

  if (isSellOrder(side)) {
    if (ownedShares == null) return null;
    if (quantityMode === 'shares') {
      return String(ownedShares);
    }
    // Por monto: valor de mercado de todas las acciones
    return String(Math.floor(ownedShares * lastPrice));
  }

  // BUY
  if (cash == null) return null;
  if (quantityMode === 'amount') {
    return String(Math.floor(cash));
  }
  // Por cantidad: cuántas acciones enteras se pueden comprar con todo el cash
  return String(calculateSharesFromAmount(cash, lastPrice));
}

/**
 * Determina si el botón "Usar todo" debe mostrarse.
 */
export function isUseAllAvailable(
  params: Pick<UseAllParams, 'side' | 'cash' | 'ownedShares'>,
): boolean {
  if (isBuyOrder(params.side)) return params.cash != null;
  return params.ownedShares != null;
}
