export type AddUserCreditCardDTO = {
  user_id: string;
  card: {
    card_cvv: string;
    card_expiration_date: string;
    card_holder_name: string;
    card_number: string;
  };
};
