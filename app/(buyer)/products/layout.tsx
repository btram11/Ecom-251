import { CartSidebar } from '@features/purchase/cart';
import { isValid } from '@shared/lib/auth/check-auth';

export default async function ProductsLayout({ children }: { children: React.ReactNode }) {
  const { authenticated } = await isValid();
  return (
    <div className="relative">
      {children}
      {authenticated && (
        <section className="fixed right-0 top-3">
          <CartSidebar />
        </section>
      )}
    </div>
  );
}
