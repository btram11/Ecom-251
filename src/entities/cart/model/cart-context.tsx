"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useCartList } from "./use-cart-list";

type CartListContextType = ReturnType<typeof useCartList>;

const CartListContext = createContext<CartListContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const cartList = useCartList();

  return (
    <CartListContext.Provider value={cartList}>
      {children}
    </CartListContext.Provider>
  );
}

export function useCartListContext(): CartListContextType {
  const context = useContext(CartListContext);
  if (context === undefined) {
    throw new Error("useCartListContext must be used within CartProvider");
  }
  return context;
}
