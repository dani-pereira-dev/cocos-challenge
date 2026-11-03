import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { InstrumentWithReturn } from '@/domain/entities/instrument';
import { calculateInstrumentReturn } from '@/domain/use-cases/calculations';
import { fetchInstruments } from '../instruments.service';
import { queryKeys } from '@/hooks/query-keys';

/**
 * Obtiene y cachea el listado de instrumentos del mercado.
 * La transformación se hace con useMemo para evitar loops de re-render
 * causados por el select inline en React Query v5 + React 19.
 */
export function useInstrumentsQuery() {
  const query = useQuery({
    queryKey: queryKeys.instruments.all,
    queryFn: fetchInstruments,
  });

  const data = useMemo(
    (): InstrumentWithReturn[] | undefined =>
      query.data?.map((instrument) => ({
        ...instrument,
        return_rate: calculateInstrumentReturn(instrument.last_price, instrument.close_price),
      })),
    [query.data],
  );

  return { ...query, data };
}
