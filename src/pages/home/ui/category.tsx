"use client";
import Image from "next/image";
import { Card } from "@shared/ui/card";
import { useEffect, useState } from "react";
import { environment } from "../../../../environment";

type Category = {
  id: number;
  name: string;
  imageUrl?: string;
  description?: string;
};

export const CategoryGrid = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${environment.SERVICE_URL}/api/categories`,
          { signal: ctrl.signal }
        );

        if (!res.ok) {
          throw new Error(`Lỗi: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        setCategories(Array.isArray(data) ? data : data?.data ?? []);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message || "Không thể tải danh mục");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    return () => ctrl.abort();
  }, []);

  const placeholders = new Array(8).fill(0);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Danh mục sản phẩm</h2>

        {error && (
          <div className="text-red-500 text-sm mb-4">
            Đã có lỗi: {error}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {loading
            ? placeholders.map((_, i) => (
                <Card key={i} className="p-6 animate-pulse">
                  <div className="text-center">
                    <div className="h-12 w-12 mx-auto bg-gray-200 rounded mb-3" />
                    <div className="h-4 bg-gray-200 rounded mx-auto w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded mx-auto w-1/2" />
                  </div>
                </Card>
              ))
            : categories.map((category) => {
                const imageSrc =
                  category.imageUrl && category.imageUrl.trim() !== ""
                    ? category.imageUrl
                    : "/placeholder.png";

                const isLocalhost =
                  imageSrc.startsWith("http://localhost") ||
                  imageSrc.startsWith("http://127.0.0.1");

                return (
                  <Card
                    key={category.id}
                    className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-success group"
                  >
                    <div className="text-center">
                      <div className="mb-3 flex justify-center">
                        <Image
                          src={imageSrc}
                          alt={category.name}
                          width={48}
                          height={48}
                          unoptimized={isLocalhost}
                        />
                      </div>

                      <h3 className="font-semibold text-sm mb-1">
                        {category.name}
                      </h3>

                      <p className="text-xs text-muted-foreground">
                        {category.description ?? ""}
                      </p>
                    </div>
                  </Card>
                );
              })}
        </div>
      </div>
    </section>
  );
};
