// app/product/[id]/page.jsx
"use client";
import React, { useEffect } from "react";
import { useState, useMemo } from "react";
import NavBar from "@/components/Navbar";
import { MapPin } from "lucide-react";
import {
  Star,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Truck, Leaf, Clock } from "lucide-react";
import RatingStar from "../../../components/RatingStar";

const images = ["/Bap-cai.jpg", "/Bap-cai.jpg", "/Bap-cai.jpg", "/Bap-cai.jpg"];

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

export default function ProductDetail({ params }) {
  const { id } = React.use(params);

  useEffect(() => {
    console.log("Product ID:", id);
  }, [id]);

  return (
    <div>
      <NavBar />
      <div className="w-11/12 mx-auto p-6 bg-white text-gray-800">
        {/* Product Detail Section */}
        <div className="grid grid-cols-2  gap-8">
          {/* Image section */}
          <div className="flex flex-row">
            <div className="flex flex-col gap-4 mr-4">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="thumb"
                  className="w-24 max-h-[450px] object-contain rounded-2xl shadow-md bg-gray-50"
                />
              ))}
            </div>
            <img
              src={images[0]}
              alt="Nhãn xuồng cơm vàng"
              className="w-full max-h-[450px] object-contain rounded-2xl shadow-md bg-gray-50"
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
            <div className="flex flex-ro">
              <MapPin size={16} className="text-gray-500 mr-2" />
              <p className="text-gray-500 text-sm">
                Vựa trái cây Cồn Nhãn - Phường An Hội
              </p>
            </div>

            <div className="space-y-1 text-gray-600 text-sm">
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
          </div>
        </div>

        {/* Description */}
        <div className="mt-4 ">
          <h2 className="text-lg mb-1 font-semibold">Mô tả sản phẩm</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Nhãn xuồng cơm vàng được thu hoạch tại vườn, đạt chuẩn thực phẩm hữu
            cơ, đảm bảo chất lượng và an toàn thực phẩm. Nhãn xuồng cơm vàng
            được biết đến với vị ngọt đậm đà, thịt dày, thơm dẻo.
          </p>
        </div>

        {/* Reviews section */}
        {/* <div className="mt-10 border rounded-2xl border-gray-300">
          <div className=" p-6 bg-white text-gray-800 rounded-2xl">
            <div className="flex flex-row items-center my-2 justify-between">
                <h2 className="text-lg font-semibold mb-3">Đánh giá sản phẩm</h2>
                <div className="border border-gray-200  rounded-md p-2 flex flex-row ml-auto">
                    <MessageCircle size={16} className="text-gray-500 mr-2" />
                    <p className="text-gray-700 text-sm">Viết đánh giá</p>
                </div>
            </div>


            <div className="space-y-4 mt-2">
              {reviews.map((r, idx) => (
                <Review
                  key={idx}
                  name={r.name}
                  date={r.date}
                  rating={r.rating}
                  comment={r.comment}
                />
              ))}
            </div>
          </div>
        </div> */}
        <ReviewSection />
      </div>
    </div>
  );
}

// component hiển thị từng đánh giá
const Review = ({ name, date, rating, comment }) => {
  return (
    <div className="border-b pb-2 border-b-gray-200 transition">
      <div className="flex items-center justify-between">
        <div className="flex flex-row gap-2">
          <p className="font-medium">{name}</p>
          <RatingStar rating={rating} />
        </div>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <p className="text-sm mt-1">{comment}</p>
    </div>
  );
};

export function ReviewSection() {
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
    {
      name: "Phạm Hoài Nam",
      date: "2024-03-20",
      rating: 3,
      comment: "Bình thường, không quá đặc biệt, giao hàng đúng hẹn.",
    },
    {
      name: "Võ Anh Tuấn",
      date: "2024-09-01",
      rating: 5,
      comment: "Quá ngon! Cơm dày, ngọt thanh, đáng tiền.",
    },
    {
      name: "Lý Mỹ Dung",
      date: "2024-02-10",
      rating: 4,
      comment: "Hàng ổn, bao bì đẹp, chất lượng tốt.",
    },
  ];

  const [page, setPage] = useState(1);
  const [filterRating, setFilterRating] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const itemsPerPage = 5;

  const filtered = useMemo(() => {
    let list = [...reviews];
    if (filterRating !== "all")
      list = list.filter((r) => r.rating === Number(filterRating));
    list.sort((a, b) =>
      sortOrder === "desc"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );
    return list;
  }, [filterRating, sortOrder]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const currentPageData = filtered.slice(start, start + itemsPerPage);

  return (
    <div className="mt-10 border rounded-2xl border-gray-300">
      <div className="p-6 bg-white text-gray-800 rounded-2xl">
        {/* Header */}
        <div className="flex flex-row items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Đánh giá sản phẩm</h2>
          </div>
          <div className="border border-gray-200 rounded-md px-3 py-1 flex flex-row items-center cursor-pointer hover:bg-gray-50">
            <MessageCircle size={16} className="text-gray-500 mr-2" />
            <p className="text-gray-700 text-sm">Viết đánh giá</p>
          </div>
        </div>

        {/* Bộ lọc */}
        <div className="flex flex-wrap justify-end gap-3 mb-4 items-center">
          <Filter size={18} className="text-gray-500" />
          <select
            value={filterRating}
            onChange={(e) => {
              setFilterRating(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-1 text-sm text-gray-500 focus:ring-1 focus:ring-gray-700"
          >
            <option value="all">Tất cả sao</option>
            <option value="5">5 sao</option>
            <option value="4">4 sao</option>
            <option value="3">3 sao</option>
            <option value="2">2 sao</option>
            <option value="1">1 sao</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-1 text-sm text-gray-500 focus:ring-1 focus:ring-gray-700"
          >
            <option value="desc">Mới nhất</option>
            <option value="asc">Cũ nhất</option>
          </select>
        </div>

        {/* Danh sách review */}
        <div className="space-y-4 min-h-[320px]">
          {currentPageData.length > 0 ? (
            currentPageData.map((r, idx) => <Review key={idx} {...r} />)
          ) : (
            <p className="text-sm text-gray-500 italic">
              Không có đánh giá phù hợp.
            </p>
          )}
        </div>

        {/* Phân trang */}
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`p-2 rounded-md border ${
              page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            <ChevronLeft size={18} />
          </button>

          <p className="text-sm">
            Trang <span className="font-medium">{page}</span> / {totalPages}
          </p>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={`p-2 rounded-md border ${
              page === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
