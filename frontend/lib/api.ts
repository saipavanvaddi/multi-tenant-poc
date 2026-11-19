import { headers } from "next/headers";
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

// Fetch current shop details
export async function getStore(): Promise<Store> {
  const host = await getVisitorHost();

  const response = await fetch(
    `${API_URL}/api/v1/store/`,
    {
      headers: {
        "X-Forwarded-Host": host,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch shop details");
  }

  return response.json();
}

// Fetch current shop products
export async function getProducts(): Promise<Product[]> {
  const host = await getVisitorHost();

  const response = await fetch(
    `${API_URL}/api/v1/products/`,
    {
      headers: {
        "X-Forwarded-Host": host,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ProductsResponse = await response.json();

  return data.products;
}
