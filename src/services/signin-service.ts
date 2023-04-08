import { Service, HttpResponse } from '@/contracts';
import { IUserRepository } from '@/contracts';
import { badRequest, success, compare, sigin, forbidden } from '@/helpers';

export class SignInService implements Service {
  constructor(private userRepository: IUserRepository) {}

  async handle(request: SignInService.Request): Promise<HttpResponse> {
    const { email, password } = request;

    const [user] = await this.userRepository.find({ email });

    if (!user) {
      return badRequest('Usuário não encontrado.');
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      return forbidden('Senha inválida.');
    }

    const token = await sigin({ user_id: user.id });

    delete user.password;

    return success({ user, token });
  }
}

export namespace SignInService {
  export type Request = {
    email: string;
    password: string;
  };
}
