"use client";

import Link from "next/link";

import { FormProvider } from "react-hook-form";

import {
  DEFAULT_SHIPPING_OPTIONS,
  CheckoutSteps,
  CheckoutAddressSection,
  OrderSummary,
  PackageCard,
} from "@/features/purchase/checkout";
import { Button } from "@shared/ui/button";
import { useCheckoutPage } from "./model/use-checkout-page";

export function CheckoutPage() {
  const {
    methods,
    submit,
    groups,
    subtotal,
    shippingFee,
    shippingByGroup,
    setShippingForGroup,
  } = useCheckoutPage();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-slate-900">Thanh toán</h1>
        <CheckoutSteps step={1} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Left */}
        <div className="rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 px-5 py-4">
            <div className="text-base font-semibold text-slate-900">
              Thông tin giao hàng
            </div>
          </div>

          <FormProvider {...methods}>
            <form className="px-5 py-5" onSubmit={submit} noValidate>
              <CheckoutAddressSection />

              <div className="mt-6 space-y-4">
                {groups.map((g, idx) => (
                  <PackageCard
                    key={g.id}
                    group={g}
                    index={idx}
                    totalGroups={groups.length}
                    shippingOptions={DEFAULT_SHIPPING_OPTIONS}
                    selectedShippingId={
                      shippingByGroup[g.id] ?? DEFAULT_SHIPPING_OPTIONS[0].id
                    }
                    onChangeShipping={(shippingId) =>
                      setShippingForGroup(g.id, shippingId)
                    }
                  />
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <Link
                  href="/cart"
                  className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Quay lại giỏ hàng
                </Link>

                <Button
                  type="submit"
                  className="rounded-md bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Tiếp tục
                </Button>
              </div>
            </form>
          </FormProvider>
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
