import { Footer } from "@components/layout/footer";
import { Header } from "@components/layout/header";
import { ArrowUp } from "lucide-react";

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="flex-1">{children}</main>
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
