import { CartModel } from '@/models';

export interface CartRepository {
  create(
    data: CartRepository.create['Params']
  ): Promise<CartRepository.create['Result']>;

  find(
    data: CartRepository.find['Params']
  ): Promise<CartRepository.find['Result']>;

  update(
    data: CartRepository.update['Params']
  ): Promise<CartRepository.update['Result']>;
}

export namespace CartRepository {
  export type create = {
    Params: CartModel;
    Result: any;
  };

  export type find = {
    Params: { [key: string]: any };
    Result: CartModel[];
  };

  export type update = {
    Params: CartModel;
    Result: any;
  };
}
