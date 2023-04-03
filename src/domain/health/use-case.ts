import { UseCase } from '~/infra/http/types';
import { CreateResponse } from '~/shared/utils/create-reponse';

export class HealthUseCase implements UseCase {
  constructor() {}

  async execute() {
    return CreateResponse.ok('Everything is ok!');
  }
}
