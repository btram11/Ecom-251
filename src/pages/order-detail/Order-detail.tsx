import { type OrderDetail } from "@entities/order/model/types";
import { cn } from "@shared/utils/cn";
import { MapPin, Phone, X } from "lucide-react";
import Image from "next/image";

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderDetail | null;
}


export function OrderDetailModal({ isOpen, onClose, order }: OrderDetailModalProps) {
  if (!isOpen || !order) return null;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

  // Config màu sắc cho badge trạng thái
  const statusConfig : any = {
    delivered: { label: "Đã giao", color: "bg-green-100 text-green-600 border-green-200" },
    pending: { label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-600 border-yellow-200" },
    preparing: { label: "Đang chuẩn bị", color: "bg-blue-100 text-blue-600 border-blue-200" },
    shipped: { label: "Đang giao", color: "bg-orange-100 text-orange-600 border-orange-200" },
    cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-600 border-red-200" },
  };

  const statusInfo = statusConfig[order.status] || statusConfig.pending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop: Nền đen mờ, click ra ngoài để đóng */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Nút đóng (X) */}
        <button 
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        >
            <X size={20} />
        </button>

        <div className="p-8"> {/* Padding rộng giống trong ảnh thiết kế */}
            
            {/* 1. THÔNG TIN KHÁCH HÀNG */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin khách hàng</h2>
                <div className="space-y-3 pl-1">
                    {/* Tên */}
                    <div className="font-semibold text-gray-800 text-lg">
                        {order.customer.name}
                    </div>
                    {/* SĐT */}
                    <div className="flex items-center gap-3 text-gray-600">
                        <Phone size={18} className="text-gray-400" />
                        <span className="font-medium">{order.customer.phone}</span>
                    </div>
                    {/* Địa chỉ */}
                    <div className="flex items-start gap-3 text-gray-600">
                        <MapPin size={18} className="text-gray-400 mt-0.5" />
                        <span>{order.customer.address}</span>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-100 my-6" />

            {/* 2. SẢN PHẨM ĐẶT HÀNG */}
            <div className="mb-6">
                {/* Header section sản phẩm */}
                <div className="flex flex-wrap items-center justify-between mb-6">
                    <div className="flex items-baseline gap-4">
                        <h3 className="text-lg font-bold text-gray-900">Sản phẩm đặt hàng</h3>
                        <span className="text-sm text-gray-500">Ngày đặt: {order.date}</span>
                    </div>
                    
                    {/* Badge trạng thái */}
                    <span className={cn("px-4 py-1.5 rounded-full text-sm font-semibold border", statusInfo.color)}>
                        {statusInfo.label}
                    </span>
                </div>

                {/* List Items */}
                <div className="space-y-6">
                    {order.products.map((product) => (
                        <div key={product.id} className="flex items-center gap-4 group">
                            {/* Ảnh sản phẩm */}
                            <div className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            
                            {/* Tên & Số lượng */}
                            <div className="flex-1 min-w-0">
                                <h4 className="text-base font-medium text-gray-900 truncate">{product.name}</h4>
                                <p className="text-sm text-gray-500 mt-1">SL: {product.quantity}</p>
                            </div>
                            
                            {/* Giá tiền */}
                            <div className="text-right font-semibold text-gray-900 text-base">
                                {formatCurrency(product.price)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. TỔNG KẾT TÀI CHÍNH (Footer) */}
            <div className="space-y-3 pt-4 border-t border-gray-100 text-sm">
                <div className="flex justify-between text-gray-600">
                    <span>Phương thức thanh toán</span>
                    <span className="font-medium text-gray-900">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Tiết kiệm</span>
                    <span className="font-medium text-gray-900">{formatCurrency(order.discount)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển</span>
                    <span className="font-medium text-gray-900">{formatCurrency(order.shippingFee)}</span>
                </div>
                
                {/* Tổng cộng */}
                <div className="flex justify-end items-center pt-4 mt-2">
                    <span className="text-base font-normal text-gray-600 mr-4">Tổng cộng:</span>
                    <span className="text-xl font-bold text-gray-900">{formatCurrency(order.total)}</span>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}