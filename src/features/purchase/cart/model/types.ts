export type CartSeller = {
  id: string;
  name: string;
};

// src/features/cart/types.ts
export type CartLine = {
  id: string;
  sellerId: string;
  name: string;
  price: number; // giá đang bán
  originalPrice?: number; // giá gốc (nếu có giảm)
  qty: number;
  imageUrl: string;
};
