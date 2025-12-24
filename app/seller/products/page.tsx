"use client";

import { Button } from "@shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Input } from "@shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/form";
import {
  Plus,
  Clock,
  PackageMinusIcon,
  TicketCheckIcon,
  Search,
  Filter,
  ArrowUpDown,
  Edit,
  Eye,
  Trash2,
  Package,
  Minus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { environment } from "../../../environment";

type SellerProduct = {
  id: number;
  name: string;
  baseUnit: string;
  imageUrl: string;
  price: number;
  discount: number;
  rating: number;
  location: string;
  categoryNames: string[];
};


export default function ProductsPage() {

  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${environment.SERVICE_URL}/api/products/seller`,
          {
            credentials: "include", 
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch seller products");
        }

        const json = await res.json();

        if (json.success) {
          setProducts(json.data.content);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const router = useRouter();
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold">
                Quản lý sản phẩm
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Quản lý danh sách sản phẩm, số lượng tồn kho, trạng thái sản
                phẩm
              </CardDescription>
            </div>
            <Button
              className="gap-2"
              onClick={() => router.push("/seller/add-product")}
            >
              <Plus className="h-4 w-4" />
              Thêm sản phẩm mới
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đang bán</CardTitle>
                <Clock className="h-6 w-6 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">
                  Sản phẩm đang được bán
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hết hàng</CardTitle>
                <PackageMinusIcon className="h-6 w-6 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  Sản phẩm hết hàng
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đã ẩn</CardTitle>
                <TicketCheckIcon className="h-6 w-6 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Sản phẩm đã ẩn</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Danh sách sản phẩm</h2>
      </div>

      {/* Search and Filter Bar */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Tìm kiếm sản phẩm..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Lọc theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="active">Đang bán</SelectItem>
                  <SelectItem value="out-of-stock">Hết hàng</SelectItem>
                  <SelectItem value="hidden">Đã ẩn</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="oldest">Cũ nhất</SelectItem>
                  <SelectItem value="name-asc">Tên A-Z</SelectItem>
                  <SelectItem value="name-desc">Tên Z-A</SelectItem>
                  <SelectItem value="price-low">Giá thấp</SelectItem>
                  <SelectItem value="price-high">Giá cao</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Sample Product Cards */}
        {loading ? (
          <p>Đang tải sản phẩm...</p>
        ) : (
          products.map((product) => {
            const finalPrice =
              product.price - (product.price * product.discount) / 100;

            return (
              <Card key={product.id}>
                <CardHeader className="pb-3">
                  <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Package className="h-12 w-12 text-muted-foreground" />
                    )}
                  </div>

                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>
                    {product.categoryNames.join(", ")}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {/* Price */}
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">
                        {finalPrice.toLocaleString()}đ
                      </span>
                      <span className="text-sm text-muted-foreground">
                        /{product.baseUnit.toLowerCase()}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="text-sm text-muted-foreground">
                      📍 {product.location}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600 font-medium">
                        Đang bán
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}

      </div>
    </div>
  );
}
