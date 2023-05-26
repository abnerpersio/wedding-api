import { prisma } from '~/infra/config/database';

import { UserRepository } from '../repositories/user-respository';
import { LoginUseCase } from '../use-cases/login';

export class LoginController {
  static create() {
    const repository = new UserRepository(prisma);
    return new LoginUseCase(repository);
  }
}
