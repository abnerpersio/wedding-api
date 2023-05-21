import { InviteRepository } from '~/domain/invite/repositories/invite-repository';
import { RequestError } from '~/infra/errors/request-error';
import { UseCase } from '~/infra/http/types';
import { CreateResponse } from '~/shared/utils/create-reponse';

type Input = {
  id: string;
};

export class GetInviteUseCase implements UseCase<Input> {
  constructor(private readonly repository: InviteRepository) {}

  async execute(input: Input) {
    const id = input.id ? parseInt(input.id) : null;

    if (!id) {
      throw new RequestError(400, 'Invalid input');
    }

    const invite = await this.repository.findOne(id);

    if (!invite) {
      throw new RequestError(404, 'Invite not found');
    }

    return CreateResponse.ok(invite);
  }
}
