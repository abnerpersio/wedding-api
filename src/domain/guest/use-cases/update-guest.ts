import { GuestRepository } from '~/domain/guest/repositories/guest-repository';
import { RequestError } from '~/infra/errors/request-error';
import { UseCase } from '~/infra/http/types';
import { CreateResponse } from '~/shared/utils/create-reponse';

import { GuestType } from '@prisma/client';

type Input = {
  id: string;
  name?: string;
  type?: GuestType;
};

export class UpdateGuestUseCase implements UseCase<Input> {
  constructor(private readonly repository: GuestRepository) {}

  async execute(input: Input) {
    const { id: guestId, ...data } = input;
    const id = parseInt(guestId);

    const exists = await this.repository.findOne(id);
    if (!exists) {
      throw new RequestError(404, 'Guest not exists.');
    }

    const guest = await this.repository.update(id, data);
    return CreateResponse.ok(guest);
  }
}
