import { colors } from '@ui-kit';

export function resolveGainColor(amount: number): string {
  if (amount > 0) return colors.success;
  if (amount < 0) return colors.error;
  return colors.textSecondary;
}
