import {
  Service,
  AddUserCreditCardDTO,
  HttpResponse,
  UserRepository
} from '@/contracts';
import { accepted, conflict, forbidden, checkMissingParams } from '@/helpers';

export class AddUserCreditCard implements Service {
  constructor(private userRepository: UserRepository) {}

  async handle(request: AddUserCreditCard.Request): Promise<HttpResponse> {
    const errors = checkMissingParams(request, [
      'card.card_cvv',
      'card.card_expiration_date',
      'card.card_holder_name',
      'card.card_number'
    ]);

    if (errors.length) {
      return conflict(errors);
    }

    const { user_id, card } = request;
    const expirationDate = new Date(card.card_expiration_date);

    if (expirationDate < new Date()) {
      return forbidden('{card.card_expiration_date} é inválido.');
    }

    const [user] = await this.userRepository.find({ id: user_id });

    const creditCardAlreadyExists =
      user.cards &&
      user.cards.find(({ card_cvv }) => card_cvv === card.card_cvv);

    if (creditCardAlreadyExists) {
      return forbidden('cartão de crédito já cadastrado.');
    }

    card.card_expiration_date =
      expirationDate.getMonth().toString().padStart(2, '0') +
      expirationDate.getFullYear().toString().substring(2);

    await this.userRepository.update({
      user_id,
      newData: { cards: [...(user.cards || []), card] }
    });

    return accepted();
  }
}

export namespace AddUserCreditCard {
  export type Request = AddUserCreditCardDTO;
}
