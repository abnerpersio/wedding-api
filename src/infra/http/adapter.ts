import { Request, Response } from 'express';
import { Credentials, UseCase } from '~/infra/http/types';

import { RequestError } from '../errors/request-error';

export class ExpressAdapter {
  constructor(private readonly useCase: UseCase) {}

  adapt = async (req: Request, res: Response) => {
    try {
      const input = { ...(req.body || {}), ...(req.query || {}), ...(req.params || {}) };
      const credentials = {} as Credentials;
      const { status, message, data } = await this.useCase.execute(input, credentials);

      if (message || data) {
        res.status(status).json({ message, data });
        return;
      }

      res.sendStatus(status);
    } catch (error: unknown) {
      if (error instanceof RequestError) {
        res.status(error.statusCode).json({
          message: error.message || 'Internal Error',
        });
        return;
      }

      res.status(500).json({ message: 'Internal Error' });
    }
  };
}
