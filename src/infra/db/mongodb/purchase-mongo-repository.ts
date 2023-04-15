import { PurchaseRepository } from '@/contracts';
import { MongoHelper } from '@/infra/db';

export class PurchaseMongoRepository implements PurchaseRepository {
  async create(
    data: PurchaseRepository.create['Params']
  ): Promise<PurchaseRepository.create['Result']> {
    const purchasesCollection = MongoHelper.getCollection('purchases');

    return <any>purchasesCollection.insertOne(data);
  }
}
