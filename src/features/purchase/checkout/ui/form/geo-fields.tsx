"use client";

import * as React from "react";
import { Combobox, FieldWrapper, type ComboOption } from "@shared/ui/form";
import {
  useProvincesOptionsQuery,
  useDistrictOptionsQuery,
  useWardOptionsQuery,
} from "@/entities/geo/model/queries";
import type { ShippingAddress } from "../../model/types";
import { FieldError } from "react-hook-form";
import { findCodeByName } from "@shared/lib/api-helper";

type GeoCodeState = {
  provinceCode: string;
  districtCode: string;
  wardCode: string;
};

export function GeoFields({
  address,
  setAddress,
  geoCode,
  setGeoCode,
  errors,
}: {
  address: Pick<ShippingAddress, "province" | "district" | "ward">;
  setAddress: (patch: Partial<ShippingAddress>) => void;
  geoCode: GeoCodeState;
  setGeoCode: React.Dispatch<React.SetStateAction<GeoCodeState>>;
  errors?: {
    province?: FieldError | string;
    district?: FieldError | string;
    ward?: FieldError | string;
  };
}) {
  const provincesQ = useProvincesOptionsQuery();
  const districtsQ = useDistrictOptionsQuery(geoCode.provinceCode);
  const wardsQ = useWardOptionsQuery(geoCode.districtCode);

  const onPick = (
    options: ComboOption[] | undefined,
    value: string,
    onName: (name: string) => void
  ) => {
    const name = options?.find((o) => o.value === value)?.label ?? "";
    onName(name);
  };

  // ===== AUTO MAP FROM DB =====

  React.useEffect(() => {
    if (!address.province || !provincesQ.data?.length) return;

    const code = findCodeByName(provincesQ.data, address.province);

    if (code && code !== geoCode.provinceCode) {
      setGeoCode({
        provinceCode: code,
        districtCode: "",
        wardCode: "",
      });
    }
  }, [address.province, provincesQ.data]);

  React.useEffect(() => {
    if (!address.district || !districtsQ.data?.length) return;

    const code = findCodeByName(districtsQ.data, address.district);

    if (code && code !== geoCode.districtCode) {
      setGeoCode((prev) => ({
        ...prev,
        districtCode: code,
        wardCode: "",
      }));
    }
  }, [address.district, districtsQ.data]);

  React.useEffect(() => {
    if (!address.ward || !wardsQ.data?.length) return;

    const code = findCodeByName(wardsQ.data, address.ward);

    if (code && code !== geoCode.wardCode) {
      setGeoCode((prev) => ({
        ...prev,
        wardCode: code,
      }));
    }
  }, [address.ward, wardsQ.data]);

  // ===== RENDER =====

  return (
    <>
      <FieldWrapper label="Tỉnh/Thành phố" required>
        <Combobox
          value={geoCode.provinceCode}
          options={provincesQ.data ?? []}
          placeholder="Chọn Tỉnh/Thành phố"
          disabled={provincesQ.isLoading}
          invalid={!!errors?.province}
          onValueChange={(code) => {
            onPick(provincesQ.data, code, (name) =>
              setAddress({ province: name, district: "", ward: "" })
            );

            setGeoCode({
              provinceCode: code,
              districtCode: "",
              wardCode: "",
            });
          }}
        />
      </FieldWrapper>

      <FieldWrapper label="Quận/Huyện" required>
        <Combobox
          value={geoCode.districtCode}
          options={districtsQ.data ?? []}
          placeholder="Chọn Quận/Huyện"
          disabled={!geoCode.provinceCode || districtsQ.isLoading}
          invalid={!!errors?.district}
          onValueChange={(code) => {
            onPick(districtsQ.data, code, (name) =>
              setAddress({ district: name, ward: "" })
            );

            setGeoCode((prev) => ({
              ...prev,
              districtCode: code,
              wardCode: "",
            }));
          }}
        />
      </FieldWrapper>

      <FieldWrapper label="Phường/Xã" required>
        <Combobox
          value={geoCode.wardCode}
          options={wardsQ.data ?? []}
          placeholder="Chọn Phường/Xã"
          disabled={!geoCode.districtCode || wardsQ.isLoading}
          invalid={!!errors?.ward}
          onValueChange={(code) => {
            onPick(wardsQ.data, code, (name) =>
              setAddress({ ward: name })
            );
            setGeoCode((prev) => ({ ...prev, wardCode: code }));
          }}
        />
      </FieldWrapper>
    </>
  );
}
