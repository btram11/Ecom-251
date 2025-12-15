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

  const address = {
    province: watch("province"),
    district: watch("district"),
    ward: watch("ward"),
  };

  const setAddress = React.useCallback(
    (patch: Partial<CheckoutAddressFormValues>) => {
      (Object.keys(patch) as (keyof CheckoutAddressFormValues)[]).forEach(
        (k) => {
          const v = patch[k];
          if (typeof v === "string") {
            setValue(k, v, { shouldDirty: true, shouldValidate: true });
          }
        }
      );
    },
    [setValue]
  );

  const inputErrorClass = "border-destructive focus-visible:ring-destructive";

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldWrapper label="Họ tên người nhận" labelFor="fullName" required>
          <Input
            id="fullName"
            placeholder="Nguyễn Văn A"
            // value={address.fullName}
            // onChange={(e) => setAddress({ fullName: e.target.value })}
            autoComplete="name"
            className={errors.fullName ? inputErrorClass : undefined}
            required
            {...register("fullName")}
          />
        </FieldWrapper>
        <FieldWrapper label="Số điện thoại" labelFor="phone" required>
          <Input
            id="phone"
            placeholder="09xx xxx xxx"
            // value={address.phone}
            // onChange={(e) => setAddress({ phone: e.target.value })}
            autoComplete="tel"
            className={errors.phone ? inputErrorClass : undefined}
            required
            {...register("phone")}
          />
        </FieldWrapper>
      </div>

      <FieldWrapper
        label="Địa chỉ (số nhà, tên đường)"
        labelFor="addressLine1"
        required
      >
        <Input
          id="addressLine"
          // value={address.addressLine}
          // onChange={(e) => setAddress({ addressLine: e.target.value })}
          placeholder="Số nhà, đường, phường/xã..."
          autoComplete="address-line"
          className={errors.addressLine ? inputErrorClass : undefined}
          required
          {...register("addressLine")}
        />
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

      {/* 
        <FieldWrapper
          label="Mã bưu chính (nếu có)"
          labelFor="postalCode"
          className="sm:col-span-2"
        >
          <Input
            id="postalCode"
            placeholder="700000"
            value={postalCode}
            onChange={onPostalCodeChange}
            autoComplete="postal-code"
          />
        </FieldWrapper>
      </div>

      <div className="pt-2 flex items-center">
        <Checkbox
          id="saveInfo"
          checked={saveInfo}
          onCheckedChange={(checked) => onSaveInfoChange(!!checked)}
        />
        <Label
          htmlFor="saveInfo"
          className="ml-2 text-sm text-muted-foreground"
        >
          Lưu thông tin cho lần đặt hàng sau
        </Label>
      </div> */}
    </div>
  );
}
