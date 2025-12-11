"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import type { CheckedState } from "@radix-ui/react-checkbox";

import { useCartList } from "@entities/cart/model/use-cart-list";
import { Checkbox } from "@shared/ui/form";
import { Button } from "@shared/ui/button";
import { formatCurrency } from "@/shared/utils/format";
import { CartItemGroup } from "@entities/cart/ui/cart-item-group";

const getGroupChecked = (lines: { isSelected?: boolean }[]): CheckedState => {
  const all = lines.length > 0 && lines.every((it) => it.isSelected);
  const some = lines.some((it) => it.isSelected);

  return all ? true : some ? "indeterminate" : false;
};

export function CartSidebar() {
  const {
    groups,
    items,
    cartQty,

    selectedQty,
    selectedSubTotal,
    shipping,
    total,

    allSelected,
    someSelected,

    increase,
    decrease,
    remove,

    toggleItemSelect,
    toggleAll,
    toggleGroupSelection,
    removeSelected,
  } = useCartList();

  const headerChecked: CheckedState = allSelected
    ? true
    : someSelected
    ? "indeterminate"
    : false;

  return (
    <Dialog.Root modal={false}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Mở giỏ hàng"
          className="fixed right-0 top-1/4 z-40 flex h-12 w-7 -translate-y-1/4 items-center justify-center border border-slate-200 bg-white text-slate-600 shadow-md transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-success"
        >
          <ShoppingCart className="h-4 w-4" />
          {cartQty > 0 && (
            <span className="absolute -top-1 -left-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] leading-none text-white">
              {cartQty}
            </span>
          )}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <div className="fixed inset-y-0 right-0 z-50 flex pointer-events-none">
          <Dialog.Content
            onPointerDownOutside={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
            className="pointer-events-auto ml-auto flex h-full w-[min(192px,92vw)] flex-col bg-white shadow-2xl ring-1 ring-slate-200 data-[state=open]:animate-slideInRight data-[state=closed]:animate-slideOutRight"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-3 py-4">
              <div className="flex items-center gap-2">
                <Dialog.Title className="text-sm font-semibold text-slate-900">
                  Giỏ hàng
                </Dialog.Title>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                  {cartQty}
                </span>
              </div>

              <Dialog.Close asChild>
                <button
                  aria-label="Đóng"
                  className="rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 6l12 12M18 6 6 18"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </Dialog.Close>
            </div>

            {/* Toolbar */}
            {/* <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-1.5 py-2 text-xs">
              <label className="flex items-center gap-2 text-slate-600">
                <Checkbox
                  checked={headerChecked}
                  onCheckedChange={() => toggleAll()}
                  className="h-3.5 w-3.5"
                />
                <span>Chọn tất cả</span>
              </label>

              <button
                type="button"
                onClick={removeSelected}
                disabled={selectedQty === 0}
                className="font-medium text-slate-400 underline-offset-2 hover:text-red-500 hover:underline disabled:cursor-not-allowed disabled:text-slate-300"
              >
                Xóa đã chọn
              </button>
            </div> */}

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-2">
              {items.length === 0 ? (
                <p className="text-center text-sm h-full flex items-center justify-center text-slate-500">
                  Giỏ hàng trống nè.
                </p>
              ) : (
                <div className="space-y-3">
                  {groups.map((group) => (
                    <CartItemGroup
                      key={group.id}
                      groupId={group.id}
                      sellerName={group.sellerName}
                      lines={group.lines}
                      checked={getGroupChecked(group.lines)}
                      onToggleGroup={() => toggleGroupSelection(group.id)}
                      onToggleItem={(itemId) => toggleItemSelect(itemId)}
                      onIncrease={(itemId) => increase(itemId)}
                      onDecrease={(itemId) => decrease(itemId)}
                      onRemove={(itemId) => remove(itemId)}
                      variant="compact"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Footer totals */}
            <div className="border-t border-slate-100 px-3 py-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Tạm tính</span>
                  <span>{formatCurrency(selectedSubTotal)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Phí vận chuyển</span>
                  <span>
                    {selectedQty > 0 ? formatCurrency(shipping) : "0 đ"}
                  </span>
                </div>

                <div className="mt-2 border-t border-slate-200 pt-3">
                  <div className="flex items-center justify-between text-[15px] font-semibold text-slate-900">
                    <span>Tổng cộng</span>
                    <span className="text-emerald-600">
                      {selectedQty > 0 ? formatCurrency(total) : "0 đ"}
                    </span>
                  </div>
                </div>
              </div>

              <Button className="mt-4 w-full" disabled={selectedQty === 0}>
                Thanh toán
              </Button>

              <Button
                variant="ghost"
                asChild
                className="mt-2 w-full justify-center text-xs text-slate-500 hover:bg-slate-50"
              >
                <Link href="/cart">Xem giỏ hàng</Link>
              </Button>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
