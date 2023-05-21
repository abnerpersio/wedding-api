import { prisma } from '~/infra/config/database';

import { GuestRepository } from '../repositories/guest-repository';
import { ListGuestsUseCase } from '../use-cases/list-guests';

export class ListGuestsController {
  static create() {
    const repository = new GuestRepository(prisma);
    return new ListGuestsUseCase(repository);
  }
}
