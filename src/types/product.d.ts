export type ProductId = number;

export default interface Product {
  product_id?: ProductId;
  product_name: string;
  product_description: string;
  seller_id?: string;
  product_price: number;
  product_count: number;
  create_date?: string;
  product_status?: 0 | 1 | 2;
}
