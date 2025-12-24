import { environment } from "../../../../environment";

export async function getUserCart() {
  const res = await fetch(
    `${environment.SERVICE_URL}/api/user/cart`,
    {
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch cart");
  }

  const json = await res.json();
  return json.data as {
    buyerId: string;
    sellerId: string;
    productId: number;
    amount: number;
    sellerName: string | null;
  }[];
}
