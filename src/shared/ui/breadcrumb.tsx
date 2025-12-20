import Link from "next/link";
import { Fragment, ReactNode } from "react";
import { Home } from "lucide-react";

const segmentMap: Record<string, string> = {
  products: "Sản phẩm",
  fruits: "Trái cây",
  vegetables: "Rau củ",
  apple: "Táo",
  seller: "Người bán",
};

type BreadcrumbProps = {
  path: string;
  labels?: Record<string, ReactNode>;
};

export function Breadcrumb({ path, labels = {} }: BreadcrumbProps) {
  const cleanPath = path.split("?")[0].split("#")[0];

  const segments = cleanPath.split("/").filter(Boolean);

  const getLabel = (seg: string) => {
    if (seg in labels) return labels[seg];
    return segmentMap[seg] ?? decodeURIComponent(seg);
  };

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
      const label = getLabel(seg);
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
          {!isLast && <span className="mx-2">/</span>}
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
