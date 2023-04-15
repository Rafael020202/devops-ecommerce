export type PurchaseModel = {
  id: string;
  user_id: string;
  amount: number;
  items: {
    id: string;
    quantity: number;
    title: string;
    unit_price: number;
  }[];
  status: string;
  external_id: any;
  created_at: Date;
  updated_at: Date;
};
