"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-row bg-white">
      {/* --- BÊN TRÁI: ẢNH BANNER --- */}
      <div className="relative w-1/2 bg-gray-50">
        <Image
          src="/Banner.png" 
          alt="Chợ nông sản"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* --- BÊN PHẢI: NỘI DUNG --- */}
      <div className="w-1/2 flex flex-col justify-center px-20 relative">
        
        <h1 
          className="text-6xl text-green-500 mb-12 text-center"
          style={{ fontFamily: ' "Times New Roman", cursive' }}
        >
          Chào mừng trở lại
        </h1>

        {/* Phần chọn vai trò: Tôi là */}
        <div className="w-full mb-8">
          <label className="block text-lg font-bold text-gray-800 mb-4">
            Tôi là :
          </label>
          <div className="flex gap-6">
            <button className="flex-1 py-3 border border-gray-300 rounded-xl font-bold text-gray-800 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition duration-200">
              Người mua
            </button>
            <button className="flex-1 py-3 border border-gray-300 rounded-xl font-bold text-gray-800 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition duration-200">
              Người bán
            </button>
          </div>
        </div>

        {/* Nút Đăng nhập Google */}
        <button className="w-full border border-gray-300 rounded-xl py-3 flex items-center justify-center gap-3 font-bold text-gray-800 hover:bg-gray-50 transition duration-200 mb-8"
          onClick={() => router.push('/')}
        >
            {/* Icon Google SVG */}
            <svg className="w-6 h-6" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            </svg>
            Đăng ký/ Đăng nhập với Google
        </button>

        {/* Checkbox Điều khoản */}
        <div className="flex items-start gap-3">
            <div className="relative flex items-center">
                <input 
                    type="checkbox" 
                    id="terms" 
                    className="w-5 h-5 border-2 border-gray-300 rounded-full appearance-none checked:bg-green-500 checked:border-green-500 cursor-pointer" 
                />
                {/* Custom Checkmark SVG khi checked (Optional, CSS thuần có thể xử lý việc này nhưng input default cũng ổn) */}
                <svg className="w-3 h-3 text-white absolute top-1 left-1 pointer-events-none hidden peer-checked:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <label htmlFor="terms" className="text-sm text-gray-500 pt-0.5">
                Đồng ý với <Link href="#" className="text-blue-500 hover:underline">Điều khoản dịch vụ</Link> và <Link href="#" className="text-blue-500 hover:underline">Chính sách bảo mật</Link>
            </label>
        </div>

        {/* Footer Copyright */}
        <div className="absolute bottom-6 left-0 w-full text-center">
             <p className="text-gray-400 text-sm flex items-center justify-center gap-1">
                <span className="text-lg">&copy;</span> 2025 Chợ Nông sản Việt. Tất cả quyền được bảo lưu.
             </p>
        </div>

      </div>
    </div>
  );
}