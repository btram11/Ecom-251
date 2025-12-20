// app/checkout/shipping/page.tsx
"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import { useState } from "react";
import Link from "next/link";
import { CheckoutSteps } from "@shared/components/checkout/checkout-steps";
import { OrderSummary } from "@shared/components/checkout/order-summary";

type Step = 1 | 2;

type ShippingOption = {
  id: string;
  label: string;
  description: string;
  price: number;
};

type SellerItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};

type Seller = {
  id: string;
  name: string;
  items: SellerItem[];
  shippingOptions: ShippingOption[];
};

// demo: 2 seller giống kiểu Package 1/2/3
const SELLERS: Seller[] = [
  {
    id: "farmer-1",
    name: "Nông trại Xanh 247",
    items: [
      {
        id: 1,
        name: "Ốp lưng Nokia 8.1 (x7) nhôm xước đen",
        quantity: 2,
        price: 55_000,
      },
    ],
    shippingOptions: [
      {
        id: "priority-24h",
        label: "Priority 24H",
        description: "Giao chậm nhất ngày mai.",
        price: 16_500,
      },
      {
        id: "priority-instant",
        label: "Priority Instant",
        description: "Giao trong hôm nay, được hoàn tiền nếu trễ.",
        price: 54_500,
      },
    ],
  },
  {
    id: "farmer-2",
    name: "Nhật Nguyễn ST",
    items: [
      {
        id: 2,
        name: "1 blister 5 tablets battery Maxell Japan cho đồng hồ",
        quantity: 1,
        price: 83_980,
      },
      {
        id: 3,
        name: "1 blister 5 tablets battery Maxell Japan cho đồng hồ (size khác)",
        quantity: 2,
        price: 54_340,
      },
    ],
    shippingOptions: [
      {
        id: "priority-24h",
        label: "Priority 24H",
        description: "Giao chậm nhất ngày mai.",
        price: 16_500,
      },
      {
        id: "priority-instant",
        label: "Priority Instant",
        description: "Giao trong hôm nay, được hoàn tiền nếu trễ.",
        price: 47_500,
      },
    ],
  },
];

function formatCurrency(value: number) {
  return value.toLocaleString("vi-VN") + " đ";
}

