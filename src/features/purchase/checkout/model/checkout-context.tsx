"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import type { PaymentMethod, ShippingAddress } from "./types";

type CheckoutState = {
  address: ShippingAddress;
  setAddress: (patch: Partial<ShippingAddress>) => void;

  shippingByGroup: Record<string, string>;
  setShippingForGroup: (groupId: string, shippingId: string) => void;

  paymentMethod: PaymentMethod;
  setPaymentMethod: (v: PaymentMethod) => void;
};

const CheckoutContext = createContext<CheckoutState | null>(null);

const EMPTY_ADDRESS: ShippingAddress = {
  fullName: "",
  phone: "",
  addressLine: "",
  ward: "",
  district: "",
  province: "",
  postalCode: "",
};

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddressState] = useState<ShippingAddress>(EMPTY_ADDRESS);
  const [shippingByGroup, setShippingByGroup] = useState<
    Record<string, string>
  >({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");

  const value = useMemo<CheckoutState>(() => {
    return {
      address,
      setAddress: (patch) => setAddressState((prev) => ({ ...prev, ...patch })),

      shippingByGroup,
      setShippingForGroup: (groupId, shippingId) =>
        setShippingByGroup((prev) => ({ ...prev, [groupId]: shippingId })),

      paymentMethod,
      setPaymentMethod,
    };
  }, [address, shippingByGroup, paymentMethod]);

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used within CheckoutProvider");
  return ctx;
}
