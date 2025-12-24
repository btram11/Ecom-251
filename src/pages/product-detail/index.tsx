import {
  ProductGallery,
  ProductInfo,
  ProductDescription,
  type Product,
} from "@/entities/product";
import { ReviewSection, type Review } from "@/features/products/reviews";
import { Breadcrumb } from "@shared/ui/breadcrumb";

export function ProductDetailPage({
  product,
  reviews,
}: {
  product: Product;
  reviews: Review[];
}) {
  return (
    <div className="w-11/12 mx-auto p-6 bg-white text-gray-800">
      <Breadcrumb
        path={`/products/${product.id}`}
        labels={{ [String(product.id)]: product.name }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>

      <ProductDescription description={product.description} />
      <ReviewSection reviews={reviews} />
    </div>
  );
}
