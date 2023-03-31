import { UseCase } from './use-case';

// TODO: Refactor this to use interfaces
export abstract class Controller {
  constructor() {}

  abstract create(): UseCase;
}
