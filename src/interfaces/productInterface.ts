export interface IProduct {
  id: number;
  title: string;
  description: string;
  barcode: string;
  grams: number;
  stock: number;
  sku: string;
  price: number;
  image?: string;
}
