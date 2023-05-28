import { GuestRepository } from '~/domain/guest/repositories/guest-repository';
import { prisma } from '~/infra/config/database';

import { InviteRepository } from '../repositories/invite-repository';
import { CreateInviteUseCase } from '../use-cases/create-invite';

export class CreateInviteController {
  static create() {
    const guestRepo = new GuestRepository(prisma);
    const inviteRepo = new InviteRepository(prisma);
    return new CreateInviteUseCase(guestRepo, inviteRepo);
  }
}
