import { UseCase } from './use-case';

export abstract class Controller {
  constructor() {}

  abstract create(): UseCase;
}
