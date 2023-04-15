import axios from 'axios';

import { PaymentGateway } from '@/contracts';
import env from '@/config/env';

const { pagarme } = env;

export const createTransactionRequest = (
  params: PaymentGateway.createTransaction['Params']
) => {
  const { amount, billing, card, customer, items } = params;
  const data = {
    api_key: pagarme.api_key,
    amount: amount * 1000,
    card_number: card.card_number,
    card_cvv: card.card_cvv,
    card_expiration_date: card.card_expiration_date,
    card_holder_name: card.card_holder_name,
    customer: {
      external_id: customer.id,
      name: customer.name,
      type: 'individual',
      country: customer.country,
      email: customer.email,
      documents: [
        {
          type: 'cpf',
          number: customer.document
        }
      ],
      phone_numbers: [customer.phone_number]
    },
    billing: {
      name: billing.name,
      address: {
        country: billing.country,
        state: billing.state,
        city: billing.city,
        street: billing.street,
        street_number: String(billing.number),
        zipcode: billing.zipcode
      }
    },
    items: items.map((item) => ({
      id: item.id,
      title: item.title,
      unit_price: item.unit_price,
      quantity: item.quantity,
      tangible: true
    }))
  };

  return axios
    .post(`${pagarme.host}/transactions`, data)
    .then((response) => response.data);
};
