import type { OrderStatus } from "./types";

export type StatusMeta = {
  label: string;
  badgeClass: string;
};

export const ORDER_STATUS_META: Record<OrderStatus, StatusMeta> = {
  waiting: {
    label: "Chờ xác nhận",
    badgeClass: "bg-yellow-100 text-yellow-800",
  },
  WAITING: {
    label: "Chờ xác nhận",
    badgeClass: "bg-yellow-100 text-yellow-800",
  },
  shipping: {
    label: "Đang giao",
    badgeClass: "bg-blue-100 text-blue-800",
  },
  DELIVERING: {
    label: "Đang giao",
    badgeClass: "bg-blue-100 text-blue-800",
  },
  delivered: {
    label: "Đã giao",
    badgeClass: "bg-green-100 text-green-800",
  },
  DELIVERED: {
    label: "Đã giao",
    badgeClass: "bg-green-100 text-green-800",
  },
  cancelled: {
    label: "Đã hủy",
    badgeClass: "bg-red-100 text-red-800",
  },
  CANCELLED: {
    label: "Đã hủy",
    badgeClass: "bg-red-100 text-red-800",
  },
};