import { prisma } from '~/infra/config/database';

import { UserRepository } from '../repositories/user-respository';
import { GetMeUseCase } from '../use-cases/get-me';

export class GetMeController {
  static create() {
    const repository = new UserRepository(prisma);
    return new GetMeUseCase(repository);
  }
}
