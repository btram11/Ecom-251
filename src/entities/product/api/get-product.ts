import { fetchApi } from "@shared/api";
import type { Product } from "../model/types";

export const getProduct = async (productId: string) => {
  return fetchApi(`/api/products/${productId}`);
};

const mockProducts: Record<string, Product> = {
  "1": {
    id: "1",
    name: "NHÃN XUỒNG CƠM VÀNG",
    avgRating: 4.5,
    reviewCount: 600,
    sellerLocation: "Vựa trái cây Cồn Nhãn - Phường An Hội",
    origin: "Bến Tre",
    harvestDateISO: "2025-02-22",
    stockKg: 50,
    priceVndPerKg: 40000,
    images: [
      "/Bap-cai.jpg",
      "/Bap-cai.jpg",
      "/Bap-cai.jpg",
      "/Bap-cai.jpg",
      "/Bap-cai.jpg",
      "/Bap-cai.jpg",
    ],
    description:
      "Nhãn xuồng cơm vàng được thu hoạch tại vườn, đạt chuẩn thực phẩm hữu cơ...",
  },
};

export async function getProductById(id: string): Promise<Product | null> {
  // giả lập latency
  await new Promise((r) => setTimeout(r, 50));
  return mockProducts[id] ?? null;
}
