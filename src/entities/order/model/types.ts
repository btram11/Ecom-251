export type OrderStatus = "waiting" | "shipping" | "delivered" | "cancelled" | "WAITING" | "DELIVERING" | "DELIVERED" | "CANCELLED";

export type OrderItem = {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  productUnit: string;
  price: number;
  discount: number;
  quantity: number;
  finalPrice: number;
};

export type Escrow = {
  id: string;
  amount: number;
  escrowStatus: string;
  createdAt: string;
  releaseAt: string | null;
};

export type Order = {
  id: string;
  pick_name: string;
  pick_address: string | null;
  pick_province: string;
  pick_district: string;
  pick_ward: string | null;
  pick_tel: string;
  tel: string;
  name: string;
  address: string;
  province: string;
  district: string;
  ward: string | null;
  hamlet: string | null;
  transport: string;
  pick_money: number;
  value: string | null;
  note: string | null;
  is_freeship: string;
  items: OrderItem[];
  shippingFee: number;
  totalProductPrice: number;
  createdAt: string;
  orderStatus: OrderStatus;
  escrow: Escrow;
};