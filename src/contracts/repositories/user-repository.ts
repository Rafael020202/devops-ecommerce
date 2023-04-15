import { UserModel } from '@/models';

export interface UserRepository {
  create(
    data: UserRepository.create['Params']
  ): Promise<UserRepository.create['Result']>;

  find(
    data: UserRepository.find['Params']
  ): Promise<UserRepository.find['Result']>;

  update(
    data: UserRepository.update['Params']
  ): Promise<UserRepository.update['Result']>;
}

export namespace UserRepository {
  export type create = {
    Params: UserModel;
    Result: any;
  };

  export type find = {
    Params: { [key: string]: any };
    Result: UserModel[];
  };

  export type update = {
    Params: {
      user_id: string;
      newData: any;
    };
    Result: any;
  };
}
