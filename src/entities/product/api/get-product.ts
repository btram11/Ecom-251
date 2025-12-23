import { api } from "@shared/api";
import { apiUrl } from "@shared/lib/api-helper";
import { paths } from "@shared/config/paths";
import type { Product } from "../model/types";
import type { APIResponse } from "@shared/api/types";

export const getProductById = async (
  productId: number | string
): Promise<APIResponse<Product>> => {
  return api.get<Product>(
    apiUrl(paths.products.detail(productId))
  );
};


import type { Page } from "@shared/api/types";

export type GetProductsParams = {
  page?: number;
  size?: number;
  keyword?: string;
};

export const getProducts = async (
  params?: GetProductsParams
): Promise<APIResponse<Page<Product>>> => {
  const query = new URLSearchParams();

  if (params?.page !== undefined) query.set("page", String(params.page));
  if (params?.size !== undefined) query.set("size", String(params.size));
  if (params?.keyword) query.set("keyword", params.keyword);

  const qs = query.toString();
  const url = qs
    ? `${paths.products.list}?${qs}`
    : paths.products.list;

  return api.get<Page<Product>>(apiUrl(url));
};

