export interface Product {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  categoryId?: string;
  isActive: boolean;
  createdAt: string;
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  variantName: string;
  price: number;
  costPrice?: number;
  stock: number;
  minStockAlert: number;
  isActive: boolean;
}
