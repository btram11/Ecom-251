import { api, isOk, type Page } from "@shared/api";
import type { Review } from "../model/types";
import { apiUrl, buildQueryString } from "@shared/lib/api-helper";
import { paths } from "@shared/config/paths";

const mockReviews: Record<string, Review[]> = {
  "1": [
    {
      id: "r1",
      name: "Nguyễn Minh Anh",
      createdAt: "2024-01-31",
      rating: 5,
      comment:
        "Cà chưa rất tươi và ngọt, đóng gói cẩn thận. Giao hàng nhanh, sẽ mua lại!",
    },
    {
      id: "r2",
      name: "Trần Thị Lan",
      createdAt: "2024-08-18",
      rating: 4,
      comment:
        "Nhãn ngọt, vỏ mỏng, ăn ngon. Chỉ có điều khâu vận chuyển hơi lâu.",
    },
    // ...
  ],
};
export type GetReviewsParams = {
  sellerID: string;
  productID: string;
  page: number; // 0-based
  pageSize: number;
  sort?: "asc" | "desc"; // createdAt
};

export async function getProductReviews(params: GetReviewsParams): Promise<Page<Review>> {
  const query = buildQueryString({
    page: params?.page ?? 0,
    pageSize: params?.pageSize ?? 10,
    sortBy: "createdAt",
    desc: (params?.sort ?? "asc") === "desc" ,
  });

  const url =  `${paths.feedbacks.list(params.sellerID, params.productID)}?${query}`;

  const res = await api.get<Page<Review>>(apiUrl(url), {
    cache: "force-cache",
    next: {
      revalidate: 60,
    }
  })
  if (!isOk(res)) {
    throw new Error("Failed to get reviews")
  }
  return res.data
}
