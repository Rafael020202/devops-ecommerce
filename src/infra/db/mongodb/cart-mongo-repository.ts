import { CartRepository } from '@/contracts';
import { MongoHelper } from '@/infra/db';

export class CartMongoRepository implements CartRepository {
  async create(
    data: CartRepository.create['Params']
  ): Promise<CartRepository.create['Result']> {
    const cartsCollection = MongoHelper.getCollection('carts');

    return cartsCollection.insertOne(data);
  }

  async find(
    data: CartRepository.find['Params']
  ): Promise<CartRepository.find['Result']> {
    const cartsCollection = MongoHelper.getCollection('carts');

    return <any>(
      cartsCollection.find(data, { projection: { _id: 0 } }).toArray()
    );
  }

  async update(
    data: CartRepository.update['Params']
  ): Promise<CartRepository.update['Result']> {
    const cartsCollection = MongoHelper.getCollection('carts');
    const { user_id, ...newData } = data;

    return cartsCollection.updateOne({ user_id }, { $set: newData });
  }
}
