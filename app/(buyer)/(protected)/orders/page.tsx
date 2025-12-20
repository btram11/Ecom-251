import { OrdersPage } from "@pages/orders-page";
import { mockOrders } from "@/entities/order/mock";

export default function Page() {
  const orders = mockOrders;
  return <OrdersPage orders={orders} />;
}
