import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./product-card";

const products = [
  {
    id: 1,
    name: "Nhãn xuồng cơm vàng",
    image:
      "https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=400&h=400&fit=crop",
    price: 180000,
    originalPrice: 220000,
    rating: 4.5,
    reviews: 1000,
    location: "Vựa trái cây côn Nhãn - Phường An Hội",
  },
  {
    id: 2,
    name: "Xoài cát Hòa Lộc",
    image:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop",
    price: 180000,
    originalPrice: 220000,
    rating: 4.5,
    reviews: 1000,
    location: "Vựa trái cây côn Nhãn - Phường An Hội",
  },
  {
    id: 3,
    name: "Gạo ST25 Hữu Cơ",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
    price: 180000,
    originalPrice: 220000,
    rating: 4.5,
    reviews: 1000,
    location: "Vựa trái cây côn Nhãn - Phường An Hội",
  },
  {
    id: 4,
    name: "Cải bó xôi tươi",
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
    price: 180000,
    originalPrice: 220000,
    rating: 4.5,
    reviews: 2000,
    location: "Nông trại Xanh Đà Lạt",
  },
  {
    id: 5,
    name: "Thịt heo đùi tươi",
    image:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=400&fit=crop",
    price: 180000,
    originalPrice: 220000,
    rating: 4.5,
    reviews: 2000,
    location: "Nông trại Xanh Đà Lạt",
  },
  {
    id: 6,
    name: "Thịt heo ba chỉ",
    image:
      "https://images.unsplash.com/photo-1551214012-8e67e4d73d07?w=400&h=400&fit=crop",
    price: 180000,
    originalPrice: 220000,
    rating: 4.5,
    reviews: 2000,
    location: "Nông trại Xanh Đà Lạt",
  },
];

export const FeaturedProducts = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Sản phẩm gần bạn</h2>
          <Button
            variant="ghost"
            className="gap-2 text-success hover:text-success/80"
          >
            Xem tất cả
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};
