"use client";

import * as React from "react";
import type { Order } from "@/entities/order/model/types";
import { OrderCard } from "@/entities/order/ui/order-card";
import { OrderTabs } from "./filter/ui/order-tabs";
import { filterOrdersByTab, type OrderTab } from "./filter/model/tabs";
export function OrdersPage({ orders }: { orders: Order[] }) {
  const [activeTab, setActiveTab] = React.useState<OrderTab>("Tất cả");
  const [openOrderId, setOpenOrderId] = React.useState<string | null>(null);

  const filtered = React.useMemo(() => {
    return filterOrdersByTab(orders, activeTab);
  }, [orders, activeTab]);

  return (
    <div className="font-sans text-gray-800">
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-2xl font-bold mb-6">Đơn hàng của tôi</h1>
        <OrderTabs value={activeTab} onChange={setActiveTab} />

        <div className="space-y-6">
          {filtered.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={(orderId) => {
                // TODO: navigate /orders/[id] hoặc open modal
                console.log("view details", orderId);
              }}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">
              Không tìm thấy đơn hàng nào trong mục này.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
