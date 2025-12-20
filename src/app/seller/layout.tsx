import { Footer } from "@components/layout/footer";
import { SellerHeader } from "./components/seller-header";
import { Sidebar } from "@components/ui/sidebar";
import { ArrowUp } from "lucide-react";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <SellerHeader />
      <main className="flex-1 flex">
        <Sidebar className="m-4" />
        <div className="flex-1 p-4">{children}</div>
      </main>
      <Footer />
      <a
        href="#"
        aria-label="Lên đầu trang"
        className="
              back-to-top
              fixed
              right-4 bottom-[calc(env(safe-area-inset-bottom)+16px)]
              h-11 w-11
              rounded-full
              bg-success text-primary-foreground
              shadow-lg ring-1 ring-primary/20
              grid place-items-center
              transition
              hover:bg-success/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-success
            "
        title="Lên đầu trang"
      >
        <ArrowUp className="h-5 w-5" />
      </a>
    </div>
  );
}