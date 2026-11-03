import { create } from 'zustand';
import { OrderableInstrument } from '@/domain/entities/order';

interface OrderModalStore {
  visible: boolean;
  instrument: OrderableInstrument | null;
  openOrder: (instrument: OrderableInstrument) => void;
  closeOrder: () => void;
}

/**
 * Estado global para el modal de órdenes.
 * Permite abrirlo desde cualquier pantalla (Mercado o Portfolio).
 */
export const useOrderModalStore = create<OrderModalStore>()((set) => ({
  visible: false,
  instrument: null,
  openOrder: (instrument) => set({ visible: true, instrument }),
  closeOrder: () => set({ visible: false }),
}));
