import { UseCase } from '../use-case';

export type Route = {
  path: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  useCase: UseCase;
  middlewares?: [];
  routes?: Route[];
};
