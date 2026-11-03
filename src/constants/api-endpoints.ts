export const API_ENDPOINTS = {
  instruments: '/instruments',
  portfolio: '/portfolio',
  orders: '/orders',
  search: (query: string) => `/search?query=${encodeURIComponent(query)}`,
} as const;
