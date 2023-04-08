import { Service, CreateUserDTO, HttpResponse } from '@/contracts';
import { IUserRepository } from '@/contracts';
import { badRequest, created, hash } from '@/helpers';

export class CreateUserService implements Service {
  constructor(private userRepository: IUserRepository) {}

  async handle(request: CreateUserService.Request): Promise<HttpResponse> {
    const [user] = await this.userRepository.find({ email: request.email });

    if (user) {
      return badRequest('E-mail já possui cadastro.');
    }

    const { email, name, password } = request;
    const hashedPassword = await hash(password);

    await this.userRepository.create({ email, name, password: hashedPassword });

    return created();
  }
}

export namespace CreateUserService {
  export type Request = CreateUserDTO;
}
