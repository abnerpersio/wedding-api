import { prisma } from '~/infra/config/database';

import { InviteRepository } from '../repositories/invite-repository';
import { GetInviteUseCase } from '../use-cases/get-invite';

export class GetInviteController {
  static create() {
    const repository = new InviteRepository(prisma);
    return new GetInviteUseCase(repository);
  }
}
