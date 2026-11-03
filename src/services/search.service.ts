import { Instrument } from '@/domain/entities/instrument';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { apiClient } from './api-client';

export async function searchInstruments(query: string): Promise<Instrument[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];
  return apiClient.get<Instrument[]>(API_ENDPOINTS.search(trimmed));
}
