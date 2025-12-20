import type { LucideIcon } from "lucide-react";
import { Truck, CheckCircle, XCircle, Clock } from "lucide-react";
import type { OrderStatus } from "./types";

export type StatusMeta = {
  label: string;
  badgeClass: string;
  Icon: LucideIcon;
  iconClass: string;
};

export const ORDER_STATUS_META: Record<OrderStatus, StatusMeta> = {
  pending: {
    label: "Chờ xác nhận",
    badgeClass: "text-amber-700 bg-amber-100",
    Icon: Clock,
    iconClass: "text-amber-600",
  },
  shipping: {
    label: "Đang giao",
    badgeClass: "text-purple-700 bg-purple-100",
    Icon: Truck,
    iconClass: "text-purple-600",
  },
  delivered: {
    label: "Đã giao",
    badgeClass: "text-green-700 bg-green-100",
    Icon: CheckCircle,
    iconClass: "text-green-600",
  },
  cancelled: {
    label: "Đã hủy",
    badgeClass: "text-gray-700 bg-gray-100",
    Icon: XCircle,
    iconClass: "text-gray-500",
  },
};
