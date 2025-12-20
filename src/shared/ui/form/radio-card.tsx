"use client";

import * as React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { cn } from "@/shared/utils/cn";

export type RadioCardOption<T extends string> = {
  id: T;
  title: React.ReactNode;
  description?: React.ReactNode;
  right?: React.ReactNode; // ví dụ fee/price
  disabled?: boolean;
};

export function RadioCardGroup<T extends string>({
  name,
  options,
  value,
  onChange,
  columns = 1,
  className,
}: {
  name?: string;
  options: RadioCardOption<T>[];
  value: T;
  onChange: (v: T) => void;
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <RadioGroup.Root
      name={name}
      value={value}
      onValueChange={(v) => onChange(v as T)}
      className={cn("grid gap-3", columns === 2 && "sm:grid-cols-2", className)}
    >
      {options.map((opt) => (
        <RadioGroup.Item
          key={opt.id}
          value={opt.id}
          disabled={opt.disabled}
          className={cn(
            "group flex w-full items-start justify-between gap-3 rounded-lg border p-4 text-left transition",
            "border-slate-200 bg-white hover:bg-slate-50",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
            "data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-50",
            "disabled:cursor-not-allowed disabled:opacity-60"
          )}
        >
          <div className="flex min-w-0 items-start gap-3">
            {/* Radio dot */}
            <div
              className={cn(
                "mt-1 grid h-4 w-4 place-items-center rounded-full border aspect-square",
                "border-slate-300 bg-white",
                "group-data-[state=checked]:border-emerald-600"
              )}
            >
              <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-emerald-600" />
            </div>

            {/* Text */}
            <div className="min-w-0">
              <div className="text-sm font-semibold text-slate-900">
                {opt.title}
              </div>
              {opt.description ? (
                <div className="mt-0.5 text-xs text-slate-500">
                  {opt.description}
                </div>
              ) : null}
            </div>
          </div>

          {/* Right slot */}
          {opt.right ? (
            <div className="shrink-0 text-sm font-semibold text-slate-900">
              {opt.right}
            </div>
          ) : null}
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
}
