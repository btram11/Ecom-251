"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import { MessageCircle, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import type { Review } from "../model/types";
import { ReviewItem } from "./review-item";

export function ReviewSection({ reviews }: { reviews: Review[] }) {
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

          <div className="border border-gray-200 rounded-md px-3 py-1 flex flex-row items-center cursor-pointer hover:bg-gray-50">
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
