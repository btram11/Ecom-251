import { paths } from "@shared/config/paths";

export const apiUrl = (path: string) => `${paths.baseUrl}${path}`;

export const buildQueryString = (params?: Record<string, any>) => {
  if (!params) return "";

  const qs = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      qs.set(key, String(value));
    }
  });

  return qs.toString();
};

