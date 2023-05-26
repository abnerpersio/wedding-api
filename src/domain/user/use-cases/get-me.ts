import { Credentials, HttpResponse, UseCase } from '~/infra/http/types';
import { CreateResponse } from '~/shared/utils/create-reponse';

import { UserRepository } from '../repositories/user-respository';

export class GetMeUseCase implements UseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(_: unknown, credentials: Credentials): Promise<HttpResponse> {
    const user = await this.repository.findOne(credentials.id);
    if (!user) return CreateResponse.notFound('User not found');
    return CreateResponse.ok({ id: user.id, name: user.name, email: user.email });
  }
}
