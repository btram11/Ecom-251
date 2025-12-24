function formatCurrency(v: number) {
  if (typeof v !== 'number') return '-- ';
  return v.toLocaleString('vi-VN');
}

function formatVnd(v: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(v);
}

export { formatCurrency, formatVnd };
