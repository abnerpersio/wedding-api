import { BaseMiddleware } from '~/infra/http/middlewares/base';
import { UseCase } from '~/infra/http/types';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type Route = {
  path: string | string[];
  method: HttpMethod;
  useCase: UseCase;
  middlewares?: BaseMiddleware[];
};
