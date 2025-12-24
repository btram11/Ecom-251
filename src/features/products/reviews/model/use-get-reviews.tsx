import { useQuery, keepPreviousData, QueryClient } from '@tanstack/react-query';
import type { Review } from './types';
import { getProductReviews, GetReviewsParams } from '../api/get-reviews';
import { Page } from '@shared/api';

export const getReviewQueryKey = (params: GetReviewsParams) =>
  [
    'reviews',
    params.sellerID,
    params.productID,
    params.page,
    params.pageSize,
    params.sort ?? 'asc',
  ] as const;

export function useGetReviews(params: GetReviewsParams) {
  const enabled = !!params.sellerID && !!params.productID;
  return useQuery<Page<Review>, Error>({
    enabled,
    queryKey: getReviewQueryKey(params),
    queryFn: () => getProductReviews(params),
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: true,
    retry: 1,
    placeholderData: keepPreviousData,
  });
}

export async function prefetchReviews(queryClient: QueryClient, params: GetReviewsParams) {
  await queryClient.prefetchQuery({
    queryKey: getReviewQueryKey(params),
    queryFn: () => getProductReviews(params),
  });
}
