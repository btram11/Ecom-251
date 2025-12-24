import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/pages/product-detail";
import { getProductById } from "@entities/product";
import { getProductReviews } from "@features/products/reviews";
import { ProductDetailClient } from "../detail";

interface ProductDetailProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  return <ProductDetailClient id={(await params).id} />;
}

