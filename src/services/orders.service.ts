import { OrderRequest, OrderResponse } from '@/domain/entities/order';
import { apiClient } from './api-client';

/**
 * Envía una orden de compra o venta al mercado.
 * Retorna el id y status de la orden creada (PENDING, FILLED o REJECTED).
 */
export async function submitOrder(order: OrderRequest): Promise<OrderResponse> {
  return apiClient.post<OrderResponse>('/orders', order);
}
