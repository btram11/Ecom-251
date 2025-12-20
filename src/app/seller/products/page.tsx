import { Button } from "@components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/form";
import { Plus, Clock, PackageMinusIcon, TicketCheckIcon, Search, Filter, ArrowUpDown, Edit, Eye, Trash2, Package, Minus } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold">Quản lý sản phẩm</CardTitle>
              <CardDescription className="text-base mt-2">Quản lý danh sách sản phẩm, số lượng tồn kho, trạng thái sản phẩm</CardDescription>
            </div>
            <Button className="gap-2">
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
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">Sản phẩm đang được bán</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hết hàng</CardTitle>
                <PackageMinusIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Sản phẩm hết hàng</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đã ẩn</CardTitle>
                <TicketCheckIcon className="h-4 w-4 text-muted-foreground" />
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
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                className="pl-10"
              />
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
        <Card>
          <CardHeader className="pb-3">
            <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="text-lg">Rau muống tươi</CardTitle>
            <CardDescription>Rau muống xanh tươi, vừa hái</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">25,000đ</span>
                <span className="text-sm text-muted-foreground">/kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Tồn kho:</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-semibold min-w-12 text-center">50</span>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-600 font-medium">Đang bán</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="text-lg">Cà rốt Đà Lạt</CardTitle>
            <CardDescription>Cà rốt tươi ngon từ Đà Lạt</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">35,000đ</span>
                <span className="text-sm text-muted-foreground">/kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Tồn kho:</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-semibold min-w-12 text-center">30</span>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-orange-600 font-medium">Hết hàng</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="text-lg">Tỏi Lý Sơn</CardTitle>
            <CardDescription>Tỏi Lý Sơn thơm ngon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">120,000đ</span>
                <span className="text-sm text-muted-foreground">/kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Tồn kho:</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-semibold min-w-12 text-center">15</span>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-600 font-medium">Đang bán</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="text-lg">Ớt hiểm tươi</CardTitle>
            <CardDescription>Ớt hiểm cay nồng từ vườn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">45,000đ</span>
                <span className="text-sm text-muted-foreground">/kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Tồn kho:</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-semibold min-w-12 text-center">8</span>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">Đã ẩn</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}