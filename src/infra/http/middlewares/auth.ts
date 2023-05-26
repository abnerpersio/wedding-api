import { prisma } from '~/infra/config/database';
import { BaseMiddleware, MiddlewareResponse } from '~/infra/http/middlewares/base';
import { Credentials } from '~/infra/http/types';
import { CreateResponse } from '~/shared/utils/create-reponse';
import { JWT } from '~/shared/utils/jwt';

import { PrismaClient } from '@prisma/client';

type Headers = {
  authorization?: string;
};

export class AuthMiddleware extends BaseMiddleware {
  constructor(private readonly prisma: PrismaClient) {
    super();
  }

  static create() {
    return new AuthMiddleware(prisma);
  }

  protected async execute(
    _: unknown,
    headers: Headers,
    updateCredentials: (payload: Credentials) => void,
  ): Promise<MiddlewareResponse> {
    const token = headers.authorization?.split(' ')?.[1];
    if (!token) return CreateResponse.unauthorized();

    try {
      const credentials = JWT.decode<{ id: number }>(token);
      if (!credentials) return CreateResponse.unauthorized();

      const { id } = credentials;

      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) return CreateResponse.unauthorized();

      updateCredentials({ id, email: user.email, name: user.name });

      return true;
    } catch {
      return CreateResponse.unauthorized();
    }
  }
}
