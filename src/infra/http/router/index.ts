import { Application } from 'express';

import { ROUTES } from './routes';

export class HttpRouter {
  constructor(private readonly server: Application) {}

  setup() {
    // TODO: handle custom middlewares here
    for (const route of ROUTES) {
      this.server[route.method](route.path, route.useCase.adapt);
    }
  }
}
