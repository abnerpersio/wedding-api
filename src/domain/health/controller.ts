import { Controller } from '~/infra/http/controller';
import { UseCase } from '~/infra/http/use-case';

class MyUseCase extends UseCase {
  constructor() {
    super();
  }

  protected async execute() {
    console.log('execute');
    return {
      status: 200,
      message: 'Test',
    };
  }
}

export class HealthController extends Controller {
  create() {
    return new MyUseCase();
  }
}
