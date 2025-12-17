"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  DEFAULT_SHIPPING_OPTIONS,
  useCheckout,
  useCheckoutCart,
  checkoutAddressSchema,
  type CheckoutAddressFormValues,
} from "@/features/purchase/checkout";

const DEFAULT_SHIPPING_ID = DEFAULT_SHIPPING_OPTIONS[0]?.id;

export function useCheckoutPage() {
  const router = useRouter();
  const { groups, subtotal } = useCheckoutCart();
  const { shippingByGroup, setShippingForGroup, address, setAddress } =
    useCheckout();

  const methods = useForm<CheckoutAddressFormValues>({
    resolver: zodResolver(checkoutAddressSchema),
    mode: "onSubmit",
    defaultValues: {
      fullName: address.fullName,
      phone: address.phone,
      addressLine: address.addressLine,
      province: address.province,
      district: address.district,
      ward: address.ward,
      postalCode: address.postalCode,
    },
  });

  // sync provider -> form (khi user quay lại trang)
  useEffect(() => {
    methods.reset({
      fullName: address.fullName,
      phone: address.phone,
      addressLine: address.addressLine,
      province: address.province,
      district: address.district,
      ward: address.ward,
      postalCode: address.postalCode,
    });
  }, [address, methods]);

  // ensure default shipping
  useEffect(() => {
    if (!DEFAULT_SHIPPING_ID) return;

    for (const g of groups) {
      if (!shippingByGroup[g.id]) {
        setShippingForGroup(g.id, DEFAULT_SHIPPING_ID);
      }
    }
  }, [groups, shippingByGroup, setShippingForGroup]);

  const shippingFee = useMemo(() => {
    return groups.reduce((acc, g) => {
      const selectedId = shippingByGroup[g.id] ?? DEFAULT_SHIPPING_ID;
      const opt = DEFAULT_SHIPPING_OPTIONS.find((x) => x.id === selectedId);
      return acc + (opt?.fee ?? 0);
    }, 0);
  }, [groups, shippingByGroup]);

  const submit = methods.handleSubmit((data) => {
    setAddress(data); // chỉ lưu provider khi pass validate
    router.push("/checkout/payment");
  });

  return {
    // form
    methods,
    submit,

    // data for UI
    groups,
    subtotal,
    shippingFee,

    // shipping controls
    shippingByGroup,
    setShippingForGroup,
  };
}
