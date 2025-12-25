"use client";

import { Button } from "@shared/ui/button";
import { Card } from "@shared/ui/card";
import { BarChart3, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  className?: string;
}

export function AdminSidebar({ className }: SidebarProps) {
  return (
    <Card className={`w-64 min-h-fit p-4 ${className}`}>
      <nav className="space-y-2">
        <Link href="/admin">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <BarChart3 className="h-4 w-4" />
           Thống kê
          </Button>
        </Link>

         <Link href="/admin">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <ShoppingCart className="h-4 w-4" />
            Quản lý đơn hàng
          </Button>
        </Link>
      </nav>
    </Card>
  );
}
