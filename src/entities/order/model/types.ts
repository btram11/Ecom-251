export type OrderStatus = "pending" | "shipping" | "delivered" | "cancelled";

export type OrderItem = {
  id: number;
  name: string;
  qty: number;
  price: number;
  image: string;
};

export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
};
