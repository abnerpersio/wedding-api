import { UseCase } from '~/infra/http/types';
import { CreateResponse } from '~/shared/utils/create-reponse';

import { GuestRepository } from '../repositories/guest-repository';

export class ListGuestUseCase implements UseCase {
  constructor(private readonly repository: GuestRepository) {}

  async execute() {
    const guests = await this.repository.findAll();
    return CreateResponse.ok(guests);
  }
}
