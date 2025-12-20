import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/pages/product-detail";
import { getProductById } from "@entities/product";
import { getProductReviews } from "@features/products/reviews";

interface ProductDetailProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { id } = await params;

  const product = await getProductById(id);
  if (!product) notFound();

  const reviews = await getProductReviews(id);

  return <ProductDetailPage product={product} reviews={reviews} />;
}
