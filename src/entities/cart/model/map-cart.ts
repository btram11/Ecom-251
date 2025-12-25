import { getProductById } from '@/entities/product/api/get-product';
import type { ICartItemGroup } from '@/entities/cart';
import { CartItemResponse } from '../api/types';

export async function mapCartToGroups(cartItems: CartItemResponse[]): Promise<ICartItemGroup[]> {
  if (!Array.isArray(cartItems)) return [];

  const groups: Record<string, ICartItemGroup> = {};

  for (const item of cartItems) {
    const product = await getProductById(item.productId);

    if (!groups[item.sellerId]) {
      groups[item.sellerId] = {
        id: item.sellerId,
        sellerId: item.sellerId,
        sellerName: item.sellerName ?? 'Người bán',
        lines: [],
        isSelected: false,
      };
    }

    groups[item.sellerId].lines.push({
      id: `${item.sellerId}-${item.productId}`,
      productId: product?.id?.toString() ?? '0',
      name: product?.name ?? 'Sản phẩm',
      imageUrl: product?.images?.[0] || '/placeholder.png',
      price: (product?.priceVndPerKg ?? product?.price) || 0,
      qty: item.amount > 1 ? item.amount : 1,
      isSelected: false,
      sellerId: '',
    });
  }

  return Object.values(groups);
}
