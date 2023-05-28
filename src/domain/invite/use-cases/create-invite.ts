import { GuestRepository } from '~/domain/guest/repositories/guest-repository';
import { InviteRepository } from '~/domain/invite/repositories/invite-repository';
import { RequestError } from '~/infra/errors/request-error';
import { HttpResponse, UseCase } from '~/infra/http/types';
import { CreateResponse } from '~/shared/utils/create-reponse';

import { InviteStatus } from '@prisma/client';

type Input = {
  guestId: string;
  companions?: number;
  comments?: string;
  status?: string;
};

export class CreateInviteUseCase implements UseCase<Input> {
  constructor(
    private readonly guestRepo: GuestRepository,
    private readonly inviteRepo: InviteRepository,
  ) {}

  async execute(input: Input): Promise<HttpResponse> {
    if (!input.guestId) {
      throw new RequestError(400, 'Invalid input.');
    }

    const guestExists = await this.guestRepo.findOne(input.guestId);
    if (!guestExists) {
      throw new RequestError(404, 'Guest not found.');
    }

    const invite = await this.inviteRepo.create({
      guestId: input.guestId,
      comments: input.comments,
      companions: input.companions,
      status: input.status as InviteStatus,
    });

    return CreateResponse.created(invite);
  }
}