export default function ShippingPage() {
  const [step, setStep] = useState<Step>(1);

  // mỗi seller 1 shippingMethod riêng, default = option đầu tiên
  const [shippingMethods, setShippingMethods] = useState<
    Record<string, string>
  >(() =>
    Object.fromEntries(
      SELLERS.map((seller) => [seller.id, seller.shippingOptions[0]?.id])
    )
  );

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handleShippingChange = (sellerId: string, value: string) => {
    setShippingMethods((prev) => ({ ...prev, [sellerId]: value }));
  };

  // 👉 gộp toàn bộ item của các seller để dùng cho OrderSummary
  const allItems = SELLERS.flatMap((seller) => seller.items);

  // 👉 tính tổng phí ship dựa trên shippingMethods hiện tại
  const totalShippingFee = SELLERS.reduce((sum, seller) => {
    const selectedId = shippingMethods[seller.id];
    const selectedOpt = seller.shippingOptions.find(
      (opt) => opt.id === selectedId
    );
    return sum + (selectedOpt?.price ?? 0);
  }, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <span className="text-lg font-semibold text-emerald-700">
            FarmFresh
          </span>
          <span className="text-xs text-slate-500">Giỏ hàng • Thanh toán</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <CheckoutSteps currentStep={step} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          {/* LEFT: multistep form */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-slate-900">
              {step === 1 ? "Thông tin giao hàng" : "Phương thức thanh toán"}
            </h2>

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: submit order
              }}
            >
              {/* STEP 1: địa chỉ + package per seller */}
              <div className={step === 1 ? "space-y-6" : "hidden"}>
                {/* Thông tin người nhận */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="fullName"
                      className="text-sm font-medium text-slate-700"
                    >
                      Họ và tên *
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-slate-700"
                    >
                      Số điện thoại *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      placeholder="09xx xxx xxx"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="address"
                    className="text-sm font-medium text-slate-700"
                  >
                    Địa chỉ giao hàng *
                  </label>
                  <input
                    id="address"
                    name="address"
                    className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Số nhà, tên đường..."
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="district"
                      className="text-sm font-medium text-slate-700"
                    >
                      Quận / Huyện
                    </label>
                    <input
                      id="district"
                      name="district"
                      className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      placeholder="Quận 1"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="city"
                      className="text-sm font-medium text-slate-700"
                    >
                      Tỉnh / Thành phố
                    </label>
                    <input
                      id="city"
                      name="city"
                      className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      placeholder="TP. Hồ Chí Minh"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="zip"
                      className="text-sm font-medium text-slate-700"
                    >
                      Mã bưu điện
                    </label>
                    <input
                      id="zip"
                      name="zip"
                      className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      placeholder="700000"
                    />
                  </div>
                </div>

                {/* Package per seller – giống Lazada/Shopee */}
                <div className="space-y-4 pt-2">
                  {SELLERS.map((seller, index) => (
                    <div
                      key={seller.id}
                      className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50/60"
                    >
                      {/* header: Package + seller name */}
                      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-4 py-2 text-xs text-slate-600">
                        <span className="font-medium">
                          Gói {index + 1} / {SELLERS.length}
                        </span>
                        <span>
                          Người bán:{" "}
                          <span className="font-semibold text-slate-900">
                            {seller.name}
                          </span>
                        </span>
                      </div>

                      {/* Delivery options */}
                      <div className="border-b border-slate-200 bg-white px-4 py-3">
                        <p className="mb-2 text-sm font-semibold text-slate-900">
                          Tuỳ chọn giao hàng
                        </p>
                        <RadioGroup.Root
                          className="flex flex-col gap-3 md:flex-row"
                          value={shippingMethods[seller.id]}
                          onValueChange={(value) =>
                            handleShippingChange(seller.id, value)
                          }
                        >
                          {seller.shippingOptions.map((opt) => (
                            <RadioGroup.Item
                              key={opt.id}
                              value={opt.id}
                              className="flex flex-1 cursor-pointer flex-col justify-between rounded-lg border border-slate-200 bg-white p-3 text-left text-sm outline-none transition hover:border-emerald-400 hover:bg-emerald-50/40 data-[state=checked]:border-emerald-500 data-[state=checked]:shadow-sm"
                            >
                              <div className="mb-1 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <div className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-400">
                                    <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-emerald-500" />
                                  </div>
                                  <span className="text-sm font-medium text-slate-900">
                                    {opt.label}
                                  </span>
                                </div>
                                <span className="text-sm font-semibold text-slate-800">
                                  {formatCurrency(opt.price)}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500">
                                {opt.description}
                              </p>
                            </RadioGroup.Item>
                          ))}
                        </RadioGroup.Root>
                      </div>

                      {/* Items của package */}
                      <div className="bg-white px-4 py-3">
                        {seller.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 border-b border-slate-100 py-3 last:border-b-0"
                          >
                            {/* Ảnh placeholder */}
                            <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-slate-100">
                              <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-400">
                                Ảnh
                              </div>
                            </div>

                            <div className="flex flex-1 flex-col gap-1 text-sm">
                              <p className="line-clamp-2 font-medium text-slate-900">
                                {item.name}
                              </p>
                              <div className="flex items-center justify-between text-xs text-slate-500">
                                <span>Qty: {item.quantity}</span>
                                <span className="text-sm font-semibold text-slate-800">
                                  {formatCurrency(item.price)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <Link
                    href="/cart"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                  >
                    Quay lại giỏ hàng
                  </Link>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex h-10 items-center justify-center rounded-md bg-emerald-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                  >
                    Tiếp tục
                  </button>
                </div>
              </div>

              {/* STEP 2: Payment */}
              <div className={step === 2 ? "space-y-6" : "hidden"}>
                <RadioGroup.Root
                  className="space-y-3"
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                >
                  <RadioGroup.Item
                    value="cod"
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-white p-3 outline-none transition hover:border-emerald-400 hover:bg-emerald-50/40 data-[state=checked]:border-emerald-500 data-[state=checked]:shadow-sm"
                  >
                    <div className="mt-1 flex h-4 w-4 items-center justify-center rounded-full border border-slate-400">
                      <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        Thanh toán khi nhận hàng (COD)
                      </p>
                      <p className="text-xs text-slate-500">
                        Thanh toán tiền mặt hoặc quẹt thẻ với shipper khi nhận
                        hàng. Phù hợp cho lần mua đầu tiên.
                      </p>
                    </div>
                  </RadioGroup.Item>

                  <RadioGroup.Item
                    value="momo"
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-white p-3 outline-none transition hover:border-emerald-400 hover:bg-emerald-50/40 data-[state=checked]:border-emerald-500 data-[state=checked]:shadow-sm"
                  >
                    <div className="mt-1 flex h-4 w-4 items-center justify-center rounded-full border border-slate-400">
                      <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        Ví MoMo
                      </p>
                      <p className="text-xs text-slate-500">
                        Thanh toán nhanh qua ứng dụng MoMo. Sau khi đặt hàng, hệ
                        thống sẽ chuyển sang màn hình thanh toán an toàn.
                      </p>
                    </div>
                    <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-semibold text-rose-600">
                      Khuyên dùng
                    </span>
                  </RadioGroup.Item>
                </RadioGroup.Root>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                  >
                    Quay lại
                  </button>

                  <button
                    type="submit"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-emerald-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                  >
                    Xác nhận đặt hàng
                  </button>
                </div>
              </div>
            </form>
          </section>

          {/* RIGHT: order summary */}
          <OrderSummary items={allItems} shippingFee={totalShippingFee} />
        </div>
      </main>
    </div>
  );
}
