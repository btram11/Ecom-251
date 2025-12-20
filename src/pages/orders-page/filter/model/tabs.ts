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

const tabToStatus: Record<Exclude<OrderTab, "Tất cả">, OrderStatus> = {
  "Chờ xác nhận": "pending",
  "Đang giao": "shipping",
  "Đã giao": "delivered",
  "Đã hủy": "cancelled",
};

export function filterOrdersByTab(orders: Order[], tab: OrderTab) {
  if (tab === "Tất cả") return orders;
  return orders.filter((o) => o.status === tabToStatus[tab]);
}
