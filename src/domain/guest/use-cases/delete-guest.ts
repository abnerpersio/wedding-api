import { RequestError } from '~/infra/errors/request-error';
import { HttpResponse, UseCase } from '~/infra/http/types';
import { CreateResponse } from '~/shared/utils/create-reponse';

import { GuestRepository } from '../repositories/guest-repository';

type Input = {
  id: string;
};

export class DeleteGuestUseCase implements UseCase<Input> {
  constructor(private readonly repository: GuestRepository) {}

  async execute(input: Input): Promise<HttpResponse<unknown>> {
    const id = parseInt(input.id);

    const exists = await this.repository.findOne(id);
    if (!exists) {
      throw new RequestError(404, 'Guest not exists.');
    }

    await this.repository.delete(id);
    return CreateResponse.noContent();
  }
}
