import {
  Service,
  SetUserDefaultCreditCardDTO,
  HttpResponse,
  UserRepository
} from '@/contracts';
import { accepted, conflict, forbidden, checkMissingParams } from '@/helpers';

export class SetUserDefaultCreditCardService implements Service {
  constructor(private userRepository: UserRepository) {}

  async handle(
    request: SetUserDefaultCreditCardService.Request
  ): Promise<HttpResponse> {
    const errors = checkMissingParams(request, ['card_cvv']);

    if (errors.length) {
      return conflict(errors);
    }

    const { user_id, card_cvv } = request;
    const [user] = await this.userRepository.find({ id: user_id });
    const index = user.cards?.findIndex((card) => card.card_cvv === card_cvv);

    if (index === -1) {
      return forbidden('cartão de crédito não encontrado.');
    }

    const previousDefaultIndex = user.cards?.findIndex(
      (card) => card.default === true
    );

    if (previousDefaultIndex !== -1) {
      user.cards[previousDefaultIndex] = {
        ...user.cards[index],
        default: false
      };
    }

    user.cards[index] = {
      ...user.cards[index],
      default: true
    };

    await this.userRepository.update({
      user_id,
      newData: { cards: user.cards }
    });

    return accepted();
  }
}

export namespace SetUserDefaultCreditCardService {
  export type Request = SetUserDefaultCreditCardDTO;
}
