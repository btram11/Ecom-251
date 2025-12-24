import { Eye } from "lucide-react";
import type { Order } from "../model/types";
import { ORDER_STATUS_META } from "../model/status";
import { formatOrderId } from "../lib/format-order-id";

export function OrderCard({
  order,
  onViewDetails,
}: {
  order: Order;
  onViewDetails?: (orderId: string) => void;
}) {
  const meta = ORDER_STATUS_META[order.orderStatus] || ORDER_STATUS_META.WAITING;

  const formattedDate = new Date(order.createdAt).toLocaleDateString("vi-VN");

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
      {/* Header */}
      <div className="border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="font-semibold text-gray-900">{formatOrderId(order.id, order.createdAt)}</h3>
            <p className="text-xs text-gray-500">{formattedDate}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-4 py-1.5 rounded-full text-xs font-bold ${meta.badgeClass}`}
          >
            {meta.label}
          </span>

          <button
            type="button"
            onClick={() => onViewDetails?.(order.id)}
            className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-gray-50 transition"
          >
            <Eye className="w-4 h-4 text-gray-600" />
            Xem chi tiết
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        {order.items.map((item, idx) => (
          <div
            key={item.id}
            className={`flex gap-4 py-3 ${
              idx !== 0 ? "border-t border-gray-50" : ""
            }`}
          >
            <img
              src={item.productImage}
              alt={item.productName}
              className="h-16 w-16 rounded object-cover bg-gray-100"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{item.productName}</p>
              <p className="text-sm text-gray-500">
                {item.quantity} x {item.productUnit}
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {item.finalPrice} đ
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <span className="text-sm text-gray-500">Thành tiền:</span>
        <span className="text-lg font-bold text-gray-800">
          {order.pick_money} đ
        </span>
      </div>
    </div>
  );
}