import { fetchApi } from "@shared/api";

export const getProduct = async (productId: string) => {
  return fetchApi(`/api/products/${productId}`);
};
