import { Instrument } from '@/domain/entities/instrument';
import { apiClient } from './api-client';

/**
 * Obtiene el listado completo de instrumentos disponibles en el mercado.
 */
export async function fetchInstruments(): Promise<Instrument[]> {
  return apiClient.get<Instrument[]>('/instruments');
}
