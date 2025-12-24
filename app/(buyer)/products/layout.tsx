// import { CartSidebar } from "../../../temp/components/cart-sidebar";
import { CartSidebar } from "@features/purchase/cart";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      <section className="fixed right-0 top-3">
        <CartSidebar />
      </section>
    </div>
  );
}
