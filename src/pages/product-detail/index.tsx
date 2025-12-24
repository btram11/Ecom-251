import {
  ProductGallery,
  ProductInfo,
  ProductDescription,
  type Product,
} from "@/entities/product";
import { ReviewSection, type Review } from "@/features/products/reviews";
import { getProductByIdRaw } from "@entities/product/api/get-product";
import { isOk } from "@shared/api";
import { Breadcrumb } from "@shared/ui/breadcrumb";
import { notFound } from "next/navigation";

export async function ProductDetailPage({
  id
  // product,
  // reviews,
}: {
  // product: Product;
  // reviews: Review[];
  id: string
}) {
  const productRes = await getProductByIdRaw(id);
  if (!isOk(productRes)) {
    notFound()
  }
  const product = productRes.data
  return (
    <div className="w-11/12 mx-auto p-6 bg-white text-gray-800">
      <Breadcrumb
        path={`/products/${id}`}
        labels={{ [String(id)]: product.name }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductGallery images={[product.imageUrl ?? "/placeholder.png"]} />
        <ProductInfo product={product} />
      </div>

      <ProductDescription description={product.description ?? "Chưa có thông tin mô tả"} />
      <ReviewSection productID={id} sellerID={"1"}/>
    </div>
  );
}
