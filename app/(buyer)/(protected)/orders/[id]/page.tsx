"use client";
import React from "react";
import Image from "next/image";
import { X, Phone, MapPin, User, Calendar } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { OrderDetailModal } from "@pages/order-detail/Order-detail";


export function Page() {
    const order = null; // Thay thế bằng dữ liệu đơn hàng thực tế

    return <OrderDetailModal isOpen={true} onClose={() => {}} order={null} />;
}

