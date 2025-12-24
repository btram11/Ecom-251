"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import {
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  Star,
} from "lucide-react";
import type { Review } from "../model/types";
import { ReviewItem } from "./review-item";

import { set } from "zod";

export function ReviewSection({
  reviews,
  setOpenComment,
  openComment,
}: {
  reviews: Review[];
  setOpenComment: React.Dispatch<React.SetStateAction<boolean>>;
  openComment: boolean;
}) {
  const [page, setPage] = useState(1);
  const [filterRating, setFilterRating] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const itemsPerPage = 5;

  const filtered = useMemo(() => {
    let list = [...reviews];
    if (filterRating !== "all") {
      const r = Number(filterRating);
      list = list.filter((x) => x.rating === r);
    }
    list.sort((a, b) =>
      sortOrder === "desc"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    return list;
  }, [filterRating, sortOrder, reviews]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const start = (page - 1) * itemsPerPage;
  const currentPageData = filtered.slice(start, start + itemsPerPage);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterRating(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "asc" | "desc");
    setPage(1);
  };

  return (
    <div className="mt-10 border rounded-2xl border-gray-300">
      <div className="p-6 bg-white text-gray-800 rounded-2xl">
        <div className="flex flex-row items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Đánh giá sản phẩm</h2>
          <div
            className="border border-gray-200 rounded-md px-3 py-1 flex flex-row items-center cursor-pointer hover:bg-gray-50"
            onClick={() => {
              setOpenComment((val) => !val);
            }}
          >
            <MessageCircle size={16} className="text-gray-500 mr-2" />
            <p className="text-gray-700 text-sm">Viết đánh giá</p>
          </div>
        </div>


        <div className="flex flex-wrap justify-end gap-3 mb-4 items-center">
          <Filter size={18} className="text-gray-500" />

          <select
            value={filterRating}
            onChange={handleFilterChange}
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
            onChange={handleSortChange}
            className="border rounded-lg px-3 py-1 text-sm text-gray-500 focus:ring-1 focus:ring-gray-700"
          >
            <option value="desc">Mới nhất</option>
            <option value="asc">Cũ nhất</option>
          </select>
        </div>

        
        {openComment && (
          <CommentSection
            onClose={() => {
              setOpenComment(false);
            }}
          />
        )}

        <div className="space-y-4 min-h-[320px]">
          {currentPageData.length > 0 ? (
            currentPageData.map((r) => <ReviewItem key={r.id} {...r} />)
          ) : (
            <p className="text-sm text-gray-500 italic">
              Không có đánh giá phù hợp.
            </p>
          )}
        </div>

        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            type="button"
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
            type="button"
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

function CommentSection({ onClose }: { onClose: () => void }) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [rating, setRating] = useState(0);

  return (
    <div>
      <div className="w-full p-4 rounded-md bg-gray-100">
        <h3 className="text-lg font-bold">Viết đánh giá</h3>
        <div className="flex flex-row gap-x-4">
          <text>Đánh giá của bạn: </text>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-4 h-4 ${
                    star <= (hoveredRating || rating)
                      ? "fill-[#FFD700] text-[#FFD700]"
                      : "fill-none text-gray-300"
                  }`}
                />
              </button>
            ))}
            <span className="font-['Alexandria:Medium',sans-serif] text-[14px] text-black ml-2">
              {rating}/5
            </span>
          </div>
        </div>

        <div className="mt-4">
          <div>Nhận xét của bạn: </div>
          <textarea
            className="w-full min-h-[20px] mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            rows={4}
            placeholder="Viết nhận xét của bạn ở đây..."
          ></textarea>
        </div>

        <div className="flex flex-row justify-end mt-4 mx-2">
          <div className="bg-accent text-white rounded-md p-2 font-semibold">Gửi bình luận</div>
        </div>
      </div>
    </div>
  );
}
