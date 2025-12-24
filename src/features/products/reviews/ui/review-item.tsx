import { RatingStar } from "@shared/ui/rating-star";
import type { Review } from "../model/types";

export function ReviewItem({ name, createdAt, rating, comment }: Review) {
  return (
    <div className="border-b pb-2 border-b-gray-200 transition">
      <div className="flex items-center justify-between">
        <div className="flex flex-row gap-2">
          <p className="font-medium">{name}</p>
          <RatingStar rating={rating} />
        </div>
        <p className="text-sm text-gray-500">{createdAt}</p>
      </div>
      <p className="text-sm mt-1">{comment}</p>
    </div>
  );
}
