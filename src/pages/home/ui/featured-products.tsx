// import { ArrowRight } from "lucide-react";
// import { ProductCard } from "@widgets/product-card";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { environment } from "../../../../environment";

// type Product = {
//   id: string;
//   name: string;
//   imageUrl: string;
//   price: number;
//   discount?: number;
//   rating: number;
//   location: string;
// };

// // const products = [
// //   {
// //     id: "1",
// //     name: "Nhãn xuồng cơm vàng",
// //     image:
// //       "https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=400&h=400&fit=crop",
// //     price: 180000,
// //     originalPrice: 220000,
// //     rating: 4.5,
// //     reviews: 1000,
// //     location: "Vựa trái cây cồn Nhãn - Phường An Hội",
// //   },
// //   {
// //     id: "2",
// //     name: "Xoài cát Hòa Lộc",
// //     image:
// //       "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop",
// //     price: 180000,
// //     originalPrice: 220000,
// //     rating: 4.5,
// //     reviews: 1000,
// //     location: "Vựa trái cây cồn Nhãn - Phường An Hội",
// //   },
// //   {
// //     id: "3",
// //     name: "Gạo ST25 Hữu Cơ",
// //     image:
// //       "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
// //     price: 180000,
// //     originalPrice: 220000,
// //     rating: 4.5,
// //     reviews: 1000,
// //     location: "Vựa trái cây cồn Nhãn - Phường An Hội",
// //   },
// //   {
// //     id: "4",
// //     name: "Cải bó xôi tươi",
// //     image:
// //       "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
// //     price: 180000,
// //     originalPrice: 220000,
// //     rating: 4.5,
// //     reviews: 2000,
// //     location: "Nông trại Xanh Đà Lạt",
// //   },
// //   {
// //     id: "5",
// //     name: "Thịt heo đùi tươi",
// //     image:
// //       "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=400&fit=crop",
// //     price: 180000,
// //     originalPrice: 220000,
// //     rating: 4.5,
// //     reviews: 2000,
// //     location: "Nông trại Xanh Đà Lạt",
// //   },
// //   {
// //     id: "6",
// //     name: "Thịt heo ba chỉ",
// //     image:
// //       "https://images.unsplash.com/photo-1551214012-8e67e4d73d07?w=400&h=400&fit=crop",
// //     price: 180000,
// //     originalPrice: 220000,
// //     rating: 4.5,
// //     reviews: 2000,
// //     location: "Nông trại Xanh Đà Lạt",
// //   },
// // ];

// export const FeaturedProducts = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const ctrl = new AbortController();

//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const res = await fetch(
//           `${environment.SERVICE_URL}/api/products`,
//           { signal: ctrl.signal }
//         );

//         if (!res.ok) {
//           throw new Error(`Lỗi ${res.status}`);
//         }

//         const json = await res.json();
//         const content = json?.data?.content ?? [];

//         const mapped: Product[] = content.map((p: any) => ({
//           id: String(p.id),
//           name: p.name,
//           imageUrl: p.imageUrl || "/placeholder.png",
//           price: p.price,
//           discount: p.discount,
//           rating: p.rating,
//           location: p.location,
//         }));

//         setProducts(mapped);
//       } catch (err: any) {
//         if (err.name !== "AbortError") {
//           setError(err.message || "Không thể tải sản phẩm");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//     return () => ctrl.abort();
//   }, []);

//   return (
//     <section className="py-12">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold">Sản phẩm gần bạn</h2>
//           <Link
//             href="/products"
//             className="link-glow text-sm transition-all duration-300 hover:gap-3"
//           >
//             Xem tất cả
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-4">
//           {loading
//             ? Array.from({ length: 4 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="h-64 rounded-lg bg-gray-200 animate-pulse"
//                 />
//               ))
//             : products.map((product) => (
//                 <ProductCard key={product.id} {...product} />
//               ))}
//         </div>
//       </div>
//     </section>
//   );
// };

"use client";

import { ArrowRight } from "lucide-react";
import { ProductCard } from "@widgets/product-card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { environment } from "../../../../environment";

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  discount?: number;
  rating: number;
  location: string;
};

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${environment.SERVICE_URL}/api/products`,
          { signal: ctrl.signal }
        );

        if (!res.ok) {
          throw new Error(`Lỗi ${res.status}`);
        }

        const json = await res.json();
        const content = json?.data?.content ?? [];

        const mapped: Product[] = content.map((p: any) => ({
          id: String(p.id),
          name: p.name,
          image: p.imageUrl || "/placeholder.png",
          price: p.price - (p.discount/100 * p.price || 0),
          originalPrice: p.price,
          discount: p.discount,
          rating: p.rating,
          location: p.location,
        }));

        setProducts(mapped);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message || "Không thể tải sản phẩm");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    return () => ctrl.abort();
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Sản phẩm gần bạn</h2>

          <Link
            href="/products"
            className="link-glow text-sm transition-all duration-300 hover:gap-3 flex items-center gap-1"
          >
            Xem tất cả
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {error && (
          <div className="text-sm text-red-500 mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4 gap-2">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 rounded-lg bg-gray-200 animate-pulse"
                />
              ))
            : products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
        </div>
      </div>
    </section>
  );
};

