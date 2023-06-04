import { Hash } from '~/shared/utils/hash';

const HASH_INPUT = process.env.HASH_INPUT || '';

if (!HASH_INPUT) {
  throw new Error('HASH_INPUT variable is required!');
}

const output = Hash.encrypt(HASH_INPUT);
console.info('Shhhhh.....');
console.info(`Hash result: ${output}`);
