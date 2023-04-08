import { CreateUserDTO, FindUserDTO } from '@/contracts';
import { UserModel } from '@/models';

export interface UserRepository {
  create(
    data: UserRepository.create['Params']
  ): Promise<UserRepository.create['Result']>;

  find(
    data: UserRepository.find['Params']
  ): Promise<UserRepository.find['Result']>;
}

export namespace UserRepository {
  export type create = {
    Params: CreateUserDTO;
    Result: any;
  };

  export type find = {
    Params: FindUserDTO;
    Result: UserModel[];
  };
}
