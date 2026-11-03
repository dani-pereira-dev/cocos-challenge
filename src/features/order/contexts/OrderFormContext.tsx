import { createContext, useContext, ReactNode } from 'react';
import { useOrderForm } from '../hooks/useOrderForm';

type OrderFormCtx = ReturnType<typeof useOrderForm>;

const OrderFormContext = createContext<OrderFormCtx | null>(null);

export function OrderFormProvider({ children }: { children: ReactNode }) {
  const form = useOrderForm();
  return <OrderFormContext.Provider value={form}>{children}</OrderFormContext.Provider>;
}

export function useOrderFormContext(): OrderFormCtx {
  const ctx = useContext(OrderFormContext);
  if (!ctx) throw new Error('useOrderFormContext must be used within OrderFormProvider');
  return ctx;
}
