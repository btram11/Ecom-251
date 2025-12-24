"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@entities/category";
import { Checkbox, Label, Slider } from "@shared/ui/form";

type Props = {
  categories: Category[];
};

export const Filter = ({ categories }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams?.toString());

    if (!value) params.delete(key);
    else params.set(key, value);

    router.push(`?${params.toString()}`);
  };

  const toggleMultiValue = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    const current = params.getAll(key);

    if (current.includes(value)) {
      params.delete(key);
      current.filter(v => v !== value).forEach(v => params.append(key, v));
    } else {
      params.append(key, value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <aside className="w-full max-md:max-w-full space-y-6 max-w-48">
      <div>
        <h3 className="font-semibold mb-4">Bộ lọc sản phẩm</h3>

        {/* Category Filter */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Danh mục</h4>
          <div className="space-y-2">
            {categories.map((category) => {
              const checked =
                searchParams?.getAll("categoryName")
                  .includes(category.name);

              return (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cat-${category.id}`}
                    checked={checked}
                    onCheckedChange={() =>
                      toggleMultiValue("categoryName", category.name)
                    }
                  />
                  <Label
                    htmlFor={`cat-${category.id}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category.name}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Price Range Slider */}
        <div className="mt-6 pt-6 border-t space-y-3">
          <h4 className="text-sm font-medium">Khoảng giá</h4>
          <div className="space-y-4">
            <Slider
              defaultValue={[50]}
              max={200}
              step={10}
              className="w-full"
            />
            <div className="space-y-2">
              {[
                { id: "under-50", label: "< 50k" },
                { id: "50-100", label: "50k - 100k" },
                { id: "100-150", label: "100k - 150k" },
                { id: "over-150", label: "> 150k" },
              ].map((price) => (
                <div key={price.id} className="flex items-center space-x-2">
                  <Checkbox id={price.id} />
                  <Label
                    htmlFor={price.id}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {price.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location Filter */}
        <div className="mt-6 pt-6 border-t space-y-3">
          <h4 className="text-sm font-medium">Khu vực</h4>
          <div className="space-y-2">
            {[
              { id: "hcm", label: "TP. Hồ Chí Minh" },
              { id: "binh-duong", label: "Bình Dương" },
              { id: "dong-nai", label: "Đồng Nai" },
              { id: "vinh-long", label: "Vĩnh Long" },
            ].map((location) => (
              <div key={location.id} className="flex items-center space-x-2">
                <Checkbox id={location.id} />
                <Label
                  htmlFor={location.id}
                  className="text-sm font-normal cursor-pointer"
                >
                  {location.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mt-6 bg-green-600 hover:bg-green-800  text-white font-bold text-center rounded-md p-2">Lọc sản phẩm</div>

      </div>
    </aside>
  );
};
