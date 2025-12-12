import { z } from "zod";

const phoneRegex = /^(0|\+84)[0-9]{8,10}$/;

export const checkoutAddressSchema = z.object({
  fullName: z.string().trim().min(2, "Vui lòng nhập họ tên"),
  phone: z
    .string()
    .trim()
    .min(9, "Số điện thoại không hợp lệ")
    .regex(phoneRegex, "Số điện thoại không hợp lệ"),
  addressLine: z
    .string()
    .trim()
    .min(5, "Vui lòng nhập địa chỉ (số nhà, tên đường)"),
  ward: z.string().trim().min(1, "Vui lòng chọn phường/xã"),
  district: z.string().trim().min(1, "Vui lòng chọn quận/huyện"),
  province: z.string().trim().min(1, "Vui lòng chọn tỉnh/thành phố"),
  postalCode: z.string().trim().optional().or(z.literal("")),
});

export type CheckoutAddressFormValues = z.infer<typeof checkoutAddressSchema>;
