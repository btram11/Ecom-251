import { ProductDetailPage } from '@/pages/product-detail';

interface ProductDetailProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  return <ProductDetailPage id={(await params).id} />;
}
