import { Controller, UseCase } from '~/infra/http/types';

class MyUseCase implements UseCase {
  constructor() {}

  async execute() {
    console.log('execute');
    return {
      status: 200,
      message: 'Test',
    };
  }
}

export class HealthController implements Controller {
  create() {
    return new MyUseCase();
  }
}
