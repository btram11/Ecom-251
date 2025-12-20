import { FeaturedProducts } from "@pages/home/ui/featured-products";
import { CategoryGrid } from "@pages/home/ui/category";
import { Hero } from "@pages/home/ui/hero";

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
    </div>
  );
}
