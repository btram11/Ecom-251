export interface ICartItem {
  id: string;
  productId: number;
  sellerId: string;
  name: string;
  qty: number;

  price: number;
  originalPrice?: number;

  imageUrl: string;
  isSelected?: boolean;
}

export interface ICartItemGroup {
  id: string;
  sellerId: string;
  sellerName: string;
  lines: ICartItem[];
  isSelected: boolean; // may not be needed but for now we keep it
}
