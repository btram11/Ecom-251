import { environment } from "../../../../environment";

export async function confirmOrder(orderId: string): Promise<void> {
  try {
    const res = await fetch(
      `${environment.SERVICE_URL}/api/order/confirm/${orderId}`,
      {
        method: "PUT",
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error(`Confirm order failed: ${res.status}`);
    }
  } catch (error) {
    console.error("Failed to confirm order", error);
    throw error;
  }
}

export async function completeOrder(orderId: string): Promise<void> {
  try {
    const res = await fetch(
      `${environment.SERVICE_URL}/api/order/complete/${orderId}`,
      {
        method: "PUT",
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error(`Complete order failed: ${res.status}`);
    }
  } catch (error) {
    console.error("Failed to complete order", error);
    throw error;
  }
}

export async function cancelOrder(orderId: string): Promise<void> {
  try {
    const res = await fetch(
      `${environment.SERVICE_URL}/api/order/cancel/${orderId}`,
      {
        method: "PUT",
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error(`Cancel order failed: ${res.status}`);
    }
  } catch (error) {
    console.error("Failed to cancel order", error);
    throw error;
  }
}
