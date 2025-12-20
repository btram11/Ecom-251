import { useQuery } from "@tanstack/react-query";
import {
  getProvinces,
  getDistrictsByProvinceCode,
  getWardsByDistrictCode,
} from "../api/geo-api";
import {
  provincesToOptions,
  districtsToOptions,
  wardsToOptions,
} from "../lib/to-options";
import { ApiError } from "@entities/geo/api/_base"; // chỗ chị định nghĩa

const retryGeo = (failureCount: number, error: unknown) => {
  if (error instanceof ApiError) {
    if (error.status >= 400 && error.status < 500) return false;
  }
  return failureCount < 2;
};

export const geoQueryKeys = {
  all: ["geo"] as const,
  provinces: () => [...geoQueryKeys.all, "provinces"] as const,
  districts: (provinceCode: number) =>
    [...geoQueryKeys.all, "districts", provinceCode] as const,
  wards: (districtCode: number) =>
    [...geoQueryKeys.all, "wards", districtCode] as const,
};

const DAY = 24 * 60 * 60 * 1000;
const WEEK = 7 * DAY;

export function useProvincesOptionsQuery() {
  return useQuery({
    queryKey: geoQueryKeys.provinces(),
    queryFn: getProvinces,
    staleTime: DAY,
    gcTime: WEEK,
    select: provincesToOptions,
    retry: retryGeo,
  });
}

export function useDistrictOptionsQuery(provinceCode?: string) {
  const code = Number(provinceCode);
  const enabled = Number.isFinite(code) && code > 0;

  return useQuery({
    queryKey: geoQueryKeys.districts(enabled ? code : -1),
    queryFn: () => getDistrictsByProvinceCode(code),
    enabled,
    staleTime: DAY,
    gcTime: WEEK,
    select: districtsToOptions,
    retry: retryGeo,
  });
}

export function useWardOptionsQuery(districtCode?: string) {
  const code = Number(districtCode);
  const enabled = Number.isFinite(code) && code > 0;

  return useQuery({
    queryKey: geoQueryKeys.wards(enabled ? code : -1),
    queryFn: () => getWardsByDistrictCode(code),
    enabled,
    staleTime: DAY,
    gcTime: WEEK,
    select: wardsToOptions,
    retry: retryGeo,
  });
}
