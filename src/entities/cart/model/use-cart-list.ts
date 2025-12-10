// src/features/cart/model/use-cart-list.ts

"use client";

import { useMemo, useState } from "react";
import {
  type ICartItem as CartItem,
  type ICartItemGroup as CartItemGroup,
} from "@/entities/cart";
import { MOCK_CART_GROUPS } from "@features/purchase/cart/mock";

export function useCartList(initialGroups: CartItemGroup[] = MOCK_CART_GROUPS) {
  const [groups, setGroups] = useState<CartItemGroup[]>(initialGroups);

  const items = useMemo<CartItem[]>(
    () => groups.flatMap((g) => g.lines),
    [groups]
  );

  const cartQty = items.reduce((s, it) => s + it.qty, 0);

  const selectedItems = useMemo(
    () => items.filter((it) => it.isSelected),
    [items]
  );
  const selectedQty = selectedItems.reduce((s, it) => s + it.qty, 0);
  const selectedSubTotal = selectedItems.reduce(
    (s, it) => s + it.qty * it.price,
    0
  );
  const shipping = selectedQty > 0 ? 50000 : 0;
  const total = selectedSubTotal + shipping;

  const updateItem = (id: string, updater: (item: CartItem) => CartItem) => {
    setGroups((prev) =>
      prev.map((g) => ({
        ...g,
        lines: g.lines.map((line) => (line.id === id ? updater(line) : line)),
      }))
    );
  };

  const increase = (id: string) =>
    updateItem(id, (it) => ({ ...it, qty: it.qty + 1 }));

  const decrease = (id: string) =>
    updateItem(id, (it) => (it.qty > 1 ? { ...it, qty: it.qty - 1 } : it));

  const remove = (id: string) => {
    setGroups((prev) =>
      prev
        .map((g) => ({
          ...g,
          lines: g.lines.filter((it) => it.id !== id),
        }))
        .filter((g) => g.lines.length > 0)
    );
  };

  const toggleItemSelect = (id: string) =>
    updateItem(id, (it) => ({ ...it, isSelected: !it.isSelected }));

  // ===== logic checkbox tổng =====
  const allSelected = items.length > 0 && items.every((it) => it.isSelected);
  const someSelected = items.some((it) => it.isSelected) && !allSelected;

  const toggleAll = () => {
    setGroups((prev) =>
      prev.map((g) => ({
        ...g,
        lines: g.lines.map((it) => ({
          ...it,
          isSelected: !allSelected,
        })),
      }))
    );
  };

  // toggle cả 1 shop
  const toggleGroupSelection = (groupId: string) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        const groupAllSelected =
          g.lines.length > 0 && g.lines.every((it) => it.isSelected);
        return {
          ...g,
          lines: g.lines.map((it) => ({
            ...it,
            isSelected: !groupAllSelected,
          })),
        };
      })
    );
  };

  // ==== nút "Xóa đã chọn" ở header ====
  const removeSelected = () => {
    if (!selectedItems.length) return;
    setGroups((prev) =>
      prev
        .map((g) => ({
          ...g,
          lines: g.lines.filter((it) => !it.isSelected),
        }))
        .filter((g) => g.lines.length > 0)
    );
  };

  return {
    groups,
    items,
    cartQty,
    selectedItems,
    selectedQty,
    selectedSubTotal,
    shipping,
    total,
    allSelected,
    someSelected,
    increase,
    decrease,
    remove,
    toggleItemSelect,
    toggleAll,
    toggleGroupSelection,
    removeSelected,
  };
}
