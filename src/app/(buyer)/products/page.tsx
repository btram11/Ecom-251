import { ProductsList } from "@features/products/components/products-list";
import { Breadcrumb } from "@components/ui/breadcrumb";
import Navbar from "@components/Navbar";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar/>
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb path="/products" />
        <ProductsList />
      </div>
    </div>
  );
}
