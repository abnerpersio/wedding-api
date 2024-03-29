import { prisma } from '~/infra/config/database';

import { GuestRepository } from '../repositories/guest-repository';
import { CreateGuestUseCase } from '../use-cases/create-guest';

export class CreateGuestController {
  static create() {
    const repository = new GuestRepository(prisma);
    return new CreateGuestUseCase(repository);
  }
}
