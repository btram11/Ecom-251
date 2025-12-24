"use client";

import * as React from "react";
import type { Order } from "@/entities/order/model/types";
import { OrderCard } from "@/entities/order/ui/order-card";
import { OrderTabs } from "./filter/ui/order-tabs";
import { filterOrdersByTab, type OrderTab } from "./filter/model/tabs";
import { getBuyerOrders } from "@entities/order";

interface OrdersPageProps {
  orders?: Order[];
}

export function OrdersPage({ orders: initialOrders }: OrdersPageProps) {
  const [activeTab, setActiveTab] = React.useState<OrderTab>("Tất cả");
  const [orders, setOrders] = React.useState<Order[]>(initialOrders ?? []);
  const [loading, setLoading] = React.useState(!initialOrders);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getBuyerOrders();
        setOrders(data);
      } catch (err) {
        setError("Không thể tải đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filtered = React.useMemo(() => {
    return filterOrdersByTab(orders, activeTab);
  }, [orders, activeTab]);

  if (loading) {
    return (
      <div className="font-sans text-gray-800">
        <main className="container mx-auto px-4 py-8 max-w-5xl">
          <h1 className="text-2xl font-bold mb-6">Đơn hàng của tôi</h1>
          <p className="text-gray-500">Đang tải đơn hàng...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-800">
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-2xl font-bold mb-6">Đơn hàng của tôi</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}
        
        <OrderTabs value={activeTab} onChange={setActiveTab} />

        <div className="space-y-6">
          {filtered.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={(orderId) => {
                console.log("view details", orderId);
              }}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">
              {orders.length === 0
                ? "Bạn chưa có đơn hàng nào."
                : "Không tìm thấy đơn hàng nào trong mục này."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}