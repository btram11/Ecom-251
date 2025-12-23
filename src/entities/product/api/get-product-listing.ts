import { api } from "@shared/api";
import { apiUrl, buildQueryString } from "@shared/lib/api-helper";
import { paths } from "@shared/config/paths";
import type { Page, APIResponse } from "@shared/api/types";
import type { ProductListing } from "../model/types";

export type ProductListingQuery = {
  page?: number;          // page number (0-based)
  pageSize?: number;      // number of items per page

  sortBy?: string;        // field name (vd: "id", "price", "createdAt")
  desc?: boolean;         // sort descending

  keyword?: string;       // search name + description
  minPrice?: number;
  maxPrice?: number;

  categoryName?: string;
  province?: string;
};



export const getProductListings = async (
  params?: ProductListingQuery
): Promise<APIResponse<Page<ProductListing>>> => {
  const query = buildQueryString({
    page: params?.page ?? 0,
    pageSize: params?.pageSize ?? 10,
    sortBy: params?.sortBy ?? "id",
    desc: params?.desc ?? false,

    keyword: params?.keyword,
    minPrice: params?.minPrice,
    maxPrice: params?.maxPrice,
    categoryName: params?.categoryName,
    province: params?.province,
  });

  const url = query
    ? `${paths.productListings.list}?${query}`
    : paths.productListings.list;

  return api.get<Page<ProductListing>>(apiUrl(url));
};
