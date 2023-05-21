import { InviteRepository } from '~/domain/invite/repositories/invite-repository';
import { RequestError } from '~/infra/errors/request-error';
import { HttpResponse, UseCase } from '~/infra/http/types';
import { CreateResponse } from '~/shared/utils/create-reponse';

import { InviteStatus } from '@prisma/client';

type Input = {
  guestId: number;
  companions?: number;
  comments?: string;
  status?: string;
};

export class CreateInviteUseCase implements UseCase<Input> {
  constructor(private readonly repository: InviteRepository) {}

  async execute(input: Input): Promise<HttpResponse> {
    if (!input.guestId) {
      throw new RequestError(400, 'Invalid input.');
    }

    const guest = await this.repository.create({
      guestId: input.guestId,
      comments: input.comments,
      companions: input.companions,
      status: input.status as InviteStatus,
    });

    return CreateResponse.created(guest);
  }
}
