import { ProductCard } from "./product-card";

const products = [
  {
    id: "1",
    name: "Thịt heo đùi tươi",
    image:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=400&fit=crop",
    price: 45000,
    rating: 4.5,
    reviews: 100,
    location: "Vựa trái cây cồn Nhãn - Phường An Hội",
  },
  {
    id: "2",
    name: "Nhãn xuồng cơm vàng",
    image:
      "https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=400&h=400&fit=crop",
    price: 45000,
    rating: 4.5,
    reviews: 100,
    location: "Vựa trái cây cồn Nhãn - Phường An Hội",
  },
  {
    id: "3",
    name: "Gạo ST25",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
    price: 45000,
    rating: 4.5,
    reviews: 100,
    location: "Vựa trái cây cồn Nhãn - Phường An Hội",
  },
  {
    id: "4",
    name: "Xoài cát Hòa Lộc",
    image:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop",
    price: 45000,
    rating: 4.5,
    reviews: 100,
    location: "Vựa trái cây cồn Nhãn - Phường An Hội",
  },
  {
    id: "5",
    name: "Cải bó xôi tươi",
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
    price: 45000,
    rating: 4.5,
    reviews: 100,
    location: "Nông trại Xanh Đà Lạt",
  },
  {
    id: "6",
    name: "Thịt heo ba chỉ",
    image:
      "https://images.unsplash.com/photo-1551214012-8e67e4d73d07?w=400&h=400&fit=crop",
    price: 45000,
    rating: 4.5,
    reviews: 100,
    location: "Nông trại Xanh Đà Lạt",
  },
  {
    id: "7",
    name: "Cà chua bi",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop",
    price: 45000,
    rating: 4.5,
    reviews: 100,
    location: "Nông trại Xanh Đà Lạt",
  },
  {
    id: "8",
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
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};
