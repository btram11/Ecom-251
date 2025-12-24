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

export type OrderProduct = {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
};

export type OrderDetail =  {
  id: string;
  date: string; 
  status: "pending" | "preparing" | "shipped" | "delivered" | "cancelled";
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  products: OrderProduct[];
  paymentMethod: string;
  discount: number;    
  shippingFee: number;
  total: number;
}
