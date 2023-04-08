import { prisma } from '~/infra/database';

import { GuestRepository } from '../repositories/guest-repository';
import { CreateGuestUseCase } from '../use-cases/create-guest';

export class CreateGuestController {
  static create() {
    const repository = new GuestRepository(prisma);
    const useCase = new CreateGuestUseCase(repository);
    return useCase;
  }
}
