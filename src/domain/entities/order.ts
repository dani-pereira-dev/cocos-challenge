export type OrderSide = 'BUY' | 'SELL';
export type OrderType = 'MARKET' | 'LIMIT';
export type OrderStatus = 'PENDING' | 'FILLED' | 'REJECTED';

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
