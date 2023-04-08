import { CreateUserDTO, FindUserDTO } from '@/contracts';
import { UserModel } from '@/models';

export interface IUserRepository {
  create(
    data: IUserRepository.create['Params']
  ): Promise<IUserRepository.create['Result']>;

  find(
    data: IUserRepository.find['Params']
  ): Promise<IUserRepository.find['Result']>;
}

export namespace IUserRepository {
  export type create = {
    Params: CreateUserDTO;
    Result: any;
  };

  export type find = {
    Params: FindUserDTO;
    Result: UserModel[];
  };
}
