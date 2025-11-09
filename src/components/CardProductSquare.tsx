import Image from "next/image";
import RatingStar from "./RatingStar";
import { MapPin, Plus } from "lucide-react";

interface ProductCardProps {
  name: string;
  rating: number;
  reviews: number;
  address: string;
  unit: string;
  original_price: number;
  sale_price: number;
  image: string;
}

export default function ProductCard({
  name,
  rating,
  reviews,
  address,
  unit,
  original_price,
  sale_price,
  image,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border border-gray-200">
      <Image
        src={image}
        alt={name}
        width={260}
        height={360}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        {/* <RatingStar rating={rating} />
         */}
        <div className="flex flex-row items-center">
          <div className="col-1 w-1/2 text-sm flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.372 1.24.588 1.81l-3.387 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.387-2.46a1 1 0 00-1.176 0l-3.387 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.387-2.46c-.784-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
            </svg>
            {`  ${rating}`}
          </div>
          <div className="col-2 w-1/2 flex justify-end-safe items-center text-[10px]">
            Đã bán 100+
          </div>
        </div>
        <div className="flex mt-1">
          <MapPin className="w-2.5 h-2.5 mr-1 text-gray-400" />
          <span className="text-sm text-gray-500 text-[10px]">{address}</span>
        </div>
        <p className="text-green-600 font-bold my-2 text-lg">{sale_price} ₫/{unit}</p>
      </div>

      <div className="h-10 pt-2 mb-2 w-11/12 mx-auto text-center border rounded-lg bg-green-500 text-white align-middle items-center hover:bg-green-600">
          <div className="flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            <text>Thêm vào giỏ hàng </text>
          </div>
          
        
      </div>
    </div>
  );
}
