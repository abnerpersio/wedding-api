import { prisma } from '~/infra/config/database';

import { InviteRepository } from '../repositories/invite-repository';
import { UpdateInviteUseCase } from '../use-cases/update-invite';

export class UpdateInviteController {
  static create() {
    const repository = new InviteRepository(prisma);
    return new UpdateInviteUseCase(repository);
  }
}
