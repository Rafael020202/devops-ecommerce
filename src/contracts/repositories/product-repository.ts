import { ProductModel } from '@/models';

export interface ProductRepository {
  find(
    data: ProductRepository.find['Params']
  ): Promise<ProductRepository.find['Result']>;
}

export namespace ProductRepository {
  export type find = {
    Params: { [key: string]: any };
    Result: ProductModel[];
  };
}
