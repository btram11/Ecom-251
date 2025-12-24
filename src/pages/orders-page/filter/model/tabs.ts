import type { Order, OrderStatus } from "@/entities/order/model/types";

export type OrderTab =
  | "Tất cả"
  | "Chờ xác nhận"
  | "Đang giao"
  | "Đã giao"
  | "Đã hủy";

export const ORDER_TABS: OrderTab[] = [
  "Tất cả",
  "Chờ xác nhận",
  "Đang giao",
  "Đã giao",
  "Đã hủy",
];

const tabToStatus: Record<Exclude<OrderTab, "Tất cả">, OrderStatus[]> = {
  "Chờ xác nhận": ["waiting", "WAITING"],
  "Đang giao": ["shipping", "DELIVERING"],
  "Đã giao": ["delivered", "DELIVERED"],
  "Đã hủy": ["cancelled", "CANCELLED"],
};

export function filterOrdersByTab(orders: Order[], tab: OrderTab) {
  if (tab === "Tất cả") return orders;
  const statuses = tabToStatus[tab];
  return orders.filter((o) => statuses.includes(o.orderStatus));
}