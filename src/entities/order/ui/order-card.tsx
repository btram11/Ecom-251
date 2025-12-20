import Image from "next/image";
import { Eye } from "lucide-react";
import type { Order } from "../model/types";
import { ORDER_STATUS_META } from "../model/status";

export function OrderCard({
  order,
  onViewDetails,
}: {
  order: Order;
  onViewDetails?: (orderId: string) => void;
}) {
  const meta = ORDER_STATUS_META[order.status];
  const Icon = meta.Icon;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-50 rounded-full">
            <Icon className={`w-5 h-5 ${meta.iconClass}`} />
          </div>

          <div>
            <p className="font-bold text-gray-800">Đơn hàng {order.id}</p>
            <p className="text-xs text-gray-400">{order.date}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
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
            <div className="w-16 h-16 bg-gray-100 rounded-lg relative overflow-hidden flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500">SL: {item.qty}</p>
              </div>

              <span className="text-sm font-medium text-gray-700">
                {item.price.toLocaleString()} đ
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <span className="text-sm text-gray-500">Thành tiền:</span>
        <span className="text-lg font-bold text-gray-800">
          Tổng cộng: {order.total.toLocaleString()} đ
        </span>
      </div>
    </div>
  );
}
