export function CheckoutSteps({ step }: { step: 1 | 2 }) {
  const done1 = step === 2;

  return (
    <div className="flex items-center justify-end gap-3 text-xs">
      <div className="flex items-center gap-2">
        <span
          className={[
            "flex h-6 w-6 items-center justify-center rounded-full",
            done1
              ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
              : "bg-emerald-600 text-white",
          ].join(" ")}
        >
          1
        </span>
        <span
          className={
            done1 ? "text-emerald-700" : "font-semibold text-slate-700"
          }
        >
          Thông tin giao hàng
        </span>
      </div>

      <div className="h-px w-10 bg-slate-200" />

      <div className="flex items-center gap-2">
        <span
          className={[
            "flex h-6 w-6 items-center justify-center rounded-full",
            step === 2
              ? "bg-emerald-600 text-white"
              : "border border-slate-300 bg-white text-slate-500",
          ].join(" ")}
        >
          2
        </span>
        <span
          className={
            step === 2 ? "font-semibold text-emerald-700" : "text-slate-500"
          }
        >
          Phương thức thanh toán
        </span>
      </div>
    </div>
  );
}
