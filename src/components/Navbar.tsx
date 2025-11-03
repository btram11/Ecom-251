"use client";
import { Search, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-[#F3FAF3] py-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <div className="text-2xl font-semibold text-black font-[cursive]">
          Farm <span className="text-green-600">Fresh</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <a href="#" className="hover:text-green-600">Trang chủ</a>
          <a href="#" className="hover:text-green-600">Danh mục</a>
          <a href="#" className="hover:text-green-600">Đơn hàng</a>
          <a href="#" className="hover:text-green-600">Về chúng tôi</a>
        </nav>

        {/* Search bar */}
        <div className="flex items-center bg-white border border-green-300 rounded-lg overflow-hidden">
          <Search className="text-gray-400 ml-3" size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm nông sản tươi sống"
            className="px-2 py-1 text-sm outline-none w-52"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <div className="relative cursor-pointer">
            <ShoppingCart size={22} className="text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-1">
              2
            </span>
          </div>
          <User size={22} className="text-gray-700 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
