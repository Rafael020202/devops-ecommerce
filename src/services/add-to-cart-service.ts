import { Service, AddToCartDTO, HttpResponse } from '@/contracts';
import { CartRepository } from '@/contracts';
import { badRequest, success, conflict, checkMissingParams } from '@/helpers';

export class AddToCartService implements Service {
  constructor(private cartRepository: CartRepository) {}

  async handle(request: AddToCartService.Request): Promise<HttpResponse> {
    const errors = checkMissingParams(request, ['product_id']);

    if (errors.length) {
      return conflict(errors);
    }

    const { product_id, user_id } = request;
    const [cart] = await this.cartRepository.find({ user_id });

    if (!cart) {
      await this.cartRepository.create({
        user_id,
        products: [product_id],
        created_at: new Date(),
        updated_at: new Date()
      });

      return success(null);
    }

    const productIndex = cart.products.indexOf(product_id);

    if (productIndex !== -1) {
      return badRequest('Produto já adicionado no carrinho.');
    }

    cart.products.push(product_id);

    await this.cartRepository.update({
      user_id,
      ...cart,
      updated_at: new Date()
    });

    return success(null);
  }
}

export namespace AddToCartService {
  export type Request = AddToCartDTO;
}
