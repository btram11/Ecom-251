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
import { Label } from "@shared/ui/form";
import { Checkbox } from "@shared/ui/form";
import { Upload, Save, X, Star, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { environment } from "../../../environment";
type Category = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  imageType: string;
};



export default function AddProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [baseUnit, setBaseUnit] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [rating, setRating] = useState("");
  const [location, setLocation] = useState("");

  const [imageBase64, setImageBase64] = useState<string>("");
  const [imageType, setImageType] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${environment.SERVICE_URL}/api/categories`);
        const json = await res.json();

        if (json.success) {
          setCategories(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);


  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file ảnh");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Ảnh không được vượt quá 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(",")[1];
      setImageBase64(base64);
      setImageType(file.type);
    };
    reader.readAsDataURL(file);
  };


  const handleSubmit = async () => {
    if (!name || !baseUnit || !price || !categoryId || !imageBase64) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc");
      return;
    }

    const payload = {
      name,
      baseUnit,
      categoryIds: [categoryId], // ✅ từ Select
      price: Number(price),
      discount: Number(discount) || 0,
      rating: Number(rating) || 5,
      location,
      imageBlobString: imageBase64,
      imageType,
    };

    try {
      const res = await fetch(`${environment.SERVICE_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Upload sản phẩm thất bại");

      alert("Đăng bán sản phẩm thành công!");

      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi đăng bán");
    }
  };


  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Đăng bán sản phẩm</h1>
          <p className="text-muted-foreground text-base mt-2">
            Đăng sản phẩm của bạn lên cửa hàng để bán
          </p>
        </div>

        {/* Product Images Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Hình ảnh sản phẩm
            </CardTitle>
            <CardDescription>
              Thêm tối thiểu 5 hình ảnh sản phẩm. Hình ảnh đầu tiên được chọn
              làm ảnh chính.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
              {/* Main image indicator */}
              <div className="relative group">
                <label className="aspect-square border-2 border-primary border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/70 hover:bg-primary/5 transition-all duration-200">
                  <Upload className="h-10 w-10 text-primary mb-3" />
                  <span className="text-sm text-primary font-medium">Ảnh chính</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Click để thêm
                  </span>
                  

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleImageUpload(e.target.files[0]);
                      }
                    }}
                  />
                </label>
                {imageBase64 && (
                  <div className="mt-6 flex justify-center">
                    <img
                      src={`data:${imageType};base64,${imageBase64}`}
                      alt="Preview"
                      className="h-40 rounded-lg border"
                    />
                  </div>
                )}

                <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground rounded-full p-2 shadow-lg">
                  <Star className="h-4 w-4" />
                </div>
              </div>

              {/* Additional images */}
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="aspect-square border-2 border-dashed border-muted-foreground/25 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-muted-foreground/50 hover:bg-muted/50 transition-all duration-200"
                >
                  <Upload className="h-8 w-8 text-muted-foreground mb-3" />
                  <span className="text-sm text-muted-foreground text-center">
                    Ảnh {index + 2}
                  </span>
                </div>
              ))}
            </div>
            

            <p className="text-sm text-muted-foreground mt-6 text-center">
              💡 Mẹo: Sử dụng ảnh chất lượng cao, chụp từ nhiều góc độ để sản
              phẩm được hiển thị đẹp nhất.
            </p>
          </CardContent>
        </Card>

        {/* Product Information Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Thông tin sản phẩm</CardTitle>
            <CardDescription>
              Thông tin cơ bản về sản phẩm của bạn
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label htmlFor="product-name" className="text-sm font-medium">
                  Tên sản phẩm *
                </Label>
                <Input
                  id="product-name"
                  placeholder="Ví dụ: Rau muống tươi Đà Lạt"
                  className="h-12"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="category" className="text-sm font-medium">
                  Danh mục *
                </Label>
                <Select
                  value={categoryId ? String(categoryId) : undefined}
                  onValueChange={(value) => setCategoryId(Number(value))}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>

                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

              </div>

              <div className="space-y-3">
                <Label htmlFor="origin" className="text-sm font-medium">
                  Xuất xứ *
                </Label>
                <Input
                  id="origin"
                  placeholder="Ví dụ: Đà Lạt, Lâm Đồng"
                  className="h-12"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="text-sm font-medium">
                Mô tả sản phẩm *
              </Label>
              <textarea
                id="description"
                placeholder="Mô tả chi tiết về sản phẩm, nguồn gốc, cách sử dụng..."
                className="flex min-h-32 w-full rounded-md border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                rows={5}
              />
            </div>
          </CardContent>
        </Card>

        {/* Price and Inventory Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Giá cả và kho hàng</CardTitle>
            <CardDescription>
              Thiết lập giá bán và quản lý tồn kho
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="space-y-3">
                <Label htmlFor="price" className="text-sm font-medium">
                  Giá bán (VNĐ) *
                </Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="25000"
                  className="h-12"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="unit" className="text-sm font-medium">
                  Đơn vị *
                </Label>
                <Select onValueChange={(value) => setBaseUnit(value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Chọn đơn vị" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="KILOGRAM">KILOGRAM</SelectItem>
                    <SelectItem value="LITER">LITER</SelectItem>
                    <SelectItem value="PIECE">PIECE</SelectItem>
                  </SelectContent>
                </Select>

              </div>

              <div className="space-y-3">
                <Label htmlFor="quantity" className="text-sm font-medium">
                  Sản lượng có sẵn *
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="50"
                  className="h-12"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="harvest-date" className="text-sm font-medium">
                  Ngày thu hoạch
                </Label>
                <Input id="harvest-date" type="date" className="h-12" />
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <Checkbox id="certification" className="mt-1" />
                <div className="space-y-2">
                  <Label
                    htmlFor="certification"
                    className="text-sm font-medium text-blue-900"
                  >
                    Có giấy kiểm định chất lượng (GAP, VietGAP, Organic...)
                  </Label>
                  <p className="text-xs text-blue-700">
                    Khách hàng tin tưởng hơn với sản phẩm có chứng nhận chất
                    lượng. Điều này giúp tăng tỷ lệ bán hàng.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Tags Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Thẻ sản phẩm
            </CardTitle>
            <CardDescription>
              Thêm thẻ để sản phẩm tiếp cận đến người dùng phù hợp. Chọn các thẻ
              liên quan để tăng khả năng hiển thị.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              {/* Popular Tags */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-gray-900">
                  Thẻ phổ biến
                </h4>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                  {[
                    "Hữu cơ",
                    "Đạt chuẩn VietGAP",
                    "Rau củ",
                    "Giá tốt",
                    "Tươi ngon",
                    "Nông sản sạch",
                    "Không chất bảo quản",
                    "Thu hoạch tươi",
                    "Địa phương",
                    "Giá ưu đãi",
                    "Sản phẩm mới",
                    "Bán chạy",
                    "Nông sản Việt Nam",
                    "Chất lượng cao",
                    "An toàn thực phẩm",
                    "Không hóa chất",
                    "Tự nhiên",
                    "Nông nghiệp bền vững",
                    "Hỗ trợ nông dân",
                    "Giá gốc",
                    "Khuyến mãi",
                  ].map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs h-10 px-4 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors"
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Category Tags */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-gray-900">
                  Theo danh mục
                </h4>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                  {[
                    "Rau xanh",
                    "Củ quả",
                    "Trái cây",
                    "Gia vị",
                    "Thảo mộc",
                    "Ngũ cốc",
                    "Đậu",
                    "Hạt",
                    "Mật ong",
                    "Trứng",
                    "Sữa",
                    "Thịt sạch",
                    "Cá biển",
                    "Hải sản",
                    "Nấm",
                    "Đồ khô",
                  ].map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs h-10 px-4 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Tags */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-gray-900">
                  Thẻ tùy chỉnh
                </h4>
                <div className="space-y-3">
                  <Input
                    id="custom-tags"
                    placeholder="Thêm thẻ riêng của bạn (phân cách bằng dấu phẩy)"
                    className="h-12"
                  />
                  <p className="text-sm text-muted-foreground">
                    💡 Gợi ý: Sử dụng thẻ ngắn gọn, dễ hiểu để người dùng tìm
                    thấy sản phẩm của bạn. Ví dụ: "rau sạch Đà Lạt", "cà phê Cầu
                    Đất"
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-4 bg-white p-6 rounded-lg border shadow-sm">
          <Button variant="outline" size="lg" className="px-8">
            <X className="h-5 w-5 mr-2" />
            Hủy
          </Button>
          <Button onClick={handleSubmit} size="lg" className="px-8 bg-green-600 hover:bg-green-700">
            <Save className="h-5 w-5 mr-2" />
            Đăng bán sản phẩm
          </Button>
        </div>
      </div>
    </div>
  );
}
