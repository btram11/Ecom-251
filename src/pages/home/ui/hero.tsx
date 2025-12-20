import { Search, MapPin, Filter } from "lucide-react";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import Link from "next/link";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
});

export const Hero = () => {
  return (
    <section className="bg-primary-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-block bg-success text-success-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            🌳 Trực tiếp từ nông dân
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold mb-4 "
            style={pacifico.style}
          >
            <span className="block text-foreground">Chợ nông sản</span>
            <span
              className={`block text-success target:text-5xl/normal md:text-6xl/snug mt-2`}
            >
              tươi sống Việt Nam
            </span>
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Kết nối trực tiếp với nông dân để mang đến các sản phẩm tươi sạch,
            thơm ngon. <br />
            Giao hàng nhanh, đảm bảo chất lượng và giá cả hợp lý
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8"></p>

          <div className="bg-card rounded-2xl shadow-lg p-4 max-w-4xl mx-auto">
            <form
              action="/products"
              method="GET"
              className="flex flex-col md:flex-row gap-3"
            >
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  name="q"
                  placeholder="Tìm kiếm rau, củ, trái cây, hương, gia vị,..."
                  className="pl-10 h-12 border-0 bg-muted/50"
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="lg" className="gap-2">
                  <MapPin className="h-5 w-5" />
                  <span className="hidden md:inline">Vị trí của bạn</span>
                </Button>

                <Button variant="outline" size="lg" className="gap-2">
                  <Filter className="h-5 w-5" />
                  <span className="hidden md:inline">Lọc</span>
                </Button>

                <Button size="lg" className="bg-success hover:bg-success/90">
                  Tìm kiếm
                </Button>
              </div>
            </form>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mt-6">
            <div className="text-sm text-muted-foreground flex items-center">
              <span>Tìm kiếm phổ biến:</span>
            </div>
            {[
              "Rau hữu cơ",
              "Thịt heo sạch",
              "Sầu riêng bột",
              "Nhãn lồng tuần Giao",
              "ST25",
            ].map((tag) => (
              <Button
                key={tag}
                variant="secondary"
                size="sm"
                className="rounded-full h-8 text-xs bg-white shadow-sm hover:bg-success/10"
                asChild
              >
                <Link href={`/products?q=${encodeURIComponent(tag)}`}>
                  {tag}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
