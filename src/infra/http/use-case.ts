import { Request, Response } from 'express';

import { HttpResponse } from './types';

export abstract class UseCase {
  protected abstract execute(input: Record<string, unknown>): Promise<HttpResponse>;

  adapt = async (req: Request, res: Response) => {
    const input = { ...(req.body || {}), ...(req.query || {}), ...(req.params || {}) };
    const { status, message, data } = await this.execute(input);

    if (message || data) {
      res.status(status).json({ message, data });
      return;
    }

    res.sendStatus(status);
  };
}
