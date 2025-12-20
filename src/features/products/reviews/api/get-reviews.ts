import type { Review } from "../model/types";

const mockReviews: Record<string, Review[]> = {
  "1": [
    {
      id: "r1",
      name: "Nguyễn Minh Anh",
      date: "2024-01-31",
      rating: 5,
      comment:
        "Cà chưa rất tươi và ngọt, đóng gói cẩn thận. Giao hàng nhanh, sẽ mua lại!",
    },
    {
      id: "r2",
      name: "Trần Thị Lan",
      date: "2024-08-18",
      rating: 4,
      comment:
        "Nhãn ngọt, vỏ mỏng, ăn ngon. Chỉ có điều khâu vận chuyển hơi lâu.",
    },
    // ...
  ],
};

export async function getProductReviews(productId: string): Promise<Review[]> {
  await new Promise((r) => setTimeout(r, 50));
  return mockReviews[productId] ?? [];
}
