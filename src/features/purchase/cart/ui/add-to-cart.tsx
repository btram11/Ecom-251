"use client";
import { FC, useState } from "react";
import { Button } from "@shared/ui/button";
import { environment } from "../../../../../environment";

interface AddToCartProps {
  productId: number;
  amount: number;
  className?: string;
}

export const AddToCart: FC<AddToCartProps> = ({
  productId,
  amount,
  className,
}) => {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      const res = await fetch(
        `${environment.SERVICE_URL}/api/user/cart`,
        {
          method: "POST",
          credentials: "include", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
            amount,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`Add to cart failed: ${res.status}`);
      }

      // optional: parse response
      // const json = await res.json();

      alert("Đã thêm vào giỏ hàng");
    } catch (err) {
      console.error(err);
      alert("Không thể thêm vào giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      className={`bg-success hover:bg-success/90 ${className ?? ""}`}
      onClick={handleAddToCart}
      disabled={loading}
    >
      {loading ? "Đang thêm..." : "+ Thêm vào giỏ"}
    </Button>
  );
};
