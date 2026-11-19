import { Suspense } from "react";

import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";

import { getStore, getProducts } from "@/lib/api";

// Everything here depends on the visitor's hostname (tenant), so it is
// request-time data. With Cache Components that must sit inside <Suspense>;
// this replaces the old `export const dynamic = "force-dynamic"`.
export default function HomePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50 p-10">
          Loading store...
        </main>
      }
    >
      <Storefront />
    </Suspense>
  );
}

async function Storefront() {

  const [store, products] = await Promise.all([
    getStore(),
    getProducts(),
  ]);

  return (
    <main className="min-h-screen bg-gray-50">

      <Header
        shopName={store.name}
        brandColor={store.brand_color}
      />

      <section className="mx-auto max-w-6xl px-6 py-10">

        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Our Products
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              brandColor={store.brand_color}
            />
          ))}

        </div>

        {products.length === 0 && (
          <p>No products available.</p>
        )}

      </section>

    </main>
  );
}
