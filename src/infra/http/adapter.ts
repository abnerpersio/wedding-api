import { Request, Response } from 'express';
import { UseCase } from '~/infra/http/types';

export class ExpressAdapter {
  constructor(private readonly useCase: UseCase) {}

  adapt = async (req: Request, res: Response) => {
    const input = { ...(req.body || {}), ...(req.query || {}), ...(req.params || {}) };
    const { status, message, data } = await this.useCase.execute(input);

    if (message || data) {
      res.status(status).json({ message, data });
      return;
    }

    res.sendStatus(status);
  };
}
