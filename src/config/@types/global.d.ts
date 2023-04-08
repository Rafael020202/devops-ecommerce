import { MongoClient } from 'mongodb';
import { Logger } from 'pino';

declare global {
  const logger: Logger;
  const client: MongoClient;
}

export {};
