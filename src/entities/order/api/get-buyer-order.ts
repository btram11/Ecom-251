import { environment } from "../../../../environment";
import type { Order } from "../model/types";

export type OrdersApiResponse = {
  success: boolean;
  message: string;
  data: Order[];
};

export async function getBuyerOrders(): Promise<Order[]> {
  try {
    const res = await fetch(
      `${environment.SERVICE_URL}/api/order/buyer`,
      {
        credentials: "include",
        cache: "no-store",
      }
    );

    console.log("Fetch orders response:", res);

    if (!res.ok) {
      console.error("Fetch orders failed:", res.status);
      return [];
    }

    const json: OrdersApiResponse = await res.json();
    if (!json.success || !json.data) return [];

    return json.data;
  } catch (error) {
    console.error("Failed to fetch buyer orders", error);
    return [];
  }
}