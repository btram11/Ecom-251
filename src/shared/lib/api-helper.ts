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

export function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/tp\.?|thành phố|tỉnh|quận|huyện|phường|xã/gi, "")
    .trim();
}

export function findCodeByName(
  options: { value: string; label: string }[] | undefined,
  name?: string
): string {
  if (!options || !name) return "";

  const n = normalize(name);

  return (
    options.find((o) => normalize(o.label) === n)?.value ??
    options.find((o) => normalize(o.label).includes(n))?.value ??
    ""
  );
}


