import { Card } from '@shared/ui/card';
import { Star, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductCardData } from '@entities/product/model/types';
import { formatCurrency } from '@shared/utils/format';

export interface ProductCardProps extends ProductCardData {
  action?: React.ReactNode;
}

export const ProductCard = ({
  id,
  name,
  image,
  price,
  originalPrice,
  rating,
  reviews,
  location,

  action,
}: ProductCardProps) => {
  return (
    <Link href={`/products/${id}`}>
      <Card className="overflow-hidden hover:shadow-xl transition-all group cursor-pointer">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={image}
            alt={name}
            width={200}
            height={200}
            unoptimized={image.startsWith('http://localhost')}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div className="p-4">
          <h3 className="font-semibold mb-1 line-clamp-1">{name}</h3>

          {rating && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="text-sm font-medium">{rating}</span>
              <span className="text-sm text-muted-foreground">({reviews})</span>
            </div>
          )}

          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
            <MapPin className="h-3.5 w-3.5" />
            <span className="line-clamp-1">{location}</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-success">{formatCurrency(price)}</div>
              {originalPrice && (
                <div className="text-xs text-muted-foreground line-through">
                  {formatCurrency(originalPrice)}
                </div>
              )}
            </div>

            {action}
          </div>
        </div>
      </Card>
    </Link>
  );
};
