import { Service, AddToCartDTO, HttpResponse } from '@/contracts';
import { PaymentGateway } from '@/contracts';
import { created } from '@/helpers';

export class PurchaseOrderService implements Service {
  constructor(private paymentGateway: PaymentGateway) {}

  async handle(request: PurchaseOrderService.Request): Promise<HttpResponse> {
    logger.info(request);

    await this.paymentGateway.createTransaction({
      amount: 10,
      billing: {
        city: 'São Roque',
        country: 'Brazil',
        name: 'Rafael Luiz',
        number: 123,
        state: 'SP',
        street: 'Jardim Brasil',
        zipcode: '18133210'
      },
      card: {
        card_cvv: '060',
        card_expiration_date: '1022',
        card_holder_name: 'Rafael Luiz Pereira',
        card_number: '232322323'
      },
      customer: {
        id: 'fkfsdkoexxx',
        country: 'BR',
        document: '46479924894',
        email: 'rafael.pereira@gmail.com',
        name: 'Rafael luiz',
        phone_number: '11937774319'
      },
      items: [
        {
          id: 'xgWqwqVCwe3',
          quantity: 1,
          title: 'Chinelo',
          unit_price: 100
        }
      ]
    });

    return created();
  }
}

export namespace PurchaseOrderService {
  export type Request = AddToCartDTO;
}
