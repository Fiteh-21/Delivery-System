import { useQuery } from '@tanstack/react-query'
import type { PlaceOrderData } from '@/lib/customer/orderService'
import { getOrders, getOrder, placeOrder } from '@/lib/customer/orderService'

export function useOrdersQuery(status?: string) {
  return useQuery({
    queryKey: ['orders', status],
    queryFn: () => getOrders(status),
  })
}

export function useOrderDetailQuery(id: number) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrder(id),
    enabled: !!id,
  })
}

export function usePlaceOrderMutation() {
  return {
    mutateAsync: async (data: PlaceOrderData) => {
      return placeOrder(data)
    },
    isPending: false,
  }
}
