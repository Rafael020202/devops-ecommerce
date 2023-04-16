import {
  Service,
  GetUserDataDTO,
  HttpResponse,
  UserRepository
} from '@/contracts';
import { success } from '@/helpers';

export class GetUserDataService implements Service {
  constructor(private userRepository: UserRepository) {}

  async handle(request: GetUserDataService.Request): Promise<HttpResponse> {
    const [user] = await this.userRepository.find({ id: request.user_id });

    delete user.password;

    return success(user);
  }
}

export namespace GetUserDataService {
  export type Request = GetUserDataDTO;
}
