export type ShippingOption = {
  id: string;
  label: string;
  description?: string;
  fee: number;
};

export type PaymentMethod = "COD" | "MOMO";

export type ShippingAddress = {
  fullName: string;
  phone: string;
  addressLine: string;
  ward: string;
  province: string;
  district: string;
  postalCode: string;
};
