// "use client";

// import * as React from "react";

// // import { Header } from "@/shared/components/layout/header";
// // import { Footer } from "@/shared/components/layout/footer";

// import { Button } from "@/shared/components/ui/button";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/shared/components/ui/card";
// import { Input } from "@/shared/components/ui/input";
// import { Label } from "@/shared/components/ui/form/label";
// import { Select } from "@/shared/components/ui/form/select";
// import { Checkbox } from "@/shared/components/ui/form/checkbox";

// // ====================
// // Types & mock data
// // ====================

// type CartItem = {
//   id: string;
//   name: string;
//   price: number; // in VND
//   quantity: number;
//   variant?: string;
// };

// const MOCK_CART_ITEMS: CartItem[] = [
//   {
//     id: "1",
//     name: "Basic Tee",
//     price: 290000,
//     quantity: 2,
//     variant: "Black / M",
//   },
//   {
//     id: "2",
//     name: "Oversized Hoodie",
//     price: 620000,
//     quantity: 1,
//     variant: "Grey / L",
//   },
// ];

// const formatCurrency = (amount: number) =>
//   new Intl.NumberFormat("vi-VN", {
//     style: "currency",
//     currency: "VND",
//     maximumFractionDigits: 0,
//   }).format(amount);

// type CheckoutFormState = {
//   email: string;
//   fullName: string;
//   phone: string;
//   addressLine1: string;
//   addressLine2: string;
//   city: string;
//   district: string;
//   country: string;
//   postalCode: string;
//   saveInfo: boolean;
//   paymentMethod: "cod" | "card";
// };

// const defaultFormState: CheckoutFormState = {
//   email: "",
//   fullName: "",
//   phone: "",
//   addressLine1: "",
//   addressLine2: "",
//   city: "",
//   district: "",
//   country: "VN",
//   postalCode: "",
//   saveInfo: true,
//   paymentMethod: "cod",
// };

// // ====================
// // Main component
// // ====================

// export function CheckoutPage() {
//   const [form, setForm] = React.useState<CheckoutFormState>(defaultFormState);
//   const [isSubmitting, setIsSubmitting] = React.useState(false);

//   const subtotal = React.useMemo(
//     () =>
//       MOCK_CART_ITEMS.reduce(
//         (sum, item) => sum + item.price * item.quantity,
//         0
//       ),
//     []
//   );

//   // v1: fixed shipping cho đơn giản
//   const shipping = subtotal > 1000000 ? 0 : 30000;
//   const discount = 0;
//   const total = subtotal + shipping - discount;

//   const handleChange =
//     (field: keyof CheckoutFormState) =>
//     (
//       value:
//         | string
//         | boolean
//         | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//     ) => {
//       if (typeof value !== "string" && typeof value !== "boolean") {
//         // event mode
//         const target = value.target;
//         if (
//           target instanceof HTMLInputElement ||
//           target instanceof HTMLSelectElement
//         ) {
//           const v =
//             target.type === "checkbox"
//               ? (target as HTMLInputElement).checked
//               : target.value;
//           setForm((prev) => ({ ...prev, [field]: v as any }));
//         }
//         return;
//       }

//       // direct value mode
//       setForm((prev) => ({ ...prev, [field]: value as any }));
//     };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     // tiny required fields check – không làm quá mức ở đây
//     if (!form.fullName || !form.phone || !form.addressLine1 || !form.city) {
//       alert("Vui lòng điền đầy đủ thông tin bắt buộc.");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       // TODO: call API / action thực sự
//       console.log("Submitting checkout payload:", {
//         form,
//         items: MOCK_CART_ITEMS,
//         subtotal,
//         shipping,
//         discount,
//         total,
//       });

//       // fake delay tí cho có cảm giác network
//       await new Promise((resolve) => setTimeout(resolve, 800));
//       alert("Đặt hàng thành công (mock) 🎉");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <main className="flex-1 border-t">
//       <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 lg:py-10">
//         {/* Title + meta info */}
//         <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
//           <div>
//             <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
//               Thanh toán
//             </h1>
//             <p className="mt-1 text-sm text-muted-foreground">
//               Hoàn tất thông tin để chốt đơn, đừng để giỏ hàng ngủ quên nha 😼
//             </p>
//           </div>
//           <p className="text-sm text-muted-foreground">
//             {MOCK_CART_ITEMS.length} sản phẩm • Tổng tạm tính{" "}
//             <span className="font-medium text-foreground">
//               {formatCurrency(subtotal)}
//             </span>
//           </p>
//         </div>

