"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Truck, CheckCircle, XCircle, Eye } from "lucide-react";
import Navbar from "@components/Navbar";

// --- MOCK DATA (Dữ liệu giả lập giống hình) ---
const orders = [
  {
    id: "#1201",
    date: "1-11-2025",
    status: "shipping", // shipping | delivered | cancelled
    total: 165000,
    items: [
      { id: 1, name: "Nhãn xuồng cơm vàng", qty: 1, price: 95000, image: "/Xoai-cat-hoa-loc.jpg" },
      { id: 2, name: "Xoài cát hòa lộc", qty: 1, price: 70000, image: "/Cai-bo-xoi.png" },
    ],
  },
  {
    id: "#1202", // Đổi ID khác một chút để phân biệt
    date: "1-11-2025",
    status: "delivered",
    total: 165000,
    items: [
      { id: 1, name: "Nhãn xuồng cơm vàng", qty: 1, price: 95000, image: "/Xoai-cat-hoa-loc.jpg" },
      { id: 2, name: "Xoài cát hòa lộc", qty: 1, price: 70000, image: "/Xoai-cat-hoa-loc.jpg" },
    ],
  },
  {
    id: "#1203",
    date: "1-11-2025",
    status: "cancelled",
    total: 165000,
    items: [
      { id: 1, name: "Nhãn xuồng cơm vàng", qty: 1, price: 95000, image: "/Xoai-cat-hoa-loc.jpg" },
      { id: 2, name: "Xoài cát hòa lộc", qty: 1, price: 70000, image: "/Xoai-cat-hoa-loc.jpg" },
    ],
  },
];

// --- CẤU HÌNH TRẠNG THÁI (Màu sắc & Icon) ---
const statusConfig: any = {
  shipping: {
    label: "Đang giao",
    color: "text-purple-600 bg-purple-100",
    icon: <Truck className="w-5 h-5 text-purple-600" />,
  },
  delivered: {
    label: "Đã giao",
    color: "text-green-600 bg-green-100",
    icon: <CheckCircle className="w-5 h-5 text-green-600" />,
  },
  cancelled: {
    label: "Đã hủy",
    color: "text-gray-600 bg-gray-100",
    icon: <XCircle className="w-5 h-5 text-gray-500" />,
  },
};

export default function OrderPage() {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const tabs = ["Tất cả", "Chờ xác nhận", "Đang giao", "Đã giao", "Đã hủy"];

  // Hàm lọc đơn hàng theo tab
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "Tất cả") return true;
    if (activeTab === "Đang giao" && order.status === "shipping") return true;
    if (activeTab === "Đã giao" && order.status === "delivered") return true;
    if (activeTab === "Đã hủy" && order.status === "cancelled") return true;
    return false;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
        
      <Navbar/>
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-2xl font-bold mb-6">Đơn hàng của tôi</h1>

        {/* --- TABS FILTER --- */}
        <div className="bg-gray-200 p-1 rounded-lg flex justify-between mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all whitespace-nowrap
                ${
                  activeTab === tab
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* --- DANH SÁCH ĐƠN HÀNG --- */}
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const statusInfo = statusConfig[order.status];

            return (
              <div key={order.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Header Card */}
                <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-3">
                    {/* Icon trạng thái */}
                    <div className="p-2 bg-gray-50 rounded-full">
                        {statusInfo.icon}
                    </div>
                    <div>
                        <p className="font-bold text-gray-800">Đơn hàng {order.id}</p>
                        <p className="text-xs text-gray-400">{order.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                     {/* Badge trạng thái */}
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${statusInfo.color}`}>
                        {statusInfo.label}
                    </span>
                    
                    {/* Nút xem chi tiết */}
                    <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-gray-50 transition">
                        <Eye className="w-4 h-4 text-gray-600" />
                        Xem chi tiết
                    </button>
                  </div>
                </div>

                {/* Body Card (Danh sách sản phẩm) */}
                <div className="p-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className={`flex gap-4 py-3 ${idx !== 0 ? 'border-t border-gray-50' : ''}`}>
                        {/* Ảnh sản phẩm */}
                        <div className="w-16 h-16 bg-gray-100 rounded-lg relative overflow-hidden flex-shrink-0">
                             {/* Thay src bằng item.image */}
                             {/* <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">IMG</div>  */}
                             <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        
                        {/* Thông tin sản phẩm */}
                        <div className="flex-1 flex justify-between items-center">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-800 mb-1">{item.name}</h3>
                                <p className="text-xs text-gray-500">SL: {item.qty}</p>
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                                {item.price.toLocaleString()} đ
                            </span>
                        </div>
                    </div>
                  ))}
                </div>

                {/* Footer Card (Tổng tiền) */}
                <div className="px-4 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Thành tiền:</span>
                    <span className="text-lg font-bold text-gray-800">Tổng cộng: {order.total.toLocaleString()} đ</span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Empty State nếu không có đơn hàng */}
        {filteredOrders.length === 0 && (
            <div className="text-center py-20">
                <p className="text-gray-500">Không tìm thấy đơn hàng nào trong mục này.</p>
            </div>
        )}

      </main>
    </div>
  );
}