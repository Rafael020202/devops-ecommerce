import {
  CreateUserService,
  SignInService,
  UpdateUserAddressService,
  AddUserCreditCard,
  DeleteUserCreditCard
} from '@/services';
import { BcryptProvider, JwtProvider } from '@/providers';
import { UserMongoRepository } from '@/infra/db';
import { AuthMiddleware } from '@/middlewares';

const makeCreateUserService = () => {
  const userRepository = new UserMongoRepository();
  const bcrypt = new BcryptProvider();

  return new CreateUserService(userRepository, bcrypt);
};

const makeSignUpService = () => {
  const userRepository = new UserMongoRepository();
  const bcrypt = new BcryptProvider();
  const jsonwebtoken = new JwtProvider();

  return new SignInService(userRepository, bcrypt, jsonwebtoken);
};

const makeUpdateUserAddressService = () => {
  const userRepository = new UserMongoRepository();

  return new UpdateUserAddressService(userRepository);
};

const makeAuthMiddleware = () => {
  const jsonwebtoken = new JwtProvider();

  return new AuthMiddleware(jsonwebtoken);
};

const makeAddUserCreditCard = () => {
  const userRepository = new UserMongoRepository();

  return new AddUserCreditCard(userRepository);
};

const makeDeleteUserCreditCard = () => {
  const userRepository = new UserMongoRepository();

  return new DeleteUserCreditCard(userRepository);
};

export const userRoutes = [
  {
    method: 'post',
    path: '/user',
    handler: makeCreateUserService()
  },
  {
    method: 'post',
    path: '/signin',
    handler: makeSignUpService()
  },
  {
    method: 'patch',
    path: '/user/address',
    handler: makeUpdateUserAddressService(),
    middleware: makeAuthMiddleware()
  },
  {
    method: 'post',
    path: '/user/credit_card',
    handler: makeAddUserCreditCard(),
    middleware: makeAuthMiddleware()
  },
  {
    method: 'delete',
    path: '/user/credit_card/:card_cvv',
    handler: makeDeleteUserCreditCard(),
    middleware: makeAuthMiddleware()
  }
];
