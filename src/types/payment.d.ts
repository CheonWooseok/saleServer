export default interface Payment {
  order_id?: number;
  order_date?: string;
  buyer_id?: string;
  purchase_price: number;
  shipping_address: string;
  status?: any;
}
