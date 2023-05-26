import { User as PrismaUser } from '@prisma/client';

export class User {
  id: number;
  email: string;
  name: string;
  password: string;

  constructor(payload: PrismaUser) {
    this.id = payload.id;
    this.email = payload.email;
    this.name = payload.name;
    this.password = payload.password;
  }
}
