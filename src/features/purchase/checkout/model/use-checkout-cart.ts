"use client";

import { useMemo } from "react";
import type { ICartItemGroup } from "@/entities/cart";
import { useCartList } from "@/entities/cart";

function pickCheckoutGroups(groups: ICartItemGroup[]) {
  // Prefer group.isSelected; fallback: at least one line selected; fallback: keep all
  const anyGroupSelected = groups.some((g) => g.isSelected);
  const filtered = anyGroupSelected
    ? groups.filter((g) => g.isSelected)
    : groups;

  return filtered.map((g) => {
    const anyLineSelected = g.lines.some((x) => x.isSelected);
    const lines = anyLineSelected
      ? g.lines.filter((x) => x.isSelected)
      : g.lines;

    return { ...g, lines };
  });
}

export function useCheckoutCart() {
  const { groups = [] } = useCartList() as { groups: ICartItemGroup[] };

  const checkoutGroups = useMemo(() => pickCheckoutGroups(groups), [groups]);

  const subtotal = useMemo(() => {
    return checkoutGroups.reduce((acc, g) => {
      return acc + g.lines.reduce((s, it) => s + it.price * it.qty, 0);
    }, 0);
  }, [checkoutGroups]);

  return { groups: checkoutGroups, subtotal };
}
