import { useEffect, useState } from 'react';

/**
 * Retrasa la actualización de un valor por el tiempo indicado.
 * Útil para evitar llamadas innecesarias a la API mientras el usuario escribe.
 */
export function useDebounce<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}
