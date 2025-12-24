import { environment } from "../../../../environment";
import type { Order } from "../model/types";

export type SellerOrdersApiResponse = {
  success: boolean;
  message: string;
  data: Order[];
};

export async function getSellerOrders(): Promise<Order[]> {
  try {
    const res = await fetch(
      `${environment.SERVICE_URL}/api/order/seller`,
      {
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Fetch seller orders failed:", res.status);
      return [];
    }

    const json: SellerOrdersApiResponse = await res.json();
    if (!json.success || !json.data) return [];

    return json.data;
  } catch (error) {
    console.error("Failed to fetch seller orders", error);
    return [];
  }
}
