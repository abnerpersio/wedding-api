import { InviteRepository } from '~/domain/invite/repositories/invite-repository';
import { RequestError } from '~/infra/errors/request-error';
import { UseCase } from '~/infra/http/types';
import { CreateResponse } from '~/shared/utils/create-reponse';

import { InviteStatus } from '@prisma/client';

type Input = {
  id: string;
  companions?: number;
  comments?: string;
  status?: string;
};

export class UpdateInviteUseCase implements UseCase<Input> {
  constructor(private readonly repository: InviteRepository) {}

  async execute(input: Input) {
    const { id } = input;

    const exists = await this.repository.findOne(id);
    if (!exists) {
      throw new RequestError(404, 'Invite not exists.');
    }

    const invite = await this.repository.update(id, {
      comments: input.comments,
      companions: input.companions,
      status: input.status as InviteStatus,
    });

    return CreateResponse.ok(invite);
  }
}
