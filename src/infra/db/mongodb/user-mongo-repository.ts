import { UserRepository } from '@/contracts';
import { MongoHelper } from '@/infra/db';

export class UserMongoRepository implements UserRepository {
  async create(
    data: UserRepository.create['Params']
  ): Promise<UserRepository.create['Result']> {
    const usersCollection = MongoHelper.getCollection('users');

    return usersCollection.insertOne(data);
  }

  async find(
    data: UserRepository.find['Params']
  ): Promise<UserRepository.find['Result']> {
    const usersCollection = MongoHelper.getCollection('users');

    return <any>(
      usersCollection.find(data, { projection: { _id: 0 } }).toArray()
    );
  }

  async update(
    data: UserRepository.update['Params']
  ): Promise<UserRepository.update['Result']> {
    const usersCollection = MongoHelper.getCollection('users');
    const { user_id, newData } = data;

    return usersCollection.updateOne(
      { id: user_id },
      { $set: { ...newData, updated_at: new Date() } }
    );
  }
}
