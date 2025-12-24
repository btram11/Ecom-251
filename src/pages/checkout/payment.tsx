"use client";
import { useMemo, useState } from "react";

import {
  CheckoutSteps,
  OrderSummary,
  PaymentMethodPicker,
  DEFAULT_SHIPPING_OPTIONS,
  useCheckout,
  useCheckoutCart,
} from "@/features/purchase/checkout";
import { useRouter } from "next/navigation";
import { Button } from "@shared/ui/button";

export function CheckoutPaymentPage() {
  const router = useRouter();

  const { groups, subtotal } = useCheckoutCart();
  const { shippingByGroup, paymentMethod, setPaymentMethod } = useCheckout();
  const [isLoading, setIsLoading] = useState(false);

  const shippingFee = useMemo(() => {
    return groups.reduce((acc, g) => {
      const selectedId =
        shippingByGroup[g.id] ?? DEFAULT_SHIPPING_OPTIONS[0].id;
      const opt = DEFAULT_SHIPPING_OPTIONS.find((x) => x.id === selectedId);
      return acc + (opt?.fee ?? 0);
    }, 0);
  }, [groups, shippingByGroup]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-slate-900">Thanh toán</h1>
        <CheckoutSteps step={2} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Left */}
        <div className="rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 px-5 py-4">
            <div className="text-base font-semibold text-slate-900">
              Phương thức thanh toán
            </div>
          </div>

          <div className="px-5 py-5">
            <PaymentMethodPicker
              value={paymentMethod}
              onChange={setPaymentMethod}
            />

            <div className="mt-6 flex items-center justify-between gap-3">
              <Button
                onClick={() => router.back()}
                className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Quay lại bước trước
              </Button>

              <button
                type="button"
                className="rounded-md bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                onClick={async () => {
                  // Collect selected items from cart groups
                  const items = groups
                    .flatMap((g) => g.lines)
                    .filter((l: any) => l.isSelected)
                    .map((l) => ({
                      productId: l.productId,
                      quantity: l.qty,
                    }));

                  if (items.length === 0) {
                    alert("Vui lòng chọn ít nhất một sản phẩm để tiếp tục.");
                    return;
                  }

                  setIsLoading(true);
                  try {
                    // 1) Tạo order ở BE
                    const orderRes = await fetch("http://localhost:8003/api/order", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      credentials: "include", 
                      body: JSON.stringify({ items }),
                    });
                    if (!orderRes.ok) throw new Error("Tạo đơn thất bại");
                    const orderJson = await orderRes.json();
                    if (!orderJson.success) throw new Error(orderJson.message || "Tạo đơn thất bại");
                    const orderId = orderJson.data?.id;
                    if (!orderId) throw new Error("Không nhận được order id từ server");

                    // 2) Tạo payment Momo bằng orderId vừa nhận
                    const payRes = await fetch("http://localhost:8003/api/payment", {
                      method: "POST",
                      credentials: "include", 
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ orderId }),
                    });
                    if (!payRes.ok) throw new Error("Khởi tạo thanh toán thất bại");
                    const payJson = await payRes.json();
                    if (!payJson.success) throw new Error(payJson.message || "Khởi tạo thanh toán thất bại");
                    const payUrl = payJson.data?.payUrl;
                    if (!payUrl) throw new Error("Không nhận được payUrl từ server");

                    // Redirect tới payUrl của Momo
                    window.location.href = payUrl;
                  } catch (err: any) {
                    console.error(err);
                    alert("Có lỗi xảy ra: " + (err?.message ?? String(err)));
                  } finally {
                    setIsLoading(false);
                  }
                }}
                disabled={isLoading}
              >
                {isLoading ? "Đang xử lý..." : "Tiếp tục"}
              </button>
            </div>
          </div>
        </div>

        {/* Right */}
        <OrderSummary
          subtotal={subtotal}
          shippingFee={shippingFee}
          total={subtotal + shippingFee}
        />
      </div>
    </div>
  );
}
