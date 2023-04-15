import {
  Service,
  HttpResponse,
  SignInDTO,
  Criptography,
  Jwt,
  UserRepository
} from '@/contracts';
import {
  badRequest,
  success,
  forbidden,
  conflict,
  checkMissingParams
} from '@/helpers';

export class SignInService implements Service {
  constructor(
    private userRepository: UserRepository,
    private criptography: Criptography,
    private jwt: Jwt
  ) {}

  async handle(request: SignInService.Request): Promise<HttpResponse> {
    const errors = checkMissingParams(request, ['password', 'email']);

    if (errors.length) {
      return conflict(errors);
    }

    const { email, password } = request;
    const [user] = await this.userRepository.find({ email });

    if (!user) {
      return badRequest('Usuário não encontrado.');
    }

    const comparePassword = await this.criptography.compare(
      password,
      user.password
    );

    if (!comparePassword) {
      return forbidden('Senha inválida.');
    }

    const token = await this.jwt.sigin({ user_id: user.id });

    delete user.password;

    return success({ user, token });
  }
}

export namespace SignInService {
  export type Request = SignInDTO;
}
