import { resolve } from 'path';

import { PrismaClient } from '@prisma/client';

import { parseCSV } from '../../src/shared/utils/parse-csv';

const prisma = new PrismaClient();

type RawItem = {
  name: string;
  phone?: string;
  companions: string;
};

(async () => {
  const list = await parseCSV<RawItem>(resolve(__dirname, '..', 'assets', 'new-list.csv'));

  console.info(`Started creating ${list.length} records`);

  for await (const data of list) {
    console.info(`Creating ${data.name} guest and invite`);

    const guest = await prisma.guest.create({
      data: {
        name: data.name,
        phone: data.phone,
        type: 'common',
      },
    });

    await prisma.invite.create({
      data: {
        guestId: guest.id,
        companions: data.companions ? parseInt(data.companions || '0') : undefined,
        status: 'waiting',
      },
    });
    console.info(`Finished creating ${data.name} guest and invite`);
  }
})();
