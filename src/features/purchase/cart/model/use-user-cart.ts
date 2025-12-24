import { CartItemResponse, getUserCart } from '@entities/cart';
import { useQuery } from '@tanstack/react-query';

export const cartKeys = {
  all: ['cart'] as const,
  user: () => [...cartKeys.all, 'user'] as const,
};

export function useUserCartQuery(options?: { refetchInterval?: number; enabled?: boolean }) {
  return useQuery<CartItemResponse[]>({
    queryKey: cartKeys.user(),
    queryFn: getUserCart,

    // polling
    refetchInterval: options?.refetchInterval ?? 3000, // 3s/lần
    refetchIntervalInBackground: true, // vẫn refetch khi tab không focus
    staleTime: 0,
    gcTime: 5 * 60 * 1000,

    enabled: options?.enabled ?? true,
    refetchOnWindowFocus: true,
  });
}
