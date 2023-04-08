import { Service, CreateUserDTO, HttpResponse } from '@/contracts';
import { UserRepository, Criptography } from '@/contracts';
import { badRequest, created, conflict, checkMissingParams } from '@/helpers';

export class CreateUserService implements Service {
  constructor(
    private userRepository: UserRepository,
    private criptography: Criptography
  ) {}

  async handle(request: CreateUserService.Request): Promise<HttpResponse> {
    const errors = checkMissingParams(request, ['name', 'password', 'email']);

    if (errors.length) {
      return conflict(errors);
    }

    const [user] = await this.userRepository.find({ email: request.email });

    if (user) {
      return badRequest('E-mail já possui cadastro.');
    }

    const { email, name, password } = request;
    const hashedPassword = await this.criptography.hash(password);

    await this.userRepository.create({ email, name, password: hashedPassword });

    return created();
  }
}

export namespace CreateUserService {
  export type Request = CreateUserDTO;
}
