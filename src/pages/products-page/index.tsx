import { Filter } from "@features/products/ui/filter";
import { Button } from "@shared/ui/button";
import { ProductsList } from "@widgets/product-list";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/form";
import { Breadcrumb } from "@shared/ui/breadcrumb";

export function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb path="/products" />
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
            <ProductsList />

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 pt-6">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                disabled
              >
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
      </div>
    </div>
  );
}
