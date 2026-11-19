
import Link from "next/link";

import type { Product } from "@/types";

interface Props {
  product: Product;
  brandColor: string;
}

export default function ProductCard({
  product,
  brandColor,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      <img
        src={product.image_url}
        alt={product.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">

        <h2 className="text-lg font-semibold text-gray-900">
          {product.name}
        </h2>

        <p className="mt-2 text-gray-700">
          ₹{product.price}
        </p>

        <p className="mt-2 text-sm">
          {product.in_stock ? "In Stock" : "Out of Stock"}
        </p>

        <Link
          href={`/products/${product.id}`}
          style={{ backgroundColor: brandColor }}
          className="mt-4 block rounded-lg px-4 py-2 text-center text-white"
        >
          View Product
        </Link>

      </div>
    </div>
  );
}
