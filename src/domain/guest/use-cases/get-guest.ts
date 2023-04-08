import { RequestError } from '~/infra/errors/request-error';
import { UseCase } from '~/infra/http/types';
import { CreateResponse } from '~/shared/utils/create-reponse';

import { GuestRepository } from '../repositories/guest-repository';

type Input = {
  id: string;
};

export class GetGuestUseCase implements UseCase<Input> {
  constructor(private readonly repository: GuestRepository) {}

  async execute(input: Input) {
    const id = input.id ? parseInt(input.id) : null;

    if (!id) {
      throw new RequestError(400, 'Invalid input');
    }

    const guest = await this.repository.findOne(id);

    if (!guest) {
      throw new RequestError(404, 'Guest not found');
    }

    return CreateResponse.ok(guest);
  }
}
