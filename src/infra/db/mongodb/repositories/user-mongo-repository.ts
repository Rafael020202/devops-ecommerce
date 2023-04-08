import { IUserRepository } from '@/contracts';
import { MongoHelper } from '@/infra/db/mongodb';
import { uniqueid } from '@/helpers';

export class UserMongoRepository implements IUserRepository {
  async create(
    data: IUserRepository.create['Params']
  ): Promise<IUserRepository.create['Result']> {
    const usersCollection = MongoHelper.getCollection('users');

    return usersCollection.insertOne({
      id: uniqueid(),
      ...data
    });
  }

  async find(
    data: IUserRepository.find['Params']
  ): Promise<IUserRepository.find['Result']> {
    const usersCollection = MongoHelper.getCollection('users');

    return <any>(
      usersCollection.find(data, { projection: { _id: 0 } }).toArray()
    );
  }
}
