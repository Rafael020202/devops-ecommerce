export type UserModel = {
  id: string;
  name: string;
  email: string;
  password: string;
  cards?: {
    card_cvv: string;
    card_expiration_date: string;
    card_holder_name: string;
    card_number: string;
  }[];
  address?: {
    city: string;
    country: string;
    number: number;
    state: string;
    street: string;
    zipcode: string;
  };
  created_at: Date;
  updated_at: Date;
};
