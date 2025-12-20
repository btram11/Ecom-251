function formatCurrency(v: number) {
  return v.toLocaleString("vi-VN") + " đ";
}

function formatVnd(v: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(v);
}

export { formatCurrency, formatVnd };
