import type { Product } from "../model/types";
import { environment } from "../../../../environment";

type ProductApiResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    baseUnit: string;
    imageUrl: string;
    imageType: string;
    price: number;
    discount: number;
    rating: number;
    location: string;
    categoryNames: string[];
  };
};

export async function getProductById(
  productId: number
): Promise<Product | null> {
  try {
    const res = await fetch(
      `${environment.SERVICE_URL}/api/products/${productId}`,
      {
        credentials: "include",
        cache: "no-store",      
      }
    );

    if (!res.ok) {
      console.error("Fetch product failed:", res.status);
      return null;
    }

    const json: ProductApiResponse = await res.json();
    if (!json.success || !json.data) return null;

    const p = json.data;

    return {
      id: String(p.id),
      name: p.name,
      avgRating: p.rating,
      reviewCount: 0,
      sellerLocation: p.location,
      origin: p.categoryNames?.[0] ?? "Không rõ",
      harvestDateISO: "",
      stockKg: 0,
      priceVndPerKg: p.price - (p.discount / 100) * p.price,
      images: p.imageUrl ? [p.imageUrl] : ["/placeholder.png"],
      description: `Danh mục: ${p.categoryNames.join(", ")}`,
    };
  } catch (error) {
    console.error("Failed to fetch product", error);
    return null;
  }
}
