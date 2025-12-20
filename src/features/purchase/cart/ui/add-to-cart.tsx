"use client";
import { FC } from "react";
// import { toast } from "react-toastify";
import { /*addToCart,*/ ICartItem } from "@entities/cart";
import { Button } from "@shared/ui/button";

interface IAddToCart {
  readonly bookInfo: ICartItem;
  readonly className?: string;
}

export const AddToCart: FC<IAddToCart> = (props) => {
  const { bookInfo, className } = props;
  //   const dispatch = useAppDispatch();

  const addBookToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // dispatch(addToCart(bookInfo));
    // toast.success(SUCCESSFUL_ADDING);
  };

  return (
    <Button
      size="sm"
      className="bg-success hover:bg-success/90"
      onClick={addBookToCart}
    >
      + Thêm vào giỏ
    </Button>
  );
};
