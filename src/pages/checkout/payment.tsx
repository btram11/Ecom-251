"use client";
import { useMemo } from "react";

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
                className="rounded-md bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                onClick={() => {
                  // TODO: call API create-order
                  alert("Đặt hàng (demo). Nối API create-order ở đây nha.");
                }}
              >
                Tiếp tục
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
