"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, User, Minus, Plus, Trash2, MapPin, Phone, Mail, Store } from "lucide-react";
import Navbar from "@components/Navbar";
interface Product {
  id: string;
  name: string;
  image: string;
  oldPrice?: number; 
  price: number;
  quantity: number;
}

interface ShopGroup {
  id: number;
  shopName: string;
  products: Product[]; 
}
export default function CartPage() {
    const cartItems: ShopGroup[] = [
        {
            id: 1,
            shopName: "Nông trại xanh",
            products: [
                {
                    id: "p1",
                    name: "Cải bó xôi",
                    image: "/Xoai-cat-hoa-loc.jpg", 
                    oldPrice: 55000,
                    price: 0,
                    quantity: 1,
                },
                {
                    id: "p2",
                    name: "Cải bó xôi",
                    image: "/Xoai-cat-hoa-loc.jpg", 
                    oldPrice: 55000,
                    price: 0,
                    quantity: 1,
                },
            ],
        },
        {
            id: 2,
            shopName: "Nông trại xanh",
            products: [
                {
                    id: "p3",
                    name: "Cải bó xôi",
                    image: "/Xoai-cat-hoa-loc.jpg", 
                    price: 25000,
                    quantity: 2,
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">

            {/* --- HEADER --- */}
            <Navbar />

            {/* --- MAIN CONTENT --- */}
            <main className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-1">Giỏ hàng của bạn</h1>
                    <p className="text-sm text-gray-500">Bạn có 4 sản phẩm trong giỏ hàng</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* LEFT COLUMN: DANH SÁCH SẢN PHẨM */}
                    <div className="flex-1">
                        {/* Header row */}
                        <div className="bg-white p-4 rounded-t-lg border-b border-gray-200 flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                                <span>Sản phẩm</span>
                            </div>
                            <button className="hover:text-red-500">Xóa đã chọn</button>
                        </div>

                        {/* Cart Items Loop */}
                        <div className="bg-white rounded-b-lg shadow-sm border border-gray-100">
                            {cartItems.map((group, index) => (
                                <div key={group.id} className={`${index !== 0 ? 'border-t border-gray-100' : ''}`}>
                                    {/* Shop Header */}
                                    <div className="p-4 flex items-center gap-3">
                                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                                        <span className="font-bold text-gray-800">{group.shopName}</span>
                                        <span className="px-2 py-0.5 text-[10px] border border-green-600 text-green-600 rounded">Shop</span>
                                    </div>

                                    {/* Products in Shop */}
                                    {group.products.map((item) => (
                                        <div key={item.id} className="px-4 py-4 flex gap-4 hover:bg-gray-50 transition">
                                            <div className="pt-2">
                                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                                            </div>

                                            {/* Image */}
                                            <div className="w-20 h-20 bg-gray-100 rounded-md relative overflow-hidden flex-shrink-0">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                                                        <div className="mt-1">
                                                            {item.oldPrice && (
                                                                <span className="text-gray-400 text-sm line-through mr-2">
                                                                    {item.oldPrice.toLocaleString()}đ
                                                                </span>
                                                            )}
                                                            <span className={`font-bold ${item.price === 0 ? 'text-green-600' : 'text-green-600'}`}>
                                                                {item.price.toLocaleString()} đ
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button className="text-gray-400 hover:text-red-500 text-sm">Xóa</button>
                                                </div>

                                                <div className="flex justify-between items-end mt-2">
                                                    <div className="flex items-center border border-gray-200 rounded">
                                                        <button className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100"><Minus className="w-3 h-3" /></button>
                                                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                        <button className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100"><Plus className="w-3 h-3" /></button>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-xs text-gray-400">TỔNG TIỀN</p>
                                                        <p className="text-green-600 font-bold">{(item.price * item.quantity).toLocaleString()} đ</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: TÓM TẮT ĐƠN HÀNG */}
                    <div className="w-full lg:w-96">
                        <div className="text-right text-sm mb-2 text-gray-500">
                            Tạm tính (4 sản phẩm được chọn): <span className="font-bold text-green-700 text-base">165.000 đ</span>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-4">
                            <h2 className="font-bold text-lg mb-4">Tóm tắt đơn hàng</h2>

                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Tạm tính</span>
                                <span>0 đ</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                                <span>Phí vận chuyển dự kiến</span>
                                <span>0 đ</span>
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <span className="font-bold text-gray-800">Tổng cộng</span>
                                <span className="font-bold text-red-500 text-xl">0 đ</span>
                            </div>

                            <button className="w-full bg-green-800 text-white font-bold py-3 rounded hover:bg-green-900 transition mb-4">
                                Tiến hành thanh toán
                            </button>

                            <div className="text-center">
                                <Link href="/products" className="text-sm text-gray-500 hover:text-green-700 flex flex-col items-center gap-2">
                                    Tiếp tục mua sắm
                                </Link>
                                <p className="text-xs text-gray-400 mt-4 px-2">
                                    Phí vận chuyển và các phụ phí khác sẽ được cập nhật chính xác ở bước tiếp theo khi bạn nhập địa chỉ nhận hàng.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            {/* --- FOOTER --- */}
            <footer className="bg-[#0f5132] text-white pt-12 pb-6 mt-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {/* Cột 1 */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Công ty TNHH Farm Fresh</h3>
                            <p className="text-sm text-gray-300 leading-relaxed mb-4">
                                Kết nối người mua và người bán nông sản, đảm bảo chất lượng, tiện lợi và giá cả hợp lý
                            </p>
                        </div>

                        {/* Cột 2 */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Liên kết nhanh</h3>
                            <ul className="text-sm text-gray-300 space-y-2">
                                <li><Link href="#" className="hover:text-white">Về chúng tôi</Link></li>
                                <li><Link href="#" className="hover:text-white">Cách thức hoạt động</Link></li>
                                <li><Link href="#" className="hover:text-white">Điều khoản sử dụng</Link></li>
                                <li><Link href="#" className="hover:text-white">Chính sách vận chuyển</Link></li>
                                <li><Link href="#" className="hover:text-white">Chính sách đổi trả</Link></li>
                            </ul>
                        </div>

                        {/* Cột 3 */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Danh mục sản phẩm</h3>
                            <ul className="text-sm text-gray-300 space-y-2">
                                <li><Link href="#" className="hover:text-white">Trái cây tươi</Link></li>
                                <li><Link href="#" className="hover:text-white">Rau củ quả</Link></li>
                                <li><Link href="#" className="hover:text-white">Gạo & Ngũ cốc</Link></li>
                                <li><Link href="#" className="hover:text-white">Sản phẩm hữu cơ</Link></li>
                            </ul>
                        </div>

                        {/* Cột 4 */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Liên hệ</h3>
                            <ul className="text-sm text-gray-300 space-y-4">
                                <li className="flex items-start gap-2">
                                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <span>123 Đường AB, Phường Cát Lái, TP. Hồ Chí Minh</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    <span>1900 123 456</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    <a href="mailto:support@farmfresh.vn" className="underline">support@farmfresh.vn</a>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Store className="w-4 h-4 mt-0.5" />
                                    <span>Thứ 2 - Chủ nhật<br />6:00 - 22:00</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-green-800 pt-8 pb-4">
                        <div className="text-center mb-6">
                            <h4 className="text-sm font-medium mb-4">Chứng nhận bởi</h4>
                            {/* Placeholder cho logo chứng nhận (để trống hoặc thêm ảnh) */}
                        </div>
                        <div className="text-center text-sm text-gray-300">
                            <p className="mb-2">2025 FarmFresh. Tất cả quyền được bảo lưu</p>
                            <p>Nền tảng kết nối nông sản Việt - Tươi ngon từ nông trại đến bàn ăn</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}