import { prisma } from '~/infra/config/database';

import { InviteRepository } from '../repositories/invite-repository';
import { CreateInviteUseCase } from '../use-cases/create-invite';

export class CreateInviteController {
  static create() {
    const repository = new InviteRepository(prisma);
    return new CreateInviteUseCase(repository);
  }
}
