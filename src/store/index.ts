import { create } from 'zustand';
import { OrderableInstrument } from '@/domain/entities/order';

interface OrderModalStore {
  visible: boolean;
  instrument: OrderableInstrument | null;
  resetToken: number;
  openOrder: (instrument: OrderableInstrument) => void;
  closeOrder: () => void;
}

export const useOrderModalStore = create<OrderModalStore>()((set) => ({
  visible: false,
  instrument: null,
  resetToken: 0,
  openOrder: (instrument) =>
    set((s) => ({ visible: true, instrument, resetToken: s.resetToken + 1 })),
  closeOrder: () => set({ visible: false }),
}));
