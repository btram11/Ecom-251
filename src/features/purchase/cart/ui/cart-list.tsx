"use client";

import Link from "next/link";
import type { CheckedState } from "@radix-ui/react-checkbox";

import { Button } from "@shared/ui/button";
import { formatCurrency } from "@/shared/utils/format";
import { useCartListContext } from "@entities/cart";
import { Checkbox } from "@shared/ui/form";

import { CartItemGroup } from "@entities/cart";

export function CartList() {
  const {
    groups,
    items,
    cartQty,
    selectedItems,
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
  } = useCartListContext();

  const headerChecked: CheckedState = allSelected
    ? true
    : someSelected
    ? "indeterminate"
    : false;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <header className="mb-4 flex flex-col gap-2 md:mb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Giỏ hàng của bạn
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              {cartQty > 0
                ? `Bạn có ${cartQty} sản phẩm trong giỏ.`
                : "Giỏ hàng của bạn đang trống."}
            </p>
          </div>

          {items.length > 0 && (
            <div className="flex items-baseline gap-2 text-right">
              <span className="text-xs text-slate-400">
                {selectedQty > 0
                  ? `Tạm tính (${selectedQty} sản phẩm được chọn)`
                  : "Chọn sản phẩm để xem tạm tính"}
              </span>
              <span className="text-base font-semibold text-emerald-600">
                {selectedQty > 0 ? formatCurrency(selectedSubTotal) : "—"}
              </span>
            </div>
          )}
        </header>

        {items.length === 0 ? (
          <div className="mx-auto max-w-md rounded-lg border border-dashed border-slate-200 bg-white px-8 py-12 text-center text-sm text-slate-500">
            <p className="font-medium text-slate-600">
              Chưa có sản phẩm nào trong giỏ.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Khám phá thêm ở{" "}
              <Link
                href="/"
                className="font-semibold text-emerald-600 underline underline-offset-2"
              >
                trang chủ
              </Link>{" "}
              nhé.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,3.2fr)_minmax(0,1.4fr)] lg:items-start">
            <section
              aria-label="Danh sách sản phẩm trong giỏ"
              className="overflow-hidden rounded-md border border-slate-200 bg-white"
            >
              <div className="flex items-center border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-medium text-slate-500">
                <div className="flex w-6 justify-center">
                  <Checkbox
                    checked={headerChecked}
                    onCheckedChange={() => toggleAll()}
                  />
                </div>
                <div className="flex-1 pl-2">Sản phẩm</div>
                <div className="w-[110px] text-right">
                  <button
                    type="button"
                    onClick={removeSelected}
                    disabled={!selectedItems.length}
                    className="text-[11px] font-medium text-slate-400 underline-offset-2 hover:text-red-500 hover:underline disabled:cursor-not-allowed disabled:text-slate-300"
                  >
                    Xóa đã chọn
                  </button>
                </div>
              </div>

              <div>
                {groups.map((group) => {
                  const groupAllSelected =
                    group.lines.length > 0 &&
                    group.lines.every((it) => it.isSelected);

                  const groupSomeSelected =
                    group.lines.some((it) => it.isSelected) &&
                    !groupAllSelected;

                  const groupChecked: CheckedState = groupAllSelected
                    ? true
                    : groupSomeSelected
                    ? "indeterminate"
                    : false;

                  return (
                    <CartItemGroup
                      key={group.id}
                      groupId={group.id}
                      sellerName={group.sellerName}
                      lines={group.lines}
                      checked={groupChecked}
                      onToggleGroup={() => toggleGroupSelection(group.id)}
                      onToggleItem={(itemId) => toggleItemSelect(String(itemId))}
                      onIncrease={(itemId) => increase(String(itemId))}
                      onDecrease={(itemId) => decrease(String(itemId))}
                      onRemove={(itemId) => remove(String(itemId))}
                    />
                  );
                })}
              </div>
            </section>

            <aside
              aria-label="Tóm tắt đơn hàng"
              className="h-max rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:sticky lg:top-24"
            >
              <h2 className="text-sm font-semibold text-slate-900">
                Tóm tắt đơn hàng
              </h2>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Tạm tính</span>
                  <span>
                    {selectedQty > 0 ? formatCurrency(selectedSubTotal) : "0 đ"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Phí vận chuyển dự kiến</span>
                  <span>
                    {selectedQty > 0 ? formatCurrency(shipping) : "0 đ"}
                  </span>
                </div>
                <div className="mt-3 border-t border-slate-200 pt-3">
                  <div className="flex items-center justify-between text-[15px] font-semibold text-slate-900">
                    <span>Tổng cộng</span>
                    <span className="text-red-500">
                      {selectedQty > 0 ? formatCurrency(total) : "0 đ"}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                className="mt-4 w-full"
                disabled={selectedQty === 0}
                asChild
              >
                <Link href="/checkout">Tiến hành thanh toán</Link>
              </Button>

              <Button
                variant="ghost"
                asChild
                className="mt-2 w-full justify-center text-xs text-slate-500 hover:bg-slate-50"
              >
                <Link href="/">Tiếp tục mua sắm</Link>
              </Button>

              <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
                {selectedQty > 0
                  ? "Phí vận chuyển và các phụ phí khác sẽ được cập nhật chính xác ở bước tiếp theo khi bạn nhập địa chỉ nhận hàng."
                  : "Hãy chọn ít nhất một sản phẩm để bắt đầu tạo đơn hàng."}
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
