import {
  Service,
  UpdateUserAddressDTO,
  HttpResponse,
  UserRepository
} from '@/contracts';
import { accepted, conflict, checkMissingParams } from '@/helpers';

export class UpdateUserAddressService implements Service {
  constructor(private userRepository: UserRepository) {}

  async handle(
    request: UpdateUserAddressService.Request
  ): Promise<HttpResponse> {
    const errors = checkMissingParams(request, [
      'address.city',
      'address.country',
      'address.number',
      'address.state',
      'address.street',
      'address.zipcode'
    ]);

    if (errors.length) {
      return conflict(errors);
    }

    const { user_id, address } = request;

    await this.userRepository.update({
      user_id,
      newData: { address }
    });

    return accepted();
  }
}

export namespace UpdateUserAddressService {
  export type Request = UpdateUserAddressDTO;
}
