import Image from "next/image";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ name, price, image }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <Image src={image} alt={name} width={300} height={200} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-green-600 font-bold">{price.toLocaleString()} ₫</p>
      </div>
    </div>
  );
}
