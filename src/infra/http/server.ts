import express, { Application, json } from 'express';
import { Env } from '~/infra/env';
import { HttpRouter } from '~/infra/http/router';

export class Server {
  private readonly app: Application;

  constructor() {
    this.app = express();
  }

  build() {
    this.app.use(json());
    new HttpRouter(this.app).setup();
    return this;
  }

  run() {
    this.app.listen(Env.PORT, () => console.log(`Server is running on port ${Env.PORT}`));
  }
}
