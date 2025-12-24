import { paths } from "@shared/config/paths";
import { apiUrl } from "@shared/lib/api-helper";
import { api } from "@shared/api";
import type { Category } from "../model/types";
import type { APIResponse } from "@shared/api/types";

export const getCategories = async (): Promise<APIResponse<Category[]>> => {
  return await api.get<Category[]>(
    apiUrl(paths.categories.list)
  );
};
