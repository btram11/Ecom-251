import { Button } from '@shared/ui/button';
import Link from 'next/link';

export function RequireLogin() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">Chưa đăng nhập rồi bestie 😭</h1>
        <p className="mt-2 text-sm text-slate-600">
          Vui lòng đăng nhập để thực hiện thao tác này nha.
        </p>

        <div className="mt-5 flex items-center justify-center gap-3">
          <Button className="ml-2 bg-success hover:bg-success/90" asChild>
            <Link href="/login">Đăng nhập</Link>
          </Button>

          <Button
            asChild
            className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Link href="/">Về trang chủ</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
