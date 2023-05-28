import { Request } from 'express';
import { prisma } from '~/infra/config/database';
import { BaseMiddleware, MiddlewareResponse } from '~/infra/http/middlewares/base';
import { CreateResponse } from '~/shared/utils/create-reponse';
import { JWT } from '~/shared/utils/jwt';

import { PrismaClient } from '@prisma/client';

export class AuthMiddleware extends BaseMiddleware {
  constructor(private readonly prisma: PrismaClient) {
    super();
  }

  static create() {
    return new AuthMiddleware(prisma);
  }

  protected async execute(req: Request): Promise<MiddlewareResponse> {
    const token = req.headers.authorization?.split(' ')?.[1];
    if (!token) return CreateResponse.unauthorized();

    try {
      const credentials = JWT.decode<{ id: string }>(token);
      if (!credentials) return CreateResponse.unauthorized();

      const { id } = credentials;
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) return CreateResponse.unauthorized();

      req.credentials = {
        id,
        email: user.email,
        name: user.name,
      };

      return true;
    } catch {
      return CreateResponse.unauthorized();
    }
  }
}
