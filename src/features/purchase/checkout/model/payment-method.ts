import { PaymentMethod } from "./types";

export type PaymentOption = {
  id: PaymentMethod;
  title: string;
  desc: string;
};

export const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: "COD",
    title: "Thanh toán khi nhận hàng (COD)",
    desc: "Thanh toán tiền mặt hoặc quẹt thẻ với shipper khi nhận hàng.",
  },
  {
    id: "MOMO",
    title: "Ví MoMo",
    desc: "Thanh toán nhanh qua ứng dụng MoMo. Sau khi đặt hàng, hệ thống sẽ chuyển sang màn hình thanh toán an toàn.",
  },
];
