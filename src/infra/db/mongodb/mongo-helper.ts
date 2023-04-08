import { MongoClient, Collection } from 'mongodb';
import env from '@/config/env';

export const MongoHelper = {
  client: null as MongoClient,

  async connect(): Promise<void> {
    this.client = await MongoClient.connect(
      `mongodb://${encodeURIComponent(
        env.mongodb.username
      )}:${encodeURIComponent(env.mongodb.password)}@mongodb/admin`,
      { directConnection: true }
    );
  },

  getCollection(collectionName: string): Collection {
    return this.client.db('app_db').collection(collectionName);
  },

  disconnect(): Promise<void> {
    return this.client.close();
  }
};
