import { ProductsList } from "@features/products/components/products-list";
import { Breadcrumb } from "@components/ui/breadcrumb";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb path="/products" />
        <ProductsList />
      </div>
    </div>
  );
}
