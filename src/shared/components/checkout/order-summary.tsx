// components/checkout/order-summary.tsx
"use client";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type OrderSummaryProps = {
  items: CartItem[];
  shippingFee: number;
};

function formatVnd(amount: number) {
  return amount.toLocaleString("vi-VN") + " đ";
}

export function OrderSummary({ items, shippingFee }: OrderSummaryProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = subtotal + shippingFee;

  return (
    <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-slate-900">
        Đơn hàng của bạn
      </h2>

      {/* Summary gọn, không lặp lại full danh sách sản phẩm */}
      <div className="mb-4 rounded-md bg-slate-50 px-3 py-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Số sản phẩm</span>
          <span className="font-semibold text-slate-900">{totalQuantity}</span>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Tạm tính</span>
          <span>{formatVnd(subtotal)}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Phí vận chuyển</span>
          <span>{formatVnd(shippingFee)}</span>
        </div>

        {/* chỗ này sau này Mèo thêm voucher, coins... thì chèn vào giữa đây */}

        <div className="mt-2 flex justify-between border-t border-dashed border-slate-200 pt-3 text-base font-semibold">
          <span>Tổng cộng</span>
          <span className="text-emerald-600">{formatVnd(total)}</span>
        </div>
      </div>
    </aside>
  );
}
