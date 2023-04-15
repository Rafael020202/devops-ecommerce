import { ProductRepository } from '@/contracts';
import { MongoHelper } from '@/infra/db';

export class ProductMongoRepository implements ProductRepository {
  async find(
    data: ProductRepository.find['Params']
  ): Promise<ProductRepository.find['Result']> {
    const productsCollection = MongoHelper.getCollection('products');

    return <any>(
      productsCollection.find(data, { projection: { _id: 0 } }).toArray()
    );
  }
}
