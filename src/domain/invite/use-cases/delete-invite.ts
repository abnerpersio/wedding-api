import { InviteRepository } from '~/domain/invite/repositories/invite-repository';
import { RequestError } from '~/infra/errors/request-error';
import { HttpResponse, UseCase } from '~/infra/http/types';
import { CreateResponse } from '~/shared/utils/create-reponse';

type Input = {
  id: string;
};

export class DeleteInviteUseCase implements UseCase<Input> {
  constructor(private readonly repository: InviteRepository) {}

  async execute(input: Input): Promise<HttpResponse> {
    const id = parseInt(input.id);

    const exists = await this.repository.findOne(id);
    if (!exists) {
      throw new RequestError(404, 'Invite not exists.');
    }

    await this.repository.delete(id);
    return CreateResponse.noContent();
  }
}
