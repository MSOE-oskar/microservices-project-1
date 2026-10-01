export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  usdPrice: number;
  categories: Category[];
}

export interface Cart {
  userId: number;
  products: Product[];
}
