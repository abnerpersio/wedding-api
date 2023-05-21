import { prisma } from '~/infra/config/database';

import { InviteRepository } from '../repositories/invite-repository';
import { DeleteInviteUseCase } from '../use-cases/delete-invite';

export class DeleteInviteController {
  static create() {
    const repository = new InviteRepository(prisma);
    return new DeleteInviteUseCase(repository);
  }
}
