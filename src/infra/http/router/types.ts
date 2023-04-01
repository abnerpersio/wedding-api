import { UseCase } from '~/infra/http/types';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type Route = {
  path: string;
  method: HttpMethod;
  useCase: UseCase;
  middlewares?: [];
  routes?: Route[];
};
