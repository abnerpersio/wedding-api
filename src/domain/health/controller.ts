import { HealthUseCase } from '~/domain/health/use-case';
import { Controller } from '~/infra/http/types';

export class HealthController implements Controller {
  create() {
    return new HealthUseCase();
  }
}
