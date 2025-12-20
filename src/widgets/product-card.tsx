import {
  ProductCard as UIProductCard,
  type ProductCardProps,
} from "@entities/product";
import { AddToCart } from "@features/purchase/cart";

export function ProductCard(props: Omit<ProductCardProps, "action">) {
  const action = (
    <AddToCart
      bookInfo={{
        id: props.id,
        name: props.name,
        price: props.price,
        imageUrl: props.image,
        sellerId: props.location,
        qty: 1,
      }}
    />
  );

  return <UIProductCard {...props} action={action} />;
}
