"use client";
import {
  ProductGallery,
  ProductInfo,
  ProductDescription,
  type Product,
} from "@/entities/product";
import { ReviewSection, type Review } from "@/features/products/reviews";
import { Breadcrumb } from "@shared/ui/breadcrumb";
import { useState } from "react";

export function ProductDetailPage({
  product,
  reviews,
}: {
  product: Product;
  reviews: Review[];
}) {

  const [openComment, setOpenComment] = useState(false);
  const [imgs, setImgs] = useState(product.images);
  const [imgIdx, setImgIdx] = useState(0);
  
  return (
    <div>
    <div className={`container mx-auto px-4 py-8`}>
      <Breadcrumb
        path={`/products/${product.id}`}
        labels={{ [String(product.id)]: product.name }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>

      <ProductDescription description={product.description} />
      <ReviewSection reviews={reviews} setOpenComment={setOpenComment} openComment={openComment}/>
    </div>
    </div>
  );
}
