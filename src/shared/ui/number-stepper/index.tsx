"use client";

import { cn } from "@shared/utils/cn";

type NumberStepperProps = {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;

  min?: number;
  max?: number;

  size?: "sm" | "md";
  className?: string;

  disabled?: boolean;
};

export function NumberStepper({
  value,
  onDecrease,
  onIncrease,
  min = 1,
  max,
  size = "sm",
  className,
  disabled,
}: NumberStepperProps) {
  const decDisabled = disabled || value <= min;
  const incDisabled = disabled || (typeof max === "number" && value >= max);

  const wrap = size === "sm" ? "p-0.5 text-[12px]" : "px-2 py-1 text-xs";
  const btn = size === "sm" ? "h-5 w-5" : "h-6 w-6";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-slate-200",
        wrap,
        className ?? ""
      )}
      aria-label="Chỉnh số lượng"
    >
      <button
        type="button"
        onClick={onDecrease}
        disabled={decDisabled}
        aria-label="Giảm số lượng"
        className={cn(
          "flex items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100",
          btn,
          decDisabled
            ? "opacity-40 cursor-not-allowed hover:bg-transparent"
            : ""
        )}
      >
        −
      </button>

      <span className="min-w-4 text-center text-slate-700">{value}</span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={incDisabled}
        aria-label="Tăng số lượng"
        className={cn(
          "flex items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100",
          btn,
          incDisabled
            ? "opacity-40 cursor-not-allowed hover:bg-transparent"
            : ""
        )}
      >
        +
      </button>
    </div>
  );
}
