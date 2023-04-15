import { PurchaseModel } from '@/models';

export interface PurchaseRepository {
  create(
    data: PurchaseRepository.create['Params']
  ): Promise<PurchaseRepository.create['Result']>;
}

export namespace PurchaseRepository {
  export type create = {
    Params: PurchaseModel;
    Result: any;
  };
}
