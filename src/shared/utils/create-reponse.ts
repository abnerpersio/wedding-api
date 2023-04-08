import { HttpResponse } from '~/infra/http/types';

export class CreateResponse {
  static ok(payload?: unknown): HttpResponse {
    const field = typeof payload === 'string' ? 'message' : 'data';
    return { status: 200, [field]: payload };
  }

  static created(data?: unknown): HttpResponse {
    return { status: 201, data };
  }

  static noContent(): HttpResponse {
    return { status: 204 };
  }

  static notFound(): HttpResponse {
    return { status: 404, message: 'Not found' };
  }
}
