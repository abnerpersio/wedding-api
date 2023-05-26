import { NextFunction, Request, Response } from 'express';
import { logger } from '~/infra/config/logger';
import { RequestError } from '~/infra/errors/request-error';
import { Credentials, HttpResponse } from '~/infra/http/types';

export type MiddlewareResponse<R = unknown> = HttpResponse<R> | true;

export abstract class BaseMiddleware {
  protected abstract execute(
    input: unknown,
    headers: Record<string, unknown>,
    updateCredentials: (payload: Credentials) => void,
  ): Promise<MiddlewareResponse> | MiddlewareResponse;

  adapt = async (req: Request, res: Response, next: NextFunction) => {
    const input = { ...(req.body || {}), ...(req.query || {}), ...(req.params || {}) };
    const headers = { ...(req.headers || {}) };

    try {
      const response = await this.execute(input, headers, (payload) => {
        req.credentials = payload;
      });

      if (typeof response === 'boolean' && response === true) {
        next();
        return;
      }

      const { status, data, message } = response as HttpResponse;

      if (message || data) {
        res.status(status).json({ message, data });
        return;
      }

      res.sendStatus(status);
    } catch (error: any) {
      logger.info(
        {
          path: req.path,
          method: req.method,
          error: error.message || '',
        },
        'Error at middleware',
      );

      if (error instanceof RequestError) {
        res.status(error.statusCode).json({ message: error.message || 'Internal Error' });
        return;
      }

      res.status(500).json({ message: 'Internal Error' });
    }
  };
}
