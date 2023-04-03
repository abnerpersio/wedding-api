import { HttpResponse } from '~/infra/http/types';

export class CreateResponse {
  static ok(payload?: Record<string, unknown> | string): HttpResponse {
    const field = typeof payload === 'string' ? 'message' : 'data';
    return { status: 200, [field]: payload };
  }

  static created(data?: Record<string, unknown>): HttpResponse {
    return { status: 201, data };
  }

  static noContent(): HttpResponse {
    return { status: 204 };
  }
}
