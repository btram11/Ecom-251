import { formatCurrency } from "@/shared/utils/format";

export function OrderSummary({
  subtotal,
  shippingFee,
  total,
}: {
  subtotal: number;
  shippingFee: number;
  total: number;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="text-base font-semibold text-slate-900">
        Đơn hàng của bạn
      </div>

      <div className="mt-3 space-y-2 text-sm">
        <div className="flex items-center justify-between text-slate-600">
          <span>Tạm tính</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <span>Phí vận chuyển dự kiến</span>
          <span>{formatCurrency(shippingFee)}</span>
        </div>

        <div className="mt-2 border-t border-slate-200 pt-3">
          <div className="flex items-center justify-between font-semibold">
            <span className="text-slate-800">Tổng cộng</span>
            <span className="text-red-600">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
