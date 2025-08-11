import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  location: string;
}

export const ProductCard = ({
  name,
  image,
  price,
  originalPrice,
  rating,
  reviews,
  location,
}: ProductCardProps) => {
  return (
    <Link href={`/products/${name.replace(/\s+/g, "-").toLowerCase()}`}>
      <Card className="overflow-hidden hover:shadow-xl transition-all group cursor-pointer">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div className="p-4">
          <h3 className="font-semibold mb-1 line-clamp-1">{name}</h3>

          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-sm text-muted-foreground">({reviews})</span>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
            <MapPin className="h-3.5 w-3.5" />
            <span className="line-clamp-1">{location}</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-success">
                {price.toLocaleString("vi-VN")} đ/kg
              </div>
              {originalPrice && (
                <div className="text-xs text-muted-foreground line-through">
                  {originalPrice.toLocaleString("vi-VN")}đ
                </div>
              )}
            </div>

            <Button size="sm" className="bg-success hover:bg-success/90">
              + Thêm vào giỏ
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};
