import { PortfolioResponse } from '@/domain/entities/portfolio';
import { apiClient } from './api-client';

/**
 * Obtiene el portafolio del usuario: efectivo disponible y posiciones abiertas.
 * La API devuelve { cash, holdings }.
 */
export async function fetchPortfolio(): Promise<PortfolioResponse> {
  return apiClient.get<PortfolioResponse>('/portfolio');
}
