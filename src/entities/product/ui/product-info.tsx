import { MapPin, Truck, Leaf, Clock } from 'lucide-react';
import type { Product } from '../model/types';
import { RatingStar } from '@/shared/ui/rating-star';
import { formatCurrency } from '@shared/utils/format';

export function ProductInfo({ product }: { product: Product }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{product.name}</h1>

      <div className="flex items-center gap-2">
        <RatingStar rating={product.avgRating} />
        <p className="font-medium text-gray-700">
          {product.avgRating}{' '}
          <span className="text-sm text-gray-500">({product.reviewCount} đánh giá)</span>
        </p>
      </div>

      <div className="flex flex-row">
        <MapPin size={16} className="text-gray-500 mr-2" />
        <p className="text-gray-500 text-sm">{product.sellerLocation}</p>
      </div>

      <div className="space-y-1 text-gray-600 text-sm">
        <p>
          <span className="font-medium">Xuất xứ:</span> {product.origin}
        </p>
        <p>
          <span className="font-medium">Ngày thu hoạch:</span> {product.harvestDateISO}
        </p>
        <p>
          <span className="font-medium">Còn lại:</span> {product.stockKg} kg
        </p>
      </div>

      <p className="text-green-600 text-2xl font-semibold">
        {formatCurrency(product.price)} <span className="text-base text-gray-600">/kg</span>
      </p>

      <div className="flex flex-wrap gap-3 pt-3">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-sm">
          <Truck size={16} /> Giao hàng nhanh
        </div>
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-sm">
          <Leaf size={16} /> Sản phẩm tươi, sạch
        </div>
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-sm">
          <Clock size={16} /> Thu hoạch trong thời gian gần
        </div>
      </div>
    </div>
  );
}
