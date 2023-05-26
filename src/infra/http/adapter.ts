import { Request, Response } from 'express';
import { logger } from '~/infra/config/logger';
import { RequestError } from '~/infra/errors/request-error';
import { Credentials, UseCase } from '~/infra/http/types';

export class ExpressAdapter {
  constructor(private readonly useCase: UseCase) {}

  adapt = async (req: Request, res: Response) => {
    const input = { ...(req.body || {}), ...(req.query || {}), ...(req.params || {}) };

    try {
      const credentials = req.credentials as Credentials;
      const { status, message, data } = await this.useCase.execute(input, credentials);

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
          input,
          error: error.message || '',
        },
        'Error at request',
      );

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
