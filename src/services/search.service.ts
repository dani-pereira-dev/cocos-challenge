import { Instrument } from '@/domain/entities/instrument';
import { apiClient } from './api-client';

/**
 * Busca instrumentos por ticker usando el endpoint de búsqueda.
 * Retorna un array vacío si el query está vacío para evitar llamadas innecesarias.
 */
export async function searchInstruments(query: string): Promise<Instrument[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];
  return apiClient.get<Instrument[]>(`/search?query=${encodeURIComponent(trimmed)}`);
}
