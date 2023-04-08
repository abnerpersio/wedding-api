import { prisma } from '~/infra/config/database';

import { GuestRepository } from '../repositories/guest-repository';
import { ListGuestUseCase } from '../use-cases/list-guests';

export class ListGuestController {
  static create() {
    const repository = new GuestRepository(prisma);
    return new ListGuestUseCase(repository);
  }
}