//         {/* 2-column layout */}
//         <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
//           {/* Left: Form */}
//           <section aria-label="Thông tin thanh toán">
//             <Card className="border border-border/60 shadow-sm">
//               <CardHeader>
//                 <CardTitle>Thông tin giao hàng</CardTitle>
//                 <CardDescription>
//                   Dùng thông tin thật một chút để shipper khỏi lạc đường nha.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <form
//                   className="flex flex-col gap-6"
//                   onSubmit={handleSubmit}
//                   noValidate
//                 >
//                   {/* Contact */}
//                   <div className="space-y-4">
//                     <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
//                       Liên hệ
//                     </h2>
//                     <div className="grid gap-4 sm:grid-cols-2">
//                       <div className="space-y-1.5">
//                         <Label htmlFor="email">Email (tuỳ chọn)</Label>
//                         <Input
//                           id="email"
//                           type="email"
//                           placeholder="meo@example.com"
//                           value={form.email}
//                           onChange={handleChange("email")}
//                           autoComplete="email"
//                         />
//                         <p className="text-xs text-muted-foreground">
//                           Dùng để gửi hoá đơn & cập nhật đơn hàng.
//                         </p>
//                       </div>
//                       <div className="space-y-1.5">
//                         <Label htmlFor="phone">Số điện thoại *</Label>
//                         <Input
//                           id="phone"
//                           type="tel"
//                           placeholder="09xx xxx xxx"
//                           value={form.phone}
//                           onChange={handleChange("phone")}
//                           autoComplete="tel"
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Shipping */}
//                   <div className="space-y-4">
//                     <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
//                       Địa chỉ nhận hàng
//                     </h2>

//                     <div className="space-y-1.5">
//                       <Label htmlFor="fullName">Họ tên người nhận *</Label>
//                       <Input
//                         id="fullName"
//                         placeholder="Nguyễn Minh Hằng"
//                         value={form.fullName}
//                         onChange={handleChange("fullName")}
//                         autoComplete="name"
//                         required
//                       />
//                     </div>

//                     <div className="space-y-1.5">
//                       <Label htmlFor="addressLine1">
//                         Địa chỉ (số nhà, tên đường) *
//                       </Label>
//                       <Input
//                         id="addressLine1"
//                         placeholder="123 Lê Lợi"
//                         value={form.addressLine1}
//                         onChange={handleChange("addressLine1")}
//                         autoComplete="address-line1"
//                         required
//                       />
//                     </div>

//                     <div className="space-y-1.5">
//                       <Label htmlFor="addressLine2">
//                         Toà nhà, căn hộ (tuỳ chọn)
//                       </Label>
//                       <Input
//                         id="addressLine2"
//                         placeholder="Chung cư ABC, tầng 10"
//                         value={form.addressLine2}
//                         onChange={handleChange("addressLine2")}
//                         autoComplete="address-line2"
//                       />
//                     </div>

//                     <div className="grid gap-4 sm:grid-cols-2">
//                       <div className="space-y-1.5">
//                         <Label htmlFor="city">Tỉnh / Thành phố *</Label>
//                         <Input
//                           id="city"
//                           placeholder="TP. Hồ Chí Minh"
//                           value={form.city}
//                           onChange={handleChange("city")}
//                           autoComplete="address-level1"
//                           required
//                         />
//                       </div>
//                       <div className="space-y-1.5">
//                         <Label htmlFor="district">Quận / Huyện *</Label>
//                         <Input
//                           id="district"
//                           placeholder="Quận 1"
//                           value={form.district}
//                           onChange={handleChange("district")}
//                           autoComplete="address-level2"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="grid gap-4 sm:grid-cols-3">
//                       <div className="space-y-1.5">
//                         <Label htmlFor="country">Quốc gia</Label>
//                         <Select
//                           id="country"
//                           value={form.country}
//                           onChange={handleChange("country")}
//                         >
//                           <option value="VN">Việt Nam</option>
//                           <option value="US">United States</option>
//                           <option value="EU">European Union</option>
//                         </Select>
//                       </div>
//                       <div className="space-y-1.5 sm:col-span-2">
//                         <Label htmlFor="postalCode">
//                           Mã bưu chính (nếu có)
//                         </Label>
//                         <Input
//                           id="postalCode"
//                           placeholder="700000"
//                           value={form.postalCode}
//                           onChange={handleChange("postalCode")}
//                           autoComplete="postal-code"
//                         />
//                       </div>
//                     </div>

//                     <div className="pt-2">
//                       <Checkbox
//                         id="saveInfo"
//                         checked={form.saveInfo}
//                         onChange={handleChange("saveInfo")}
//                       />
//                       <Label
//                         htmlFor="saveInfo"
//                         className="ml-2 text-sm text-muted-foreground"
//                       >
//                         Lưu thông tin cho lần đặt hàng sau
//                       </Label>
//                     </div>
//                   </div>

//                   {/* Payment */}
//                   <div className="space-y-4">
//                     <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
//                       Phương thức thanh toán
//                     </h2>

