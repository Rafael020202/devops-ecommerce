import { Service, CreateUserDTO, HttpResponse } from '@/contracts';
import { IUserRepository, Criptography } from '@/contracts';
import { badRequest, created } from '@/helpers';

export class CreateUserService implements Service {
  constructor(
    private userRepository: IUserRepository,
    private criptography: Criptography
  ) {}

  async handle(request: CreateUserService.Request): Promise<HttpResponse> {
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
