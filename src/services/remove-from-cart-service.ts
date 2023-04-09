import { Service, RemoveFromCartDTO, HttpResponse } from '@/contracts';
import { CartRepository } from '@/contracts';
import { success, conflict, checkMissingParams } from '@/helpers';

export class RemoveFromCartService implements Service {
  constructor(private cartRepository: CartRepository) {}

  async handle(request: RemoveFromCartService.Request): Promise<HttpResponse> {
    const errors = checkMissingParams(request, ['product_id']);

    if (errors.length) {
      return conflict(errors);
    }

    const { product_id, user_id } = request;
    const [cart] = await this.cartRepository.find({ user_id });

    cart.products = cart.products.filter((p_id) => p_id !== product_id);

    await this.cartRepository.update({
      user_id,
      ...cart,
      updated_at: new Date()
    });

    return success(null);
  }
}

export namespace RemoveFromCartService {
  export type Request = RemoveFromCartDTO;
}
