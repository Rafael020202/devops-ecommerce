import { MongoHelper } from '@/infra/db/mongodb';
import initApp from '@/app';

MongoHelper.connect().then(() => initApp());
