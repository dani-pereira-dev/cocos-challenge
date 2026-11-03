import { PortfolioResponse } from '@/domain/entities/portfolio';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { apiClient } from './api-client';

export async function fetchPortfolio(): Promise<PortfolioResponse> {
  return apiClient.get<PortfolioResponse>(API_ENDPOINTS.portfolio);
}
