export const marketQueryKeys = {
  instruments: {
    all: ['instruments'] as const,
  },
  search: {
    all: ['search'] as const,
    byQuery: (query: string) => ['search', query] as const,
  },
} as const;
