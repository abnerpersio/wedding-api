import { RequestError } from '~/infra/errors/request-error';
import { HttpResponse, UseCase } from '~/infra/http/types';
import { CreateResponse } from '~/shared/utils/create-reponse';

import { GuestType } from '@prisma/client';

import { GuestRepository } from '../repositories/guest-repository';

type Payload = {
  name: string;
  email?: string | null;
  phone?: string | null;
  type?: GuestType;
};

export class CreateGuestUseCase implements UseCase<Payload> {
  constructor(private readonly repository: GuestRepository) {}

  async execute(input: Payload): Promise<HttpResponse> {
    if (!input.name) {
      throw new RequestError(400, 'Invalid input.');
    }

    const guest = await this.repository.create({
      name: input.name,
      type: input.type,
      email: input.email || null,
      phone: input.phone || null,
    });

    return CreateResponse.created(guest);
  }
}
