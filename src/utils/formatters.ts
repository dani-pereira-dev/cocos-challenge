/**
 * Formatea un número como moneda argentina (AR$).
 * Usa punto como separador de miles y coma como separador decimal.
 * Ejemplo: 10830 → "AR$ 10.830,00"
 * Para valores no finitos o extremadamente grandes usa notación compacta.
 */
export function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) return 'AR$ --';
  const abs = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  // Notación compacta para evitar desborde y notación científica
  if (abs >= 1_000_000_000_000) {
    return `AR$ ${sign}${(abs / 1_000_000_000_000).toFixed(1).replace('.', ',')} B`;
  }
  if (abs >= 1_000_000_000) {
    return `AR$ ${sign}${(abs / 1_000_000_000).toFixed(1).replace('.', ',')} M`;
  }
  const fixed = abs.toFixed(2);
  const [intPart, decPart] = fixed.split('.');
  const withThousands = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `AR$ ${sign}${withThousands},${decPart}`;
}

/**
 * Formatea un porcentaje con signo y dos decimales.
 * Ejemplo: 4.33 → "+4,33%" | -2.16 → "-2,16%"
 */
export function formatPercent(value: number): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2).replace('.', ',')}%`;
}

/**
 * Formatea una fecha como DD/MM/YYYY.
 */
export function formatDate(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

/**
 * Formatea un número como moneda sin el prefijo AR$.
 * Útil para mostrar valores dentro de inputs o contextos con prefijo separado.
 */
export function formatAmount(value: number): string {
  const abs = Math.abs(value).toFixed(2);
  const [intPart, decPart] = abs.split('.');
  const withThousands = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${value < 0 ? '-' : ''}${withThousands},${decPart}`;
}
