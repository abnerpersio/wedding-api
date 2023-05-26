import { Hash } from '~/shared/utils/hash';

import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

const insertActions = ['create'];

prisma.$use(async (params, next) => {
  if (params.model === 'User' && insertActions.includes(params.action)) {
    const data = params.args.data;
    if (data) {
      params.args.data.password = Hash.encrypt(data.password);
    }
    return next(params);
  }

  return next(params);
});
