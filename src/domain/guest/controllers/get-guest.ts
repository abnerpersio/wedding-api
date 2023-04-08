import { prisma } from '~/infra/config/database';

import { GuestRepository } from '../repositories/guest-repository';
import { GetGuestUseCase } from '../use-cases/get-guest';

export class GetGuestController {
  static create() {
    const repository = new GuestRepository(prisma);
    return new GetGuestUseCase(repository);
  }
}
