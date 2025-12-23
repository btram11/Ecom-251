import { ProductCard } from "./product-card";
import type { ProductCardProps } from "@entities/product";

type Props = {
  items: ProductCardProps[];
};

export const ProductsList = ({items}: Props) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 md:gap-4">
      {items.map((item, idx) => (
        <ProductCard key={idx} {...item} />
      ))}
    </div>
  );
};
