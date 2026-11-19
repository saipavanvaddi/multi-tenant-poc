
import { Suspense } from "react";
import Link from "next/link";

import Header from "@/components/Header";

import { getStore, getProducts } from "@/lib/api";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

// `params` and the tenant lookup are request-time data, so they are read
// inside <Suspense> (required when Cache Components is enabled).
export default function ProductPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50 p-10">
          Loading product...
        </main>
      }
    >
      <ProductDetails params={params} />
    </Suspense>
  );
}

async function ProductDetails({ params }: Props) {

  const { id } = await params;

  const [store, products] = await Promise.all([
    getStore(),
    getProducts(),
  ]);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return <div className="p-10">Product not found.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">

      <Header
        shopName={store.name}
        brandColor={store.brand_color}
      />

      <section className="mx-auto max-w-4xl px-6 py-10">

        <Link href="/" className="text-blue-600">
          ← Back to products
        </Link>

        <div className="mt-6 grid gap-8 rounded-xl bg-white p-6 shadow-sm md:grid-cols-2">

          <img
            src={product.image_url}
            alt={product.name}
            className="w-full rounded-lg object-cover"
          />

          <div>

            <h2 className="text-3xl font-bold">
              {product.name}
            </h2>

            <p className="mt-4 text-2xl font-semibold">
              ₹{product.price}
            </p>

            <p className="mt-4">
              {product.in_stock ? "Available" : "Not available"}
            </p>

            <p className="mt-6 text-sm text-gray-500">
              Store: {store.name}
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}
