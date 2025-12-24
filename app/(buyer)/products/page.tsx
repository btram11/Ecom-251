import { ProductsPage } from "@pages/products-page";
import type { ProductListingQuery } from "@entities/product";

type PageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function Page({ searchParams: params }: PageProps) {
  const searchParams = await params
  
  const query: ProductListingQuery = {
    page: Number(searchParams.page ?? 0),
    pageSize: Number(searchParams.pageSize ?? 12),
    sortBy: (searchParams.sortBy as string) ?? "id",
    desc: searchParams.desc === "true",

    keyword: searchParams.keyword as string | undefined,
    categoryName: searchParams.categoryName as string | undefined,
    province: searchParams.province as string | undefined,

    minPrice: searchParams.minPrice
      ? Number(searchParams.minPrice)
      : undefined,
    maxPrice: searchParams.maxPrice
      ? Number(searchParams.maxPrice)
      : undefined,
  };
  
  return (
    <ProductsPage
      query={query}
    />
  );
}
