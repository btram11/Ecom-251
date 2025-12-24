import { Search, ShoppingCart, User } from 'lucide-react';
import { Button } from '@shared/ui/button';
import { Input } from '@shared/ui/input';
import Link from 'next/link';
import { CartCountBadge } from '@features/purchase/cart';
import { getUserInfo } from '@entities/user';
import Image from 'next/image';
import { cookies } from 'next/headers';

export const Header = async () => {
  cookies();
  const user = await getUserInfo();
  return (
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
            <Link href="/" className="font-medium hover:text-success transition-colors">
              Trang chủ
            </Link>
            <Link href="/products" className="font-medium hover:text-success transition-colors">
              Danh mục
            </Link>
            <Link href="/orders" className="font-medium hover:text-success transition-colors">
              Đơn hàng
            </Link>
            <Link href="/about" className="font-medium hover:text-success transition-colors">
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
                {user && <CartCountBadge />}
              </Link>
            </Button>

            {user && (
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100 ml-2">
                <Image
                  src={user.picture?.trim() ? user.picture : '/placeholder.png'}
                  alt={user.name?.trim() ? user.name : 'Ảnh đại diện'}
                  fill
                  sizes="40px"
                  className="object-cover"
                  priority
                />
              </div>
            )}
            {!user && (
              <Button className="ml-2 bg-success hover:bg-success/90" asChild>
                <Link href="/login">Đăng nhập</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
