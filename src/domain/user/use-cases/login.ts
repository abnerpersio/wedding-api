import { HttpResponse, UseCase } from '~/infra/http/types';
import { CreateResponse } from '~/shared/utils/create-reponse';
import { Hash } from '~/shared/utils/hash';
import { JWT } from '~/shared/utils/jwt';

import { UserRepository } from '../repositories/user-respository';

type Input = {
  email: string;
  password: string;
};

export class LoginUseCase implements UseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(input: Input): Promise<HttpResponse> {
    const user = await this.repository.findByEmail(input.email);
    if (!user) return CreateResponse.notFound('User not found');

    const isValidPassword = Hash.verify(input.password, user.password);
    if (!isValidPassword) return CreateResponse.unauthorized('Invalid password');

    const accessToken = JWT.encode({ id: user.id });

    return CreateResponse.ok({
      accessToken,
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }
}
