"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { Button } from "@shared/ui/button";
import { getMe, type MeResponse } from "@/shared/api/get-me";

export const SellerHeader = () => {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then((res) => {
        console.log("[SellerHeader] me =", res);
        setUser(res);
      })
      .catch((err) => {
        console.log("[SellerHeader] me error =", err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <header className="border-b bg-primary-background sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="font-['Brush_Script_MT',cursive] text-2xl font-bold">
              Farm Fresh – Seller
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {!loading && (
              user ? (
                // ===== ĐÃ ĐĂNG NHẬP =====
                <Link href="/seller/profile" title={user.name}>
                  <img
                    src={user.picture || "/avatar-default.png"}
                    alt="avatar"
                    className="h-9 w-9 rounded-full border object-cover"
                  />
                </Link>
              ) : (
                // ===== CHƯA ĐĂNG NHẬP =====
                <Button asChild variant="ghost">
                  <Link href="/login">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              )
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
