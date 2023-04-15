import {
  Service,
  RemoveProductFromCartDTO,
  HttpResponse,
  CartRepository
} from '@/contracts';
import { success, conflict, checkMissingParams, forbidden } from '@/helpers';

export class RemoveProductFromCartService implements Service {
  constructor(private cartRepository: CartRepository) {}

  async handle(
    request: RemoveProductFromCartService.Request
  ): Promise<HttpResponse> {
    const errors = checkMissingParams(request, ['product_id']);

    if (errors.length) {
      return conflict(errors);
    }

    const { product_id, user_id } = request;
    const [cart] = await this.cartRepository.find({ user_id });
    const index = cart.products?.findIndex((p) => p.id === product_id);

    if (index === -1) {
      return forbidden('produto não encontrado no carrinho.');
    }

    cart.products.splice(index, 1);

    await this.cartRepository.update({
      user_id,
      newData: { ...cart }
    });

    return success({});
  }
}

export namespace RemoveProductFromCartService {
  export type Request = RemoveProductFromCartDTO;
}
