import { UseCase } from '~/infra/http/types';

export class HealthUseCase implements UseCase {
  constructor() {}

  async execute() {
    return {
      status: 200,
      message: 'Everything is ok!',
    };
  }
}
