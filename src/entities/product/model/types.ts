export type Product = {
  /** ====== From Java ====== */
  id: number;
  name: string;

  baseUnit: "PIECE" | "KG" | "BOX" | string;
  imageUrl?: string;
  imageType?: string;

  price: number;
  discount?: number;
  rating?: number;

  location?: string;
  categoryNames?: string[];

  /** ====== Legacy / frontend-only ====== */
  avgRating?: number;
  reviewCount?: number;

  sellerLocation?: string;
  origin?: string;
  harvestDateISO?: string;
  stockKg?: number;

  priceVndPerKg?: number;
  images?: string[];
  description?: string;
};



export type ProductListing = {
  sellerId: string;
  productId: number;

  stock: number;
  price: number;

  /** Listing info */
  name: string;
  description?: string;

  imageUrl?: string;
  imageType?: string;

  /** Product snapshot */
  productName: string;
  productUnit: string;

  location?: string;

  createdAt: string; // ISO datetime
};

export type ProductCardData = {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  location: string;
};

