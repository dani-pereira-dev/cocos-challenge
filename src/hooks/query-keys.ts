/**
 * Claves de caché centralizadas para React Query.
 * Mantenerlas aquí evita strings duplicados entre hooks y facilita la invalidación.
 */
export const queryKeys = {
  instruments: {
    all: ['instruments'] as const,
  },
  portfolio: {
    all: ['portfolio'] as const,
  },
  search: {
    all: ['search'] as const,
    byQuery: (query: string) => ['search', query] as const,
  },
} as const;
