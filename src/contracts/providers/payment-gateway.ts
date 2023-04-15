export interface PaymentGateway {
  createTransaction(
    params: PaymentGateway.createTransaction['Params']
  ): Promise<boolean>;
}

export namespace PaymentGateway {
  export type createTransaction = {
    Params: {
      amount: number;
      card: {
        card_number: string;
        card_cvv: string;
        card_expiration_date: string;
        card_holder_name: string;
      };
      customer: {
        id: string;
        name: string;
        country: string;
        email: string;
        document: string;
        phone_number: string;
      };
      billing: {
        name: string;
        country: string;
        state: string;
        city: string;
        street: string;
        number: number;
        zipcode: string;
      };
      items: {
        id: string;
        title: string;
        unit_price: number;
        quantity: number;
      }[];
    };
  };
}
