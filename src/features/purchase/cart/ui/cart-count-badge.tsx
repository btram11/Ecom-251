import { Badge } from '@shared/ui/badge';

export function CartCountBadge() {
  return (
    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-success">
      2
    </Badge>
  );
}
