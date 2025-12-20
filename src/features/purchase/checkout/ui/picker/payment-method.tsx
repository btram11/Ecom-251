"use client";

import { PAYMENT_OPTIONS } from "@features/purchase/checkout/model/payment-method";
import type { PaymentMethod } from "@features/purchase/checkout/model/types";
import { RadioCardGroup } from "@shared/ui/form";

export function PaymentMethodPicker({
  value,
  onChange,
}: {
  value: PaymentMethod;
  onChange: (m: PaymentMethod) => void;
}) {
  return (
    <RadioCardGroup
      name="payment"
      columns={1}
      value={value}
      onChange={onChange}
      options={PAYMENT_OPTIONS.map((opt) => ({
        id: opt.id,
        title: opt.title,
        description: opt.desc,
      }))}
    />
  );
}
