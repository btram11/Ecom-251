export type Product = {
  id: string;
  name: string;
  avgRating: number;
  reviewCount: number;

  sellerLocation: string; // "Vựa trái cây..."
  origin: string; // "Bến Tre"
  harvestDateISO: string; // "2025-02-22"
  stockKg: number;

  priceVndPerKg: number;
  images: string[];
  description: string;
};
