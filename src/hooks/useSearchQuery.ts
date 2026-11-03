import { useQuery } from '@tanstack/react-query';
import { searchInstruments } from '@/services/search.service';
import { queryKeys } from './query-keys';

/**
 * Busca instrumentos por ticker con debounce delegado al componente que lo llama.
 * La query se deshabilita automáticamente cuando el input está vacío.
 */
export function useSearchQuery(query: string) {
  return useQuery({
    queryKey: queryKeys.search.byQuery(query),
    queryFn: () => searchInstruments(query),
    enabled: query.trim().length > 0,
    // Los resultados de búsqueda se consideran frescos por 30 segundos
    staleTime: 30 * 1000,
  });
}
