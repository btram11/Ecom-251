"use client";

import Image from "next/image";
import { type ICartItem as CartItem } from "@/entities/cart";
import { formatCurrency } from "@/shared/utils/format";
import { Checkbox } from "@shared/ui/form";
import { Trash2 } from "lucide-react";
import { NumberStepper } from "@shared/ui/number-stepper";

type CartItemProps = {
  item: CartItem;
  selected: boolean;
  onToggleSelect: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;

  variant?: "default" | "compact";
};

export function CartItem({
  item,
  selected,
  onToggleSelect,
  onIncrease,
  onDecrease,
  onRemove,

  variant = "default",
}: CartItemProps) {
  const lineTotal = item.price * item.qty;
  const hasDiscount =
    typeof item.originalPrice === "number" && item.originalPrice > item.price;

  if (variant === "compact") {
    return (
      <div className="py-1">
        <div className="flex gap-2">
          {/* checkbox */}
          <div className="pt-16">
            <Checkbox
              checked={selected}
              onCheckedChange={onToggleSelect}
              // className="h-3.5 w-3.5"
            />
          </div>

          {/* image: nhỏ lại */}
          <div className="flex flex-col gap-1 flex-1">
            <div className="relative w-full overflow-hidden rounded-md bg-slate-100 aspect-square">
              <Image
                src={item.imageUrl ?? "/placeholder.png"}
                alt={item.name}
                fill
                sizes="192px"
                className="object-cover"
                unoptimized={item.imageUrl.startsWith("http://localhost")}
              />
            </div>

            <div className="mt-0.5 flex items-baseline gap-1 leading-tight">
              {hasDiscount && (
                <span className="text-[10px] text-slate-400 line-through whitespace-nowrap">
                  {formatCurrency(item.originalPrice!)}
                </span>
              )}
              <span className="text-sm font-semibold text-emerald-600 whitespace-nowrap">
                {formatCurrency(item.price)}
              </span>
            </div>

            <NumberStepper
              value={item.qty}
              onDecrease={onDecrease}
              onIncrease={onIncrease}
              size="sm"
              className="w-fit"
            />
          </div>

          {/* content */}
          {/* <div className="relative min-w-0 flex-1">
            <button
              type="button"
              onClick={onRemove}
              aria-label="Xóa"
              className="absolute right-0 top-0 text-slate-400 transition hover:text-red-500"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>

            <p className="pr-5 text-xs font-medium text-slate-900 line-clamp-2">
              {item.name}
            </p>

            <div className="mt-0.5 flex flex-col leading-tight">
              {hasDiscount && (
                <span className="text-[10px] text-slate-400 line-through whitespace-nowrap">
                  {formatCurrency(item.originalPrice!)}
                </span>
              )}
              <span className="text-sm font-semibold text-emerald-600 whitespace-nowrap">
                {formatCurrency(item.price)}
              </span>
            </div>

            <div className="mt-1">
              <NumberStepper
                value={item.qty}
                onDecrease={onDecrease}
                onIncrease={onIncrease}
                size="sm"
              />
            </div>
          </div> */}
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-slate-100 py-3 first:border-t-0">
      <div className="flex gap-3 sm:gap-4">
        <div className="hidden w-6 justify-center sm:flex">
          <Checkbox checked={selected} onCheckedChange={onToggleSelect} />
        </div>

        <div className="flex flex-1 gap-3 sm:gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-slate-100 sm:h-20 sm:w-20">
            <Image
              src={item.imageUrl ?? "/placeholder.png"}
              alt={item.name}
              fill
              className="object-cover"
              unoptimized={item.imageUrl.startsWith("http://localhost")}
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <p className="line-clamp-2 text-xs font-medium text-slate-900 sm:text-sm">
              {item.name}
            </p>

            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-[10px] uppercase tracking-wide text-slate-400">
                Đơn giá
              </span>

              {hasDiscount && (
                <span className="text-[11px] text-slate-400 line-through">
                  {formatCurrency(item.originalPrice!)}
                </span>
              )}

              <span className="text-sm font-semibold text-emerald-600 sm:text-base">
                {formatCurrency(item.price)}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-[11px] text-slate-500">Số lượng</span>
              <NumberStepper
                value={item.qty}
                onDecrease={onDecrease}
                onIncrease={onIncrease}
              />
            </div>
          </div>
        </div>

        <div className="ml-2 flex min-w-[130px] flex-col items-end justify-between text-right">
          <button
            type="button"
            onClick={onRemove}
            className="text-[11px] text-slate-400 underline-offset-2 hover:text-red-500 hover:underline"
          >
            Xóa
          </button>

          <div className="flex flex-col">
            <span className="mt-4 text-[10px] uppercase tracking-wide text-slate-400">
              Tổng tiền
            </span>
            <span className="mt-0.5 text-sm font-semibold text-emerald-600 sm:text-base">
              {formatCurrency(lineTotal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
