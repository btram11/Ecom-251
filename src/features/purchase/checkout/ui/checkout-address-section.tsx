"use client";

import * as React from "react";
import { Input } from "@shared/ui/input";
import { FieldWrapper } from "@shared/ui/form/field-wrapper";
import { GeoFields } from "./form/geo-fields";
import { CheckoutAddressFormValues } from "../model/checkout-address-schema";
import { useFormContext } from "react-hook-form";

export function CheckoutAddressSection() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CheckoutAddressFormValues>();

  const [geoCode, setGeoCode] = React.useState({
    provinceCode: "",
    districtCode: "",
    wardCode: "",
  });

  // ===== FETCH USER INFO =====
  React.useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await fetch("http://localhost:8003/api/user/my-info", {
        credentials: "include",
      });
      const json = await res.json();

      if (!json?.success || !json?.data) return;

      const u = json.data;

      setValue("fullName", u.name ?? "");
      setValue("phone", u.tel ?? "");
      setValue("addressLine", u.address ?? "");
      setValue("province", u.province ?? "");
      setValue("district", u.district ?? "");
      setValue("ward", u.ward ?? "");
    };

    fetchUserInfo();
  }, [setValue]);

  const address = {
    province: watch("province"),
    district: watch("district"),
    ward: watch("ward"),
  };

  const setAddress = React.useCallback(
    (patch: Partial<CheckoutAddressFormValues>) => {
      Object.entries(patch).forEach(([k, v]) => {
        if (typeof v === "string") {
          setValue(k as any, v, { shouldDirty: true });
        }
      });
    },
    [setValue]
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldWrapper label="Họ tên" required>
          <Input {...register("fullName")} />
        </FieldWrapper>
        <FieldWrapper label="Số điện thoại" required>
          <Input {...register("phone")} />
        </FieldWrapper>
      </div>

      <FieldWrapper label="Địa chỉ" required>
        <Input {...register("addressLine")} />
      </FieldWrapper>

      <div className="grid gap-4 sm:grid-cols-3">
        <GeoFields
          address={address}
          setAddress={setAddress}
          geoCode={geoCode}
          setGeoCode={setGeoCode}
          errors={{
            province: errors.province,
            district: errors.district,
            ward: errors.ward,
          }}
        />
      </div>
    </div>
  );
}
