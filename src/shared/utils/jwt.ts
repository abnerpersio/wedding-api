import jwt, { JwtPayload } from 'jsonwebtoken';
import { Env } from '~/infra/config/env';

export class JWT {
  static decode<T = Record<string, unknown>>(token: string): (T & JwtPayload) | null {
    return jwt.decode(token, { json: true }) as T & JwtPayload;
  }

  static encode(payload: Record<string, unknown>) {
    return jwt.sign(payload, Env.JWT.SECRET, { expiresIn: Env.JWT.EXPIRES_IN });
  }
}
