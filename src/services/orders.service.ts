import { OrderRequest, OrderResponse } from '@/domain/entities/order';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { apiClient } from './api-client';

export async function submitOrder(order: OrderRequest): Promise<OrderResponse> {
  return apiClient.post<OrderResponse>(API_ENDPOINTS.orders, order);
}
