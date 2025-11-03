"use client";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* BÊN TRÁI */}
      <div className="w-1/2 bg-green-50 flex flex-col justify-center items-center p-10">
        {/* ẢNH LOCAL */}
        <div className="w-100 h-100 relative">
          <Image
            src="/Login-thumnail.png"
            alt="Chợ nông sản"
            fill
            className="object-contain"
          />
        </div>
        <h2 className="mt-6 text-3xl font-semibold text-green-700 italic">Chợ nông sản</h2>
      </div>

      {/* BÊN PHẢI */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <div className="w-full max-w-sm">
          <h1 className="text-4xl font-semibold text-green-600 text-center mb-6">Welcome</h1>

          <div className="flex justify-center gap-6 mb-6 text-gray-600 text-sm">
            <Link href="#" className="font-semibold text-green-700 border-b-2 border-green-600">
              Đăng nhập
            </Link>
            <Link href="/register" className="hover:text-green-700">
              Đăng ký
            </Link>
          </div>

          {/* FORM */}
          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu *</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white rounded-md py-2 font-semibold hover:bg-green-700 transition"
            >
              Đăng nhập
            </button>
          </form>

          {/* Dòng chia */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-500 text-sm">hoặc</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button
            type="button"
            className="w-full border border-gray-400 rounded-md py-2 font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Đăng nhập với Google
          </button>
        </div>
      </div>
    </div>
  );
}
