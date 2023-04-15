import { ProductModel } from '@/models';

export type CartModel = {
  user_id: string;
  products: ProductModel[];
  created_at: Date;
  updated_at: Date;
};
