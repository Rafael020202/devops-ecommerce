import {
  Service,
  CheckoutDTO,
  CartRepository,
  UserRepository,
  PurchaseRepository,
  HttpResponse,
  PaymentGateway
} from '@/contracts';
import { badRequest, success, uniqueid } from '@/helpers';

export class CheckoutService implements Service {
  constructor(
    private paymentGateway: PaymentGateway,
    private cartRepository: CartRepository,
    private userRepository: UserRepository,
    private purchaseRepository: PurchaseRepository
  ) {}

  async handle(request: CheckoutService.Request): Promise<HttpResponse> {
    const { products, user_id } = request;

    if (!products?.length) {
      return badRequest('carrinho vazio.');
    }

    const [userData] = await this.userRepository.find({ id: user_id });

    if (!userData.address) {
      return badRequest('endereço é obrigatório.');
    }

    if (!userData.cards?.length) {
      return badRequest('nenhum cartão de crédito encontrado.');
    }

    const defaultCreditCard = userData.cards.find(
      (credit_card) => credit_card.default === true
    );

    if (!defaultCreditCard) {
      return badRequest('nenhum cartão de crédito default encontrado.');
    }

    const items = [];
    let amount = 0;

    products.forEach((p) => {
      items.push({
        id: p.id,
        quantity: p.qty,
        title: p.name,
        unit_price: p.price
      });

      amount += p.qty * p.price;
    });

    const transaction = await this.paymentGateway.createTransaction({
      amount,
      billing: {
        city: userData.address.city,
        country: userData.address.country,
        name: userData.name,
        number: userData.address.number,
        state: userData.address.city,
        street: userData.address.street,
        zipcode: userData.address.zipcode
      },
      card: {
        card_cvv: defaultCreditCard.card_cvv,
        card_expiration_date: defaultCreditCard.card_expiration_date,
        card_holder_name: defaultCreditCard.card_holder_name,
        card_number: defaultCreditCard.card_number
      },
      customer: {
        id: userData.id,
        country: userData.address.country,
        document: userData.document,
        email: userData.email,
        name: userData.name,
        phone_number: userData.phone_number
      },
      items: products.map((p) => ({
        id: p.id,
        quantity: p.qty,
        title: p.name,
        unit_price: p.price
      }))
    });

    if (!transaction) {
      return badRequest('um problema ocorreu ao tentar finalizar a compra.');
    }

    const purchase = {
      id: uniqueid(),
      user_id,
      amount,
      external_id: transaction.id,
      items,
      status: transaction.status,
      created_at: new Date(),
      updated_at: new Date()
    };

    await this.purchaseRepository.create(purchase);

    await this.cartRepository.update({
      user_id,
      newData: { products: [] }
    });

    delete purchase.created_at;
    delete purchase.updated_at;
    delete purchase.external_id;
    delete purchase.user_id;
    delete (<any>purchase)._id;

    return success(purchase);
  }
}

export namespace CheckoutService {
  export type Request = CheckoutDTO;
}
