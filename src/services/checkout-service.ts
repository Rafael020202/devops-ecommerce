import {
  Service,
  CheckoutDTO,
  CartRepository,
  UserRepository,
  HttpResponse,
  PaymentGateway
} from '@/contracts';
import { badRequest, created } from '@/helpers';

export class CheckoutService implements Service {
  constructor(
    private paymentGateway: PaymentGateway,
    private cartRepository: CartRepository,
    private userRepository: UserRepository
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

    const transactionCredted = await this.paymentGateway.createTransaction({
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

    if (!transactionCredted) {
      return badRequest('um problema ocorreu ao tentar finalizar a compra.');
    }

    await this.cartRepository.update({
      user_id,
      newData: { products: [] }
    });

    return created();
  }
}

export namespace CheckoutService {
  export type Request = CheckoutDTO;
}
