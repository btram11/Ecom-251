export function ProductDescription({ description }: { description: string }) {
  return (
    <div className="mt-4">
      <h2 className="text-lg mb-1 font-semibold">Mô tả sản phẩm</h2>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
