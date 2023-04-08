import { prisma } from '~/infra/config/database';

import { GuestRepository } from '../repositories/guest-repository';
import { UpdateGuestUseCase } from '../use-cases/update-guest';

export class UpdateGuestController {
  static create() {
    const repository = new GuestRepository(prisma);
    return new UpdateGuestUseCase(repository);
  }
}
