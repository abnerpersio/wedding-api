import { Application } from 'express';
import { ExpressAdapter } from '~/infra/http/adapter';
import { ROUTES } from '~/infra/http/router/routes';
import { HttpMethod } from '~/infra/http/router/types';

type ExpressHttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export class HttpRouter {
  constructor(private readonly server: Application) {}

  setup() {
    // TODO: handle custom middlewares here
    for (const route of ROUTES) {
      const method = this.parseMethod(route.method);
      if (!this.server[method]) continue;
      this.server[method](route.path, new ExpressAdapter(route.useCase).adapt);
    }
  }

  private parseMethod(method: HttpMethod) {
    return method.toLowerCase() as ExpressHttpMethod;
  }
}
