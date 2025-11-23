import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

type Product = {
  id: string;
  title: string;
  price: number;
  currency?: string;
  description?: string;
  image?: string;
  images?: string[];
  sku?: string;
  features?: string[];
  available?: boolean;
};

async function fetchProduct(id: string): Promise<Product | null> {
  // Try to fetch from a real API (configure NEXT_PUBLIC_API_URL), otherwise return a placeholder
  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  if (apiBase) {
    try {
      const res = await fetch(`${apiBase.replace(/\/$/, "")}/products/${id}`, {
        next: { revalidate: 60 },
      });
      if (!res.ok) return null;
      return (await res.json()) as Product;
    } catch {
      // fall through to placeholder
    }
  }

  // Placeholder product for local development
  return {
    id,
    title: `Sample Product ${id}`,
    price: 49.99,
    currency: "USD",
    description:
      "This is a placeholder description for the product. Replace fetchProduct implementation to load real data.",
    image: "/placeholder-product.png",
    images: ["/placeholder-product.png"],
    sku: "SAMPLE-001",
    features: ["Feature A", "Feature B", "Feature C"],
    available: true,
  };
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id);
  if (!product) {
    return { title: "Product not found" };
  }
  return {
    title: product.title,
    description: product.description?.slice(0, 160) ?? undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await fetchProduct(params.id);
  if (!product) notFound();

  return (
    <main style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <section style={{ minWidth: 320, flex: "0 0 380px" }}>
          <div
            style={{
              width: 380,
              height: 380,
              borderRadius: 8,
              overflow: "hidden",
              background: "#f4f4f4",
            }}
          >
            <Image
              src={product.image ?? "/placeholder-product.png"}
              alt={product.title}
              width={380}
              height={380}
              style={{ objectFit: "cover" }}
            />
          </div>

          {product.images && product.images.length > 1 && (
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              {product.images.map((src, i) => (
                <div
                  key={i}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 6,
                    overflow: "hidden",
                    background: "#fff",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                  }}
                >
                  <Image
                    src={src}
                    alt={`${product.title} ${i + 1}`}
                    width={64}
                    height={64}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        <section style={{ flex: 1 }}>
          <h1 style={{ margin: "0 0 8px 0" }}>{product.title}</h1>
          <div style={{ color: "#666", marginBottom: 12 }}>
            SKU: {product.sku ?? "—"}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <span style={{ fontSize: 24, fontWeight: 700 }}>
              {(product.currency ?? "USD") === "USD" ? "$" : ""}
              {product.price.toFixed(2)}
            </span>
            {!product.available && (
              <span style={{ color: "#c53030" }}>Out of stock</span>
            )}
          </div>

          <p style={{ lineHeight: 1.6, color: "#333" }}>
            {product.description}
          </p>

          <div style={{ marginTop: 18 }}>
            <form action="/api/cart" method="post">
              <input type="hidden" name="productId" value={product.id} />
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginRight: 12,
                }}
              >
                Qty
                <select name="quantity" defaultValue="1" style={{ padding: 6 }}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </label>

              <button
                type="submit"
                disabled={!product.available}
                style={{
                  padding: "10px 16px",
                  background: product.available ? "#111827" : "#9ca3af",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  cursor: product.available ? "pointer" : "not-allowed",
                }}
              >
                Add to cart
              </button>
            </form>
          </div>

          {product.features && product.features.length > 0 && (
            <ul style={{ marginTop: 20, paddingLeft: 18 }}>
              {product.features.map((f, i) => (
                <li key={i} style={{ marginBottom: 6 }}>
                  {f}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <hr
        style={{
          margin: "28px 0",
          border: "none",
          borderTop: "1px solid #eee",
        }}
      />

      <section>
        <h2 style={{ marginBottom: 8 }}>Details</h2>
        <p style={{ color: "#444", lineHeight: 1.6 }}>
          This page is a template for a product detail in the buyer area.
          Replace fetchProduct with a real data source, and wire the cart API
          (/api/cart) to persist items.
        </p>
      </section>
    </main>
  );
}
