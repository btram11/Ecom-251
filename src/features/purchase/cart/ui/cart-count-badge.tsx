'use client';

import { Badge } from '@shared/ui/badge';
import { useUserCartQuery } from '../model/use-user-cart';

export function CartCountBadge() {
  const { data } = useUserCartQuery({ refetchInterval: 2500 });

  const count = data?.reduce((sum, item: any) => sum + (item.quantity ?? 1), 0) ?? 0;

  if (count === 0) return null;

  return (
    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-600 hover:bg-red-700">
      {count}
    </Badge>
  );
}
