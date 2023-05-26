import crypto from 'crypto';

const algorithm = 'sha512';
const iterations = 100000;
const keyLength = 64;
const hashSeparator = ':';

export class Hash {
  static encrypt(input: string, salt: string = crypto.randomBytes(16).toString('hex')) {
    const result = crypto.pbkdf2Sync(input, salt, iterations, keyLength, algorithm);
    const hashedPassword = result.toString('hex');
    return [hashedPassword, hashSeparator, salt].join('');
  }

  static verify(input: string, hashed: string) {
    const [, salt] = hashed.split(hashSeparator);
    return this.encrypt(input, salt) === hashed;
  }
}
