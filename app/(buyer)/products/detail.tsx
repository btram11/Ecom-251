"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/pages/product-detail";
import { getProductById } from "@entities/product";
import { getProductReviews } from "@features/products/reviews";
import type { Product } from "@/entities/product";
import type { Review } from "@/features/products/reviews";

export function ProductDetailClient({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const p = await getProductById(id);
      if (!p) {
        notFound();
        return;
      }

      const r = await getProductReviews(id);
      setProduct(p);
      setReviews(r);
      setLoading(false);
    }

    load();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!product) return <div>Product not found</div>;

  return <ProductDetailPage product={product} reviews={reviews} />;
}
