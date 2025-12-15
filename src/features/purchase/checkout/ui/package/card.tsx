"use client";

import type { ICartItemGroup } from "@/entities/cart";
// import type { ShippingOption } from "@/features/checkout/shipping-method/model/types";
import { ShippingMethodPicker } from "../picker/shipping-method";
import { PackageItem } from "./item";
import { ShippingOption } from "../../model/types";
export function PackageCard({
  group,
  index,
  totalGroups,
  shippingOptions,
  selectedShippingId,
  onChangeShipping,
}: {
  group: ICartItemGroup;
  index: number;
  totalGroups: number;
  shippingOptions: ShippingOption[];
  selectedShippingId: string;
  onChangeShipping: (shippingId: string) => void;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3">
        <div className="text-xs font-semibold text-slate-700">
          Gói {index + 1} / {totalGroups}
        </div>

        <div className="text-xs text-slate-500">
          Người bán:{" "}
          <span className="font-semibold text-slate-700">
            {group.sellerName}
          </span>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="text-sm font-semibold text-slate-900">
          Tuỳ chọn giao hàng
        </div>

        <ShippingMethodPicker
          options={shippingOptions}
          value={selectedShippingId}
          onChange={onChangeShipping}
        />

        <div className="mt-4">
          {group.lines.map((it) => (
            <PackageItem key={it.id} item={it} />
          ))}
        </div>
      </div>
    </div>
  );
}
