import { Service, DeleteUserCreditCardDTO, HttpResponse } from '@/contracts';
import { UserRepository } from '@/contracts';
import { accepted, conflict, forbidden, checkMissingParams } from '@/helpers';

export class DeleteUserCreditCard implements Service {
  constructor(private userRepository: UserRepository) {}

  async handle(request: DeleteUserCreditCard.Request): Promise<HttpResponse> {
    const errors = checkMissingParams(request, ['card_cvv']);

    if (errors.length) {
      return conflict(errors);
    }

    const { user_id, card_cvv } = request;
    const [user] = await this.userRepository.find({ id: user_id });
    const creditCardExists =
      user.cards && user.cards.find((c) => c.card_cvv === card_cvv);

    if (!creditCardExists) {
      return forbidden('cartão de crédito não encontrado.');
    }

    user.cards = user.cards.filter((c) => c.card_cvv !== card_cvv);

    await this.userRepository.update({
      user_id,
      newData: { cards: user.cards }
    });

    return accepted();
  }
}

export namespace DeleteUserCreditCard {
  export type Request = DeleteUserCreditCardDTO;
}
