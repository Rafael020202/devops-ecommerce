import {
  Service,
  AddProductToCartDTO,
  HttpResponse,
  CartRepository,
  ProductRepository
} from '@/contracts';
import { success, conflict, forbidden, checkMissingParams } from '@/helpers';

export class AddProductToCartService implements Service {
  constructor(
    private cartRepository: CartRepository,
    private productRepository: ProductRepository
  ) {}

  async handle(
    request: AddProductToCartService.Request
  ): Promise<HttpResponse> {
    const errors = checkMissingParams(request, ['product_id']);

    if (errors.length) {
      return conflict(errors);
    }

    const { product_id, user_id } = request;
    const [product] = await this.productRepository.find({ id: product_id });

    if (!product) {
      return forbidden('produto não encontrado.');
    }

    const [cart] = await this.cartRepository.find({ user_id });
    const index = cart.products?.findIndex((p) => p.id === product_id);

    if (index !== -1) {
      return forbidden('produto já adicionado ao carrinho.');
    }

    await this.cartRepository.update({
      user_id,
      newData: {
        products: [...(cart.products || []), product]
      }
    });

    return success({});
  }
}

export namespace AddProductToCartService {
  export type Request = AddProductToCartDTO;
}
