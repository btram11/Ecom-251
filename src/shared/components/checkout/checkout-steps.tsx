// components/checkout/CheckoutSteps.tsx
"use client";

import Link from "next/link";
import clsx from "clsx";

type CheckoutStepsProps = {
  currentStep: 1 | 2;
};

const steps = [
  { id: 1, label: "Thông tin giao hàng" },
  { id: 2, label: "Phương thức thanh toán" },
];

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <h1 className="text-xl font-semibold text-slate-900">Thanh toán</h1>

      <div className="flex items-center gap-4 text-sm">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isDone = step.id < currentStep;

          return (
            <div key={step.id} className="flex items-center gap-2">
              <div
                className={clsx(
                  "flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold transition",
                  isActive &&
                    "border-emerald-500 bg-emerald-500 text-white shadow-sm",
                  isDone &&
                    "!border-emerald-500 text-emerald-600 bg-emerald-50",
                  !isActive && !isDone && "border-slate-300 text-slate-500"
                )}
              >
                {step.id}
              </div>
              <span
                className={clsx(
                  "hidden text-xs font-medium sm:inline-block",
                  isActive && "text-slate-900",
                  isDone && "text-emerald-700",
                  !isActive && !isDone && "text-slate-500"
                )}
              >
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <span className="mx-1 hidden text-slate-300 sm:inline">—</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
