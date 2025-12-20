"use client";

import { Button } from "@shared/ui/button";
import { Card } from "@shared/ui/card";
import {
  ChevronDown,
  ChevronRight,
  Package,
  BarChart3,
  ShoppingCart,
  Plus,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [productMenuOpen, setProductMenuOpen] = useState(false);

  return (
    <Card className={`w-64 h-300 p-4 ${className}`}>
      <nav className="space-y-2">
        <Link href="/seller">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <ShoppingCart className="h-4 w-4" />
            Quản lý đơn hàng
          </Button>
        </Link>

        <Link href="/seller/statistics">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <BarChart3 className="h-4 w-4" />
            Thống kê
          </Button>
        </Link>

        <div>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => setProductMenuOpen(!productMenuOpen)}
          >
            <Package className="h-4 w-4" />
            Quản lý sản phẩm
            {productMenuOpen ? (
              <ChevronDown className="h-4 w-4 ml-auto" />
            ) : (
              <ChevronRight className="h-4 w-4 ml-auto" />
            )}
          </Button>

          {productMenuOpen && (
            <div className="ml-6 mt-2 space-y-1">
              <Link href="/seller/products">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  Tất cả sản phẩm
                </Button>
              </Link>
              <Link href="/seller/add-product">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2"
                >
                  <Plus className="h-3 w-3" />
                  Thêm sản phẩm
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </Card>
  );
}
