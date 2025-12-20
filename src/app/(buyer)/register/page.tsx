"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("Bạn cần đồng ý với Điều khoản và Chính sách bảo mật.");
      return;
    }

    // TODO: Gọi API đăng ký
    console.log("Register Data:", formData);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Bên trái - Hình minh họa */}
      <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-green-50">
        <div className="w-100 h-100 relative mb-6">
          <Image
            src="/Login-thumnail.png"
            alt="Farmer Illustration"
            fill
            className="object-contain"
          />
        </div>
        <h2 className="text-3xl font-semibold text-green-700">Chợ nông sản</h2>
      </div>

      {/* Bên phải - Form đăng ký */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8">
        <div className="w-full max-w-md">
          {/* Tiêu đề */}
          <h1 className="text-4xl font-bold text-green-600 text-center mb-8">
            Welcome
          </h1>

          {/* Tabs */}
          <div className="flex justify-center gap-6 mb-6 text-gray-600 text-sm">
            <Link href="/login" className="hover:underline">
              Đăng nhập
            </Link>
            <span className="font-semibold text-green-600 border-b-2 border-green-600 pb-1">
              Đăng ký
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ và tên *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Nhập họ và tên..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Nhập email..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Nhập mật khẩu..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mt-1"
              />
              <label className="text-gray-600">
                Tôi đồng ý với{" "}
                <a href="#" className="text-green-600 hover:underline">
                  Điều khoản dịch vụ
                </a>{" "}
                và{" "}
                <a href="#" className="text-green-600 hover:underline">
                  Chính sách bảo mật
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-all"
            >
              TẠO TÀI KHOẢN
            </button>

            <div className="flex items-center gap-3 my-2">
              <hr className="flex-1 border-gray-300" />
              <span className="text-gray-400 text-sm">hoặc</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            <button
              type="button"
              className="w-full border border-gray-400 py-2.5 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium"
            >
              Đăng nhập với Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
