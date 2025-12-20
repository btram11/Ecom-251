"use client";

import { formatCurrency } from "@shared/utils/format";
import type { ShippingOption } from "../../model/types";
import { RadioCardGroup } from "@shared/ui/form";

export function ShippingMethodPicker({
  options,
  value,
  onChange,
}: {
  options: ShippingOption[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="mt-3">
      <RadioCardGroup
        name="shipping"
        columns={2}
        value={value}
        onChange={onChange}
        options={options.map((opt) => ({
          id: opt.id,
          title: opt.label,
          description: opt.description,
          right: formatCurrency(opt.fee),
        }))}
      />
    </div>
  );
}
