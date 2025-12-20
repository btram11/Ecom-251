import { ShippingOption } from "./types";

export const DEFAULT_SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: "fast",
    label: "Giao nhanh trong 1 - 2 giờ",
    description: "Áp dụng trong nội thành",
    fee: 30000,
  },
  {
    id: "same-day",
    label: "Giao trong ngày",
    description: "Giao trước - cho đơn đặt trước 17h cùng ngày",
    fee: 50000,
  },
];