//                     <div className="grid gap-3 sm:grid-cols-2">
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setForm((prev) => ({
//                             ...prev,
//                             paymentMethod: "cod",
//                           }))
//                         }
//                         className={[
//                           "rounded-md border px-4 py-3 text-left text-sm transition-all",
//                           form.paymentMethod === "cod"
//                             ? "border-primary bg-primary/5"
//                             : "border-border hover:border-primary/60",
//                         ].join(" ")}
//                       >
//                         <div className="flex items-center justify-between">
//                           <span className="font-medium">
//                             Thanh toán khi nhận hàng (COD)
//                           </span>
//                           {form.paymentMethod === "cod" && (
//                             <span className="text-xs text-primary">
//                               Đã chọn
//                             </span>
//                           )}
//                         </div>
//                         <p className="mt-1 text-xs text-muted-foreground">
//                           Phù hợp khi bạn chưa tin shop lắm nhưng vẫn muốn ủng
//                           hộ 😼
//                         </p>
//                       </button>

//                       <button
//                         type="button"
//                         onClick={() =>
//                           setForm((prev) => ({
//                             ...prev,
//                             paymentMethod: "card",
//                           }))
//                         }
//                         className={[
//                           "rounded-md border px-4 py-3 text-left text-sm transition-all",
//                           form.paymentMethod === "card"
//                             ? "border-primary bg-primary/5"
//                             : "border-border hover:border-primary/60",
//                         ].join(" ")}
//                       >
//                         <div className="flex items-center justify-between">
//                           <span className="font-medium">Thẻ / Ví điện tử</span>
//                           {form.paymentMethod === "card" && (
//                             <span className="text-xs text-primary">
//                               Đã chọn
//                             </span>
//                           )}
//                         </div>
//                         <p className="mt-1 text-xs text-muted-foreground">
//                           Thanh toán online nhanh – tiện – không sợ hết tiền
//                           mặt.
//                         </p>
//                       </button>
//                     </div>
//                     {/* v1: chưa handle field card cụ thể, tuỳ backend */}
//                   </div>

//                   <CardFooter className="mt-2 flex flex-col gap-2 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
//                     <p className="text-xs text-muted-foreground">
//                       Bằng việc đặt hàng, bạn đồng ý với{" "}
//                       <span className="underline">Điều khoản sử dụng</span> &
//                       <span className="underline"> Chính sách đổi trả</span>.
//                     </p>
//                     <Button
//                       type="submit"
//                       size="lg"
//                       className="w-full sm:w-auto"
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? "Đang xử lý..." : "Đặt hàng ngay"}
//                     </Button>
//                   </CardFooter>
//                 </form>
//               </CardContent>
//             </Card>
//           </section>

//           {/* Right: Order summary */}
//           <aside aria-label="Tóm tắt đơn hàng" className="lg:pl-2">
//             <Card className="border border-border/60 bg-muted/10 shadow-sm">
//               <CardHeader>
//                 <CardTitle>Đơn hàng của bạn</CardTitle>
//                 <CardDescription>
//                   Kiểm tra lại lần nữa cho chắc rồi hãy “all in” nha.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {/* Items */}
//                 <div className="space-y-3">
//                   {MOCK_CART_ITEMS.map((item) => (
//                     <div
//                       key={item.id}
//                       className="flex items-start justify-between gap-3 rounded-md border border-border/60 bg-background px-3 py-2"
//                     >
//                       <div className="flex flex-1 flex-col">
//                         <div className="flex items-center justify-between gap-2">
//                           <p className="text-sm font-medium leading-tight">
//                             {item.name}
//                           </p>
//                           <span className="text-xs text-muted-foreground">
//                             x{item.quantity}
//                           </span>
//                         </div>
//                         {item.variant && (
//                           <p className="mt-0.5 text-xs text-muted-foreground">
//                             {item.variant}
//                           </p>
//                         )}
//                       </div>
//                       <span className="text-sm font-medium">
//                         {formatCurrency(item.price * item.quantity)}
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Totals */}
//                 <div className="space-y-2 border-t pt-3 text-sm">
//                   <div className="flex items-center justify-between">
//                     <span className="text-muted-foreground">Tạm tính</span>
//                     <span>{formatCurrency(subtotal)}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-muted-foreground">
//                       Phí vận chuyển
//                     </span>
//                     <span>
//                       {shipping === 0 ? "Miễn phí" : formatCurrency(shipping)}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-muted-foreground">Giảm giá</span>
//                     <span>
//                       {discount === 0 ? "-" : `- ${formatCurrency(discount)}`}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between border-t pt-3 text-base font-semibold">
//                   <span>Tổng cộng</span>
//                   <span>{formatCurrency(total)}</span>
//                 </div>

//                 <p className="text-xs text-muted-foreground">
//                   Đã bao gồm VAT (nếu áp dụng). Phí ship có thể thay đổi theo
//                   khu vực, nhưng tạm tính như trên để mình đỡ sốc.
//                 </p>
//               </CardContent>
//             </Card>
//           </aside>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default CheckoutPage;

import { CheckoutPage } from "@/pages/checkout";

export default function Page() {
  return <CheckoutPage />;
}
