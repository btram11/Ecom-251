import Image from "next/image";
import type { ICartItem } from "@/entities/cart";
import { formatCurrency } from "@/shared/utils/format";

export function PackageItem({ item }: { item: ICartItem }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-slate-100 py-3 first:border-t-0">
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-md bg-slate-100">
          <Image
            src={item.imageUrl ?? "/placeholder.png"}
            alt={item.name}
            fill
            className="object-cover"
            unoptimized={item.imageUrl.startsWith("http://localhost")}
          />
        </div>

        <div className="min-w-0">
          <div className="line-clamp-1 text-sm font-semibold text-slate-900">
            {item.name}
          </div>
          <div className="text-xs text-slate-500">Qty: {item.qty}</div>
        </div>
      </div>

      <div className="shrink-0 text-sm font-semibold text-slate-700">
        {formatCurrency(item.qty * item.price)}
      </div>
    </div>
  );
}
