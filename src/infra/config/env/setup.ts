import { config } from 'dotenv';
import { prisma } from '~/infra/config/database';

config();

prisma
  .$connect()
  .then(() => console.info('Connected to the database!'))
  .catch((e) => console.log('Error connecting to the database:', e?.message || ''));
