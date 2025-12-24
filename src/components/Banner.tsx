import { Search, MapPin, Filter } from "lucide-react";
import { Pacifico } from "next/font/google";


const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });
export default function HeroSection() {
  return (
    <section className="bg-[#F3FAF3] text-center py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium mb-3">
          🌳 Tươi sống từ nông trại
        </div>

        <h1 className="text-5xl font-bold mb-4 leading-tight text-gray-900">
          <span className="block font-[cursive]" style={pacifico.style}>Chợ nông sản</span>
          <span className="text-green-600 font-[cursive]" style={pacifico.style}>tươi sống Việt Nam</span>
        </h1>

        <p className="text-gray-600 mb-8">
          Kết nối trực tiếp với nông dân để mang đến các sản phẩm tươi sạch, thơm ngon.<br />
          Giao hàng nhanh, đảm bảo chất lượng và giá cả hợp lý.
        </p>

        {/* Search box */}
        <div className="flex flex-wrap justify-center bg-white shadow-md rounded-xl p-4 gap-3 max-w-3xl mx-auto">
          <div className="flex items-center border rounded-lg px-3 py-2 w-64">
            <Search className="text-gray-400 mr-2" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm rau củ, thịt, cá..."
              className="outline-none w-full text-sm"
            />
          </div>

          <div className="flex items-center border rounded-lg px-3 py-2 w-40">
            <MapPin className="text-gray-400 mr-2" size={18} />
            <input
              type="text"
              placeholder="Vị trí của bạn"
              className="outline-none w-full text-sm"
            />
          </div>

          <button className="flex items-center justify-center border border-gray-300 rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-50">
            <Filter size={16} className="mr-2" />
            Lọc
          </button>

          <button className="bg-green-600 text-white font-semibold rounded-lg px-6 py-2 hover:bg-green-700 transition">
            Tìm kiếm
          </button>
        </div>

        {/* Popular searches */}
        <div className="mt-6 space-x-2">
          {["Rau hữu cơ", "Thịt heo sạch", "Sầu riêng Ri6", "Hải sản tươi sống", "Gạo ST25"].map(
            (item) => (
              <button
                key={item}
                className="bg-white shadow-sm border text-sm text-gray-700 rounded-full px-4 py-1 hover:bg-green-50"
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
}
