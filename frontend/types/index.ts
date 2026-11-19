
export interface Store {
  name: string;
  brand_color: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  image_url: string;
  in_stock: boolean;
}

export interface ProductsResponse {
  products: Product[];
}
