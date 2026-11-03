export type OrderSide = 'BUY' | 'SELL';
export type OrderType = 'MARKET' | 'LIMIT';
export type OrderStatus = 'PENDING' | 'FILLED' | 'REJECTED';

export interface OrderableInstrument {
  id: number;
  ticker: string;
  name: string;
  last_price: number;
  quantity?: number; // cantidad de acciones en cartera (disponible solo al abrir desde portfolio)
}

export interface OrderRequest {
  instrument_id: number;
  side: OrderSide;
  type: OrderType;
  quantity: number;
  price?: number;
}

export interface OrderResponse {
  id: number;
  status: OrderStatus;
}
