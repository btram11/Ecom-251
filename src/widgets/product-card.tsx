import {
  ProductCard as UIProductCard,
  type ProductCardProps,
} from "@entities/product";
import { AddToCart } from "@features/purchase/cart";

export function ProductCard(props: Omit<ProductCardProps, "action">) {
  const action = (
    <AddToCart
      productId={Number(props.id)}
      amount={props.price}
    />
  );

  return <UIProductCard {...props} action={action} />;
}
