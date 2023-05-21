import { InviteRepository } from '~/domain/invite/repositories/invite-repository';
import { InviteFilters } from '~/domain/invite/repositories/types';
import { UseCase } from '~/infra/http/types';
import { CreateResponse } from '~/shared/utils/create-reponse';

type Input = InviteFilters;

export class ListInvitesUseCase implements UseCase<Input> {
  constructor(private readonly repository: InviteRepository) {}

  async execute(input: Input) {
    const invites = await this.repository.findAll(input);
    return CreateResponse.ok(invites);
  }
}
