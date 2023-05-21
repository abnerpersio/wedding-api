import { prisma } from '~/infra/config/database';

import { InviteRepository } from '../repositories/invite-repository';
import { ListInvitesUseCase } from '../use-cases/list-invites';

export class ListInvitesController {
  static create() {
    const repository = new InviteRepository(prisma);
    return new ListInvitesUseCase(repository);
  }
}
