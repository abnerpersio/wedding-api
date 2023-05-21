import { InviteRepository } from '~/domain/invite/repositories/invite-repository';
import { RequestError } from '~/infra/errors/request-error';
import { UseCase } from '~/infra/http/types';
import { CreateResponse } from '~/shared/utils/create-reponse';

type Input = {
  id: string;
};

export class UpdateInviteUseCase implements UseCase<Input> {
  constructor(private readonly repository: InviteRepository) {}

  async execute(input: Input) {
    const { id: inviteId, ...data } = input;
    const id = parseInt(inviteId);

    const exists = await this.repository.findOne(id);
    if (!exists) {
      throw new RequestError(404, 'Invite not exists.');
    }

    const invite = await this.repository.update(id, data);
    return CreateResponse.ok(invite);
  }
}
