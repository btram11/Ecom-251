import Image from "next/image";
import Link from "next/link";
import ProductCard from "@components/CardProductSquare";
import Navbar from "@components/Navbar";
import HeroSection from "@components/Banner";

const CategoryCard = ({ icon, title, count }: any) => (
  <div className="flex items-center justify-start gap-4 p-4 border border-gray-400 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all bg-white cursor-pointer">
    <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-green-50">
      <img src={icon} alt={title} className="w-8 h-8 object-contain" />
    </div>
    <div className="flex flex-col">
      <span className="font-semibold text-gray-800">{title}</span>
      <span className="text-sm text-gray-500">{count}</span>
    </div>
  </div>
);

export default function HomePage() {
  const categories = [
    { name: "Trái cây", icon: "/Orange.png" },
    { name: "Rau củ", icon: "/Carrot.png" },
    { name: "Thịt tươi", icon: "/Meat.png" },
    { name: "Thủy sản", icon: "/Prawn.png" },
    { name: "Gia vị", icon: "/Oil.png" },
    { name: "Gạo & ngũ cốc", icon: "/Rice.png" },
     { name: "Gia vị", icon: "/Oil.png" },
    { name: "Gạo & ngũ cốc", icon: "/Rice.png" },
  ];

  // Mẫu nhiều sản phẩm để kiểm tra layout (9 item để có 3 hàng 3 cột)
  const products = [
    { id: 1, 
      name: "Rau muống", 
      "original_price": 200000,
      "sale_price": 150000,
      rating: 4.5,
      reviews: 120,
      address: "Hà Nội",
      unit: "kg",
      image: "/Cai-bo-xoi.png"
    },
    { id: 2, 
      name: "Rau muống", 
      "original_price": 200000,
      "sale_price": 150000,
      rating: 4.5,
      reviews: 120,
      address: "Hà Nội",
      unit: "kg",
      image: "/Cai-bo-xoi.png" },
    { id: 3, 
      name: "Rau muống", 
      "original_price": 200000,
      "sale_price": 150000,
      rating: 4.5,
      reviews: 120,
      address: "Hà Nội",
      unit: "kg",
      image: "/Cai-bo-xoi.png" },
    { id: 4, 
      name: "Rau muống", 
      "original_price": 200000,
      "sale_price": 150000,
      rating: 4.5,
      reviews: 120,
      address: "Hà Nội",
      unit: "kg",
      image: "/Gao-ST25.jpg" },
    { id: 5, 
      name: "Rau muống", 
      "original_price": 200000,
      "sale_price": 150000,
      rating: 4.5,
      reviews: 120,
      address: "Hà Nội",
      unit: "kg",
      image: "/Gao-ST25.jpg" },
    { id: 6, 
      name: "Rau muống", 
      "original_price": 200000,
      "sale_price": 150000,
      rating: 4.5,
      reviews: 120,
      address: "Hà Nội",
      unit: "kg",
      image: "/Bap-cai.jpg" },
    { id: 7, 
      name: "Rau muống", 
      "original_price": 200000,
      "sale_price": 150000,
      rating: 4.5,
      reviews: 120,
      address: "Hà Nội",
      unit: "kg",
      image: "/Bap-cai.jpg" },
    { id: 8, 
      name: "Rau muống", 
      "original_price": 200000,
      "sale_price": 150000,
      rating: 4.5,
      reviews: 120,
      address: "Hà Nội",
      unit: "kg",
      image: "/Bap-cai.jpg" },
    { id: 9, 
      name: "Rau muống", 
      "original_price": 200000,
      "sale_price": 150000,
      rating: 4.5,
      reviews: 120,
      address: "Hà Nội",
      unit: "kg", 
      image: "/Bap-cai.jpg" },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* HEADER */}
      <Navbar />
      
      {/* BANNER chính*/}
      <HeroSection />


      {/* DANH MỤC */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-lg font-semibold mb-4">Danh mục sản phẩm</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <div className="w-10/12 mx-auto" key={idx}>
                <CategoryCard key={idx} icon={cat.icon} title={cat.name} count={`${Math.floor(Math.random() * 100) + 20} sản phẩm`} />
            </div>
           
          ))}
        </div>
      </section>

      {/* SẢN PHẨM NỔI BẬT - 3 card mỗi hàng */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Sản phẩm nổi bật</h3>
          <Link href="#" className="text-green-600 text-sm hover:underline">Xem tất cả →</Link>
        </div>

        {/* grid 3 columns desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((p) => (
            <ProductCard 
            key={p.id} 
            name={p.name} 
            sale_price={10000} 
            original_price={20000}
            rating={4.1}
            reviews={120}
            unit="kg"
            address="La Xuan Oai"
            image={p.image} />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-green-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h5 className="font-semibold text-lg mb-2">Chợ Nông Sản</h5>
            <p className="text-sm text-green-200">Mang nông sản sạch tới mọi nhà.</p>
          </div>

          <div>
            <h6 className="font-semibold mb-2">Liên hệ</h6>
            <p className="text-sm text-green-200">Email: support@nongsan.vn</p>
            <p className="text-sm text-green-200">Hotline: 0123 456 789</p>
          </div>

          <div>
            <h6 className="font-semibold mb-2">Địa chỉ</h6>
            <p className="text-sm text-green-200">123 Nguyễn Văn Cừ, Q.5, TP.HCM</p>
          </div>
        </div>

        <div className="text-center text-green-200 text-sm py-4 border-t border-green-700">
          © 2025 Chợ Nông Sản. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
