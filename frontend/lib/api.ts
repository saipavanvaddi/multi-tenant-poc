import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type {
    Store,
    Product,
    ProductsResponse
} from "@/types";

const API_URL = process.env.DJANGO_API_URL!;

// Get the visitor's original hostname
async function getVisitorHost() {
  const requestHeaders = await headers();

  return requestHeaders.get("host") || "ananya.localhost:3000";
}

// Call the Django API for the tenant that matches the visitor's hostname.
// Django answers 404 when no shop is registered for that hostname (for
// example plain localhost:3000), which we show as "Shop not found" instead
// of crashing the page.
async function fetchFromTenant(path: string, errorMessage: string) {
  const host = await getVisitorHost();

  const response = await fetch(
    `${API_URL}${path}`,
    {
      headers: {
        "X-Forwarded-Host": host,
      },
      cache: "no-store",
    }
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response.json();
}

// Fetch current shop details
export async function getStore(): Promise<Store> {
  return fetchFromTenant(
    "/api/v1/store/",
    "Failed to fetch shop details"
  );
}

// Fetch current shop products
export async function getProducts(): Promise<Product[]> {
  const data: ProductsResponse = await fetchFromTenant(
    "/api/v1/products/",
    "Failed to fetch products"
  );

  return data.products;
}
