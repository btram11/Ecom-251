import { Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { Badge } from "@shared/ui/badge";
import Link from "next/link";

function TopBar() {
  return (
    <div
      className="
        hidden md:block
        bg-primary-background
      "
      aria-label="Thanh tiện ích"
    >
      <div className="container mx-auto px-4">
        <div className="h-8 text-xs flex items-center justify-between gap-4">
          <nav
            className="flex items-center gap-4"
            aria-label="Liên kết tiện ích"
          >
            <Link href="/seller" className="hover:text-foreground">
              Kênh người bán
            </Link>
            <Link href="/support" className="hover:text-foreground">
              Hỗ trợ
            </Link>
            <Link href="/contact" className="hover:text-foreground">
              Liên hệ
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <button className="hover:text-foreground" aria-label="Đổi ngôn ngữ">
              Tiếng Việt
            </button>
            <button className="hover:text-foreground" aria-label="Đổi tiền tệ">
              VND
            </button>
            <Link href="/app" className="hover:text-foreground">
              Tải app
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Header = () => {
  return (
    <>
      {/* <TopBar /> */}
      <header
        className={
          `bg-primary-background`
          // sticky top-0 z-50
        }
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <div className="text-2xl font-semibold text-black font-[cursive]">
              Farm <span className="text-green-600">Fresh</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-9 max-lg:gap-6">
              <Link
                href="/"
                className="font-medium hover:text-success transition-colors"
              >
                Trang chủ
              </Link>
              <Link
                href="/products"
                className="font-medium hover:text-success transition-colors"
              >
                Danh mục
              </Link>
              <Link
                href="/orders"
                className="font-medium hover:text-success transition-colors"
              >
                Đơn hàng
              </Link>
              <Link
                href="/about"
                className="font-medium hover:text-success transition-colors"
              >
                Về chúng tôi
              </Link>
            </nav>

            {/* Search */}
            <div className="flex-1 max-w-md hidden lg:block">
              <form className="relative" action="/products" method="GET">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  name="q"
                  placeholder="Tìm kiếm nông sản tươi sống"
                  className="pl-10 bg-white border-0 shadow-sm"
                />
              </form>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="icon" className="relative">
                <Link href="/cart" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-success">
                    2
                  </Badge>
                </Link>
              </Button>

              {/* <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button> */}
              <Button className="ml-2 bg-success hover:bg-success/90" asChild>
                <Link href="/login">Đăng nhập</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
