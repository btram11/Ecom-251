import { Card } from "@shared/ui/card";

const categories = [
  { id: 1, name: "Trái cây", icon: "🍊", count: "300+ sản phẩm" },
  { id: 2, name: "Rau sạch hữu cơ", icon: "🥬", count: "200+ sản phẩm" },
  { id: 3, name: "Thịt tươi", icon: "🥩", count: "100+ sản phẩm" },
  { id: 4, name: "Thủy sản", icon: "🐟", count: "100+ sản phẩm" },
  { id: 5, name: "Gạo, Bột", icon: "🌾", count: "120+ sản phẩm" },
  { id: 6, name: "Gia vị", icon: "🧄", count: "120+ sản phẩm" },
  { id: 7, name: "Đặc sản", icon: "🎯", count: "120+ sản phẩm" },
  { id: 8, name: "Khác", icon: "🍯", count: "120+ sản phẩm" },
];

export const CategoryGrid = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Danh mục sản phẩm</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-success group"
            >
              <div className="text-center">
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {category.count}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
