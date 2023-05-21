import { GuestRepository } from '~/domain/guest/repositories/guest-repository';
import { GuestFilters } from '~/domain/guest/repositories/types';
import { UseCase } from '~/infra/http/types';
import { CreateResponse } from '~/shared/utils/create-reponse';

type Input = GuestFilters;

export class ListGuestsUseCase implements UseCase {
  constructor(private readonly repository: GuestRepository) {}

  async execute(input: Input) {
    const guests = await this.repository.findAll(input);
    return CreateResponse.ok(guests);
  }
}
