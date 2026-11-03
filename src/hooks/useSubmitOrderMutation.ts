import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OrderRequest } from '@/domain/entities/order';
import { submitOrder } from '@/services/orders.service';
import { queryKeys } from './query-keys';

/**
 * Mutación para enviar una orden de compra o venta.
 * Al completarse con éxito, invalida el caché del portafolio para reflejar los cambios.
 */
export function useSubmitOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (order: OrderRequest) => submitOrder(order),
    onSuccess: () => {
      // Invalida el portafolio para que se actualice tras una orden exitosa
      queryClient.invalidateQueries({ queryKey: queryKeys.portfolio.all });
    },
  });
}
