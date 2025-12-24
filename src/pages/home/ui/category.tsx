import Image from "next/image";
import { Card } from "@shared/ui/card";
import { getCategories, type Category } from "@entities/category";

export const CategoryGrid = async () => {
  const res = await getCategories();

  if (!res.success) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Danh mục sản phẩm</h2>
          <div className="text-red-500 text-sm">
            Đã có lỗi: {res.message}
          </div>
        </div>
      </section>
    );
  }

  const categories = res.data;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Danh mục sản phẩm</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-4">
          {categories.map((category) => {
            const imageSrc =
              category.imageUrl && category.imageUrl.trim() !== ""
                ? category.imageUrl
                : "/placeholder.png";

            const isLocalhost =
              imageSrc.startsWith("http://localhost") ||
              imageSrc.startsWith("http://127.0.0.1");

            return (
              <Card
                key={category.id}
                className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-success group"
              >
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <Image
                      src={imageSrc}
                      alt={category.name}
                      width={48}
                      height={48}
                      unoptimized={isLocalhost}
                    />
                  </div>

                  <h3 className="font-semibold text-sm mb-1">
                    {category.name}
                  </h3>

                  <p className="text-xs text-muted-foreground">
                    {category.description ?? ""}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
