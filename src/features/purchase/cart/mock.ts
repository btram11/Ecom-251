// src/features/cart/mock.ts
import { CartLine, CartSeller } from "./types";

export const MOCK_SELLERS: CartSeller[] = [
  {
    id: "seller-1",
    name: "Nông trại xanh",
  },
  {
    id: "seller-2",
    name: "Trang trại hữu cơ Đà Lạt",
  },
];

export const MOCK_CART_LINES: CartLine[] = [
  {
    id: "1",
    name: "Cải bó xôi",
    // có giảm giá: hiển thị giá gốc gạch ngang + giá mới
    originalPrice: 55000,
    price: 45000,
    qty: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
    sellerId: "seller-1",
  },
  {
    id: "2",
    name: "Cải bó xôi",
    // cũng giảm giá nhưng ít hơn chút
    originalPrice: 50000,
    price: 45000,
    qty: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
    sellerId: "seller-1",
  },
  {
    id: "3",
    name: "Cà chua bi",
    // không giảm giá → chỉ hiện 1 giá
    price: 30000,
    qty: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop",
    sellerId: "seller-2",
  },
];

// src/features/cart/mock.ts
import type { ICartItem, ICartItemGroup } from "@entities/cart";

export const MOCK_CART_ITEMS: ICartItem[] = [
  {
    id: "1",
    sellerId: "seller-1",
    // productId: "product-spinach-1",
    name: "Cải bó xôi",
    qty: 1,
    originalPrice: 55000,
    price: 45000,

    imageUrl:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
    isSelected: true,
  },
  {
    id: "2",
    sellerId: "seller-1",
    // productId: "product-spinach-2",
    name: "Cải bó xôi",
    qty: 2,
    originalPrice: 50000,
    price: 45000,

    imageUrl: "/images/spinach.jpg",
    isSelected: true,
  },
  {
    id: "3",
    sellerId: "seller-2",
    // productId: "product-tomato-1",
    name: "Cà chua bi",
    qty: 1,
    price: 30000,

    imageUrl:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop",
    isSelected: false,
  },
];

export const MOCK_CART_GROUPS: ICartItemGroup[] = [
  {
    id: "group-seller-1",
    sellerId: "seller-1",
    sellerName: "Nông trại xanh",
    lines: MOCK_CART_ITEMS.filter((it) => it.sellerId === "seller-1"),
    isSelected: false, // optional logic; có thể derive từ lines
  },
  {
    id: "group-seller-2",
    sellerId: "seller-2",
    sellerName: "Trang trại hữu cơ Đà Lạt",
    lines: MOCK_CART_ITEMS.filter((it) => it.sellerId === "seller-2"),
    isSelected: false,
  },
];
