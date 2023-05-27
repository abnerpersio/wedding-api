import { GuestRepository } from '~/domain/guest/repositories/guest-repository';
import { RequestError } from '~/infra/errors/request-error';
import { UseCase } from '~/infra/http/types';
import { CreateResponse } from '~/shared/utils/create-reponse';

type Input = {
  id: string;
};

export class GetGuestUseCase implements UseCase<Input> {
  constructor(private readonly repository: GuestRepository) {}

  async execute(input: Input) {
    const { id } = input;

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
