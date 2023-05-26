import { Credentials } from '../../infra/http/types';

export {};

declare global {
  namespace Express {
    export interface Request {
      credentials?: Credentials;
    }
  }
}
