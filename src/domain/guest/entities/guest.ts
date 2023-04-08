import { GuestType, Guest as PrismaGuest } from '@prisma/client';

export class Guest {
  id: number;
  name: string;
  type: GuestType;
  phone: string | null;
  email: string | null;

  constructor(payload: PrismaGuest) {
    this.id = payload.id;
    this.name = payload.name;
    this.type = payload.type;
    this.phone = payload.phone;
    this.email = payload.email;
  }
}
