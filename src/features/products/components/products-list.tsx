import { Filter } from "./filter";
import { Button } from "@components/ui/button";
import { ProductCard } from "./product-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/form";

const products = [
  {
    id: 1,
    name: "Thịt heo đùi tươi",
    image:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=400&fit=crop",
    price: 45000,
    rating: 4.5,
    reviews: 100,
    location: "Vựa trái cây cồn Nhãn - Phường An Hội",
  },
  {
    id: 2,
    name: "Nhãn xuồng cơm vàng",
    image:
      "https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=400&h=400&fit=crop",
    price: 45000,
    rating: 4.5,
    reviews: 100,
    location: "Vựa trái cây cồn Nhãn - Phường An Hội",
  },
  {
    id: 3,
    name: "Gạo ST25",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
    price: 45000,
    rating: 4.5,
    reviews: 100,
    location: "Vựa trái cây cồn Nhãn - Phường An Hội",
  },
  {
    id: 4,
    name: "Xoài cát Hòa Lộc",
    image:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop",
    price: 45000,
    rating: 4.5,
    reviews: 100,
    location: "Vựa trái cây cồn Nhãn - Phường An Hội",
  },
  {
    id: 5,
    name: "Cải bó xôi tươi",
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
    price: 45000,
    rating: 4.5,
    reviews: 100,
    location: "Nông trại Xanh Đà Lạt",
  },
  {
    id: 6,
    name: "Thịt heo ba chỉ",
    image:
      "https://images.unsplash.com/photo-1551214012-8e67e4d73d07?w=400&h=400&fit=crop",
    price: 45000,
    rating: 4.5,
    reviews: 100,
    location: "Nông trại Xanh Đà Lạt",
  },
  {
    id: 7,
    name: "Cà chua bi",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop",
    price: 45000,
    rating: 4.5,
    reviews: 100,
    location: "Nông trại Xanh Đà Lạt",
  },
  {
    id: 8,
    name: "Ớt hiểm",
    image:
      "https://images.unsplash.com/photo-1583663848850-46af132dc08e?w=400&h=400&fit=crop",
    price: 45000,
    rating: 4.5,
    reviews: 100,
    location: "Nông trại Xanh Đà Lạt",
  },
];

export const ProductsList = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Filter />

      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-end gap-4">
          <div className="text-sm text-muted-foreground">Sắp xếp</div>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sắp xếp" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Mới nhất</SelectItem>
              <SelectItem value="price-asc">Giá thấp đến cao</SelectItem>
              <SelectItem value="price-desc">Giá cao đến thấp</SelectItem>
              <SelectItem value="popular">Phổ biến nhất</SelectItem>
              <SelectItem value="rating">Đánh giá cao</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 pt-6">
          <Button variant="outline" size="icon" className="h-9 w-9" disabled>
            ‹
          </Button>
          <Button
            variant="default"
            size="icon"
            className="h-9 w-9 bg-success hover:bg-success/90"
          >
            1
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            2
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            3
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            4
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            ›
          </Button>
        </div>
      </div>
    </div>
  );
};
