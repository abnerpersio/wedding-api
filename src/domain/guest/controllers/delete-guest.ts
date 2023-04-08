import { prisma } from '~/infra/config/database';

import { GuestRepository } from '../repositories/guest-repository';
import { DeleteGuestUseCase } from '../use-cases/delete-guest';

export class DeleteGuestController {
  static create() {
    const repository = new GuestRepository(prisma);
    return new DeleteGuestUseCase(repository);
  }
}
