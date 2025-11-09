// app/product/[id]/page.jsx
import NavBar from "@/components/Navbar";

// export default async function ProductDetailPage({ params }) {
//   const { id } =  await params;

//   return (
//     <div>
//       <NavBar />
//       <h1>Chi tiết sản phẩm</h1>
//       <p>Product ID: {id}</p>
//     </div>
//   );
// };

import { Star, Truck, Leaf, Clock } from "lucide-react";

export default async function ProductDetail() {
  const images = [
    "/images/nhan1.jpg",
    "/images/nhan2.jpg",
    "/images/nhan3.jpg",
    "/images/nhan4.jpg",
  ];

  const reviews = [
    {
      name: "Nguyễn Minh Anh",
      date: "2024-01-31",
      rating: 5,
      comment:
        "Cà chưa rất tươi và ngọt, đóng gói cẩn thận. Giao hàng nhanh, sẽ mua lại!",
    },
    {
      name: "Trần Thị Lan",
      date: "2024-08-18",
      rating: 4,
      comment:
        "Nhãn ngọt, vỏ mỏng, ăn ngon. Chỉ có điều khâu vận chuyển hơi lâu.",
    },
    {
      name: "Lê Văn Hùng",
      date: "2024-04-15",
      rating: 5,
      comment:
        "Lần đầu mua mà thấy ưng ý, nhãn chín thơm lừng. Sẽ giới thiệu bạn bè.",
    },
  ];

  return (
    <div>
      <NavBar />
      <div className="w-11/12 mx-auto p-6 bg-white text-gray-800">
        {/* Product Detail Section */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
          {/* Image section */}
          <div className="flex flex-row">
             <div className="flex flex-col gap-4 mr-4">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="thumb"
                  className="w-20 h-20 object-cover rounded-lg border hover:scale-105 transition"
                />
              ))}
            </div>
            <img
              src={images[0]}
              alt="Nhãn xuồng cơm vàng"
              className="w-full h-[400px] object-cover rounded-2xl shadow-md"
            />
           

          </div>

          {/* Info section */}
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold">NHÃN XUỒNG CƠM VÀNG</h1>
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500 fill-yellow-500" size={20} />
              <p className="font-medium text-gray-700">
                4.5{" "}
                <span className="text-sm text-gray-500">(600 đánh giá)</span>
              </p>
            </div>
            <p className="text-gray-500">
              Vựa trái cây Cồn Nhãn - Phường An Hội
            </p>

            <div className="space-y-1 text-gray-600">
              <p>
                <span className="font-medium">Xuất xứ:</span> Bến Tre
              </p>
              <p>
                <span className="font-medium">Ngày thu hoạch:</span> 22/2/2025
              </p>
              <p>
                <span className="font-medium">Còn lại:</span> 50 kg
              </p>
            </div>

            <p className="text-green-600 text-2xl font-semibold">
              40.000 đ <span className="text-base text-gray-600">/kg</span>
            </p>

            <div className="flex flex-wrap gap-3 pt-3">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-sm">
                <Truck size={16} /> Giao hàng nhanh
              </div>
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-sm">
                <Leaf size={16} /> Sản phẩm tươi, sạch
              </div>
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-sm">
                <Clock size={16} /> Thu hoạch trong thời gian gần
              </div>
            </div>

            <div className="pt-4 border-t">
              <h2 className="text-lg font-medium mb-1">Mô tả sản phẩm</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nhãn xuồng cơm vàng được thu hoạch tại vườn, đạt chuẩn thực phẩm
                hữu cơ, đảm bảo chất lượng và an toàn thực phẩm. Nhãn xuồng cơm
                vàng được biết đến với vị ngọt đậm đà, thịt dày, thơm dẻo.
              </p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-3">Đánh giá sản phẩm</h2>
          <div className="space-y-4">
            {reviews.map((r, idx) => (
              <div
                key={idx}
                className="border rounded-xl p-4 bg-gray-50 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium">{r.name}</p>
                  <p className="text-sm text-gray-500">{r.date}</p>
                </div>
                <div className="flex gap-1 my-1">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-700">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
