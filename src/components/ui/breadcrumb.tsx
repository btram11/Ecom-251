import Link from "next/link";
import { Fragment } from "react";
import { Home } from "lucide-react";

const segmentMap: Record<string, string> = {
  products: "Sản phẩm",
  fruits: "Trái cây",
  vegetables: "Rau củ",
  apple: "Táo",
  seller: "Người bán",
};

export function Breadcrumb({ path }: { path: string }) {
  const segments = path.split("/").filter(Boolean);

  const items = [
    <Fragment key="home">
      <Link
        href="/"
        className="hover:text-success transition-colors inline-flex items-center gap-1"
      >
        <Home className="h-4 w-4 shrink-0" />
        <span>Trang chủ</span>
      </Link>
      {segments.length > 0 && (
        <span className="text-muted-foreground mx-2 shrink-0">/</span>
      )}
    </Fragment>,
    ...segments.map((seg, idx) => {
      const href = "/" + segments.slice(0, idx + 1).join("/");
      const label = segmentMap[seg] ?? decodeURIComponent(seg);
      const isLast = idx === segments.length - 1;

      return (
        <Fragment key={href}>
          {!isLast ? (
            <Link
              href={href}
              className="hover:text-success transition-colors whitespace-nowrap"
            >
              {label}
            </Link>
          ) : (
            <span className="text-muted-foreground whitespace-nowrap">
              {label}
            </span>
          )}
          {!isLast && <span>/</span>}
        </Fragment>
      );
    }),
  ];

  return (
    <nav aria-label="Breadcrumb" className="text-sm mb-6">
      <div className="flex items-center flex-wrap gap-y-1">{items}</div>
    </nav>
  );
}
