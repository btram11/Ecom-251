import type { Province, District, Ward } from "../model/types";
import { fetchJson } from "@entities/geo/api/_base";

const GEO_API_URL = "https://provinces.open-api.vn/api";

export function getProvinces(): Promise<Province[]> {
  return fetchJson<Province[]>(`${GEO_API_URL}/p/`);
}

export function getDistrictsByProvinceCode(
  provinceCode: number
): Promise<District[]> {
  return fetchJson<{ districts?: District[] }>(
    `${GEO_API_URL}/p/${provinceCode}?depth=2`
  ).then((x) => x.districts ?? []);
}

export function getWardsByDistrictCode(districtCode: number): Promise<Ward[]> {
  return fetchJson<{ wards?: Ward[] }>(
    `${GEO_API_URL}/d/${districtCode}?depth=2`
  ).then((x) => x.wards ?? []);
}
