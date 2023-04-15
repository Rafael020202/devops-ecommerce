export type CheckoutDTO = {
  products: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    qty: number;
  }[];
  user_id: string;
};
