import { Checkbox } from "@shared/ui/form";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { CartItem } from "./cart-item";
import type { ICartItem } from "../model/types";

type CartItemGroupProps = {
  groupId: string;
  sellerName: string;
  lines: ICartItem[];

  /** Trạng thái checkbox nhóm: true / false / "indeterminate" */
  checked: CheckedState;

  /** User click checkbox nhóm */
  onToggleGroup: () => void;

  /** User click checkbox từng item */
  onToggleItem: (itemId: string) => void;
  onIncrease: (itemId: string) => void;
  onDecrease: (itemId: string) => void;
  onRemove: (itemId: string) => void;

  variant?: "default" | "compact";
};

export const CartItemGroup: React.FC<CartItemGroupProps> = ({
  groupId,
  sellerName,
  lines,
  checked,
  onToggleGroup,
  onToggleItem,
  onIncrease,
  onDecrease,
  onRemove,
  variant = "default",
}) => {
  const isCompact = variant === "compact";

  if (isCompact) {
    return (
      <div key={groupId} className="border-t border-slate-200 pt-2">
        <div className="flex items-center gap-2 py-1 text-xs">
          {/* <div className="flex justify-center">
            <Checkbox
              id={`group-checkbox-${groupId}`}
              checked={checked}
              onCheckedChange={() => onToggleGroup()}
              className="h-3.5 w-3.5"
            />
          </div> */}
          <label
            // htmlFor={`group-checkbox-${groupId}`}
            className="text-sm font-semibold text-slate-800 line-clamp-1"
          >
            {sellerName}
          </label>
        </div>

        <div className="py-1 flex flex-col gap-1.5">
          {lines.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              selected={item.isSelected ?? false}
              onToggleSelect={() => onToggleItem(item.id)}
              onIncrease={() => onIncrease(item.id)}
              onDecrease={() => onDecrease(item.id)}
              onRemove={() => onRemove(item.id)}
              variant="compact"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div key={groupId} className="border-t border-slate-100">
      <div className="flex items-center gap-2 bg-white px-5 py-3 text-xs">
        <div className="flex w-6 justify-center">
          <Checkbox
            id={`group-checkbox-${groupId}`}
            checked={checked}
            onCheckedChange={() => onToggleGroup()}
          />
        </div>
        <label
          htmlFor={`group-checkbox-${groupId}`}
          className="font-semibold text-slate-800 text-sm"
        >
          {sellerName}
        </label>
        <span className="rounded-sm border border-emerald-500 px-1.5 py-px text-[10px] font-semibold uppercase text-emerald-600">
          Shop
        </span>
      </div>

      {/* list sản phẩm */}
      <div className="bg-white px-5 py-3">
        {lines.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            selected={item.isSelected ?? false}
            onToggleSelect={() => onToggleItem(item.id)}
            onIncrease={() => onIncrease(item.id)}
            onDecrease={() => onDecrease(item.id)}
            onRemove={() => onRemove(item.id)}
          />
        ))}
      </div>

      {/* line mỏng cuối shop */}
      <div className="h-px bg-slate-100" />
    </div>
  );
};
