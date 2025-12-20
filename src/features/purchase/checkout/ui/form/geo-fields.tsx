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
  geoCode: GeoCodeState; // codes
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

  return (
    <>
      <FieldWrapper label="Tỉnh/Thành phố" labelFor="province" required>
        <Combobox
          id="province"
          name="provinceCode"
          value={geoCode.provinceCode}
          options={provincesQ.data ?? []}
          placeholder={
            provincesQ.isLoading ? "Đang tải..." : "Chọn Tỉnh/Thành phố"
          }
          disabled={provincesQ.isLoading}
          invalid={!!errors?.province}
          onValueChange={(code) => {
            onPick(provincesQ.data, code, (name) =>
              setAddress({
                province: name,
                district: "",
                ward: "",
              })
            );

            setGeoCode({
              provinceCode: code,
              districtCode: "",
              wardCode: "",
            });
          }}
        />
      </FieldWrapper>

      <FieldWrapper label="Quận/Huyện" labelFor="district" required>
        <Combobox
          id="district"
          name="districtCode"
          value={geoCode.districtCode}
          options={districtsQ.data ?? []}
          placeholder={
            !geoCode.provinceCode
              ? "Chọn Tỉnh/TP trước"
              : districtsQ.isLoading
              ? "Đang tải..."
              : "Chọn Quận/Huyện"
          }
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

      <FieldWrapper label="Phường/Xã" labelFor="ward" required>
        <Combobox
          id="ward"
          name="wardCode"
          value={geoCode.wardCode}
          options={wardsQ.data ?? []}
          placeholder={
            !geoCode.districtCode
              ? "Chọn Quận/Huyện trước"
              : wardsQ.isLoading
              ? "Đang tải..."
              : "Chọn Phường/Xã"
          }
          disabled={!geoCode.districtCode || wardsQ.isLoading}
          invalid={!!errors?.ward}
          onValueChange={(code) => {
            onPick(wardsQ.data, code, (name) => setAddress({ ward: name }));
            setGeoCode((prev) => ({ ...prev, wardCode: code }));
          }}
        />
      </FieldWrapper>
    </>
  );
}
