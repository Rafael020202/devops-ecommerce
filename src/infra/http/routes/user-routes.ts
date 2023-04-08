import { CreateUserService, SignInService } from '@/services';
import { AuthMiddleware } from '@/middlewares';

import { UserMongoRepository } from '@/infra/db';

const userRepository = new UserMongoRepository();
const createUserService = new CreateUserService(userRepository);
const signInService = new SignInService(userRepository);
const authMiddleware = new AuthMiddleware();

export const userRoutes = [
  {
    method: 'post',
    path: '/user',
    middleware: authMiddleware,
    handler: createUserService
  },
  {
    method: 'post',
    path: '/sigin',
    handler: signInService
  }
];
