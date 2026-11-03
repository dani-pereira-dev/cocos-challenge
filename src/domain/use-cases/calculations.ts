/**
 * Retorna el porcentaje de variación del precio de un instrumento.
 * Fórmula: ((last_price - close_price) / close_price) * 100
 * Retorna 0 si close_price es cero para evitar división por cero.
 */
export function calculateInstrumentReturn(lastPrice: number, closePrice: number): number {
  if (closePrice === 0) return 0;
  return ((lastPrice - closePrice) / closePrice) * 100;
}

/**
 * Retorna el valor de mercado actual de una posición del portafolio.
 * Fórmula: quantity * last_price
 */
export function calculateMarketValue(quantity: number, lastPrice: number): number {
  return quantity * lastPrice;
}

/**
 * Retorna la ganancia/pérdida absoluta en pesos de una posición del portafolio.
 * Fórmula: (last_price - avg_cost_price) * quantity
 */
export function calculateGainAmount(
  lastPrice: number,
  avgCostPrice: number,
  quantity: number,
): number {
  return (lastPrice - avgCostPrice) * quantity;
}

/**
 * Retorna el rendimiento total en porcentaje de una posición del portafolio.
 * Fórmula: ((last_price - avg_cost_price) / avg_cost_price) * 100
 * Retorna 0 si avg_cost_price es cero para evitar división por cero.
 */
export function calculateGainPercent(lastPrice: number, avgCostPrice: number): number {
  if (avgCostPrice === 0) return 0;
  return ((lastPrice - avgCostPrice) / avgCostPrice) * 100;
}

/**
 * Retorna la cantidad máxima de acciones enteras comprables dado un monto en pesos.
 * No se admiten fracciones de acciones — el resultado siempre se trunca hacia abajo.
 * Retorna 0 si lastPrice es cero o negativo.
 */
export function calculateSharesFromAmount(amountInPesos: number, lastPrice: number): number {
  if (lastPrice <= 0) return 0;
  return Math.floor(amountInPesos / lastPrice);
}
