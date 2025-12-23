import type { Product, ProductCardData, ProductListing } from "../model/types";

export const mapProductToCard = (p: Product): ProductCardData => ({
  id: String(p.id),
  name: p.name,
  image:
    p.imageUrl ??
    p.images?.[0] ??
    "/placeholder.png",

  price: p.priceVndPerKg ?? p.price,
  originalPrice: p.discount
    ? p.price
    : undefined,

  rating: p.avgRating ?? p.rating,
  reviews: p.reviewCount,
  location: p.sellerLocation ?? p.location ?? "Không rõ",
});


export const mapListingToCard = (
  l: ProductListing
): ProductCardData => ({
  id: String(l.productId),
  name: l.name || l.productName,
  image: l.imageUrl ?? "/placeholder.png",
  price: l.price,
  location: l.location ?? "Không rõ",
});
