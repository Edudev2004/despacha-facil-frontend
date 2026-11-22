export interface PublicCatalogProduct {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  categoryName?: string;
  variants: PublicCatalogVariant[];
}

export interface PublicCatalogVariant {
  id: string;
  sku: string;
  variantName: string;
  price: number;
  stock: number;
}

export interface CartItem {
  variantId: string;
  productId: string;
  productName: string;
  variantName: string;
  price: number;
  quantity: number;
  maxStock: number;
}
