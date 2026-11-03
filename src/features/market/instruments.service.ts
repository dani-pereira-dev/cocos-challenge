import { Instrument } from '@/domain/entities/instrument';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { apiClient } from '@/services/api-client';

export async function fetchInstruments(): Promise<Instrument[]> {
  return apiClient.get<Instrument[]>(API_ENDPOINTS.instruments);
}
