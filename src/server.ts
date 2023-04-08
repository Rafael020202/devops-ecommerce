import { MongoHelper } from '@/infra/db';
import initApp from '@/app';

MongoHelper.connect().then(() => initApp());
