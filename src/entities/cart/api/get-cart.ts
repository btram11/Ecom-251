import { api } from '@shared/api';
import { CartItemResponse } from './types';
import { apiUrl } from '@shared/lib/api-helper';
import { paths } from '@shared/config/paths';

export async function getUserCart(): Promise<CartItemResponse[]> {
  const res = await api.get<CartItemResponse[]>(apiUrl(paths.users.cart), {
    cache: 'no-store',
    throwOnError: true,
    errorMessage: 'Failed to fetch cart',
  });
  return res.data;
}
