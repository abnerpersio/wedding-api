import { Invite } from '~/domain/invite/entities/invite';

import { GuestType, Guest as PrismaGuestPrev, Invite as PrismaInvite } from '@prisma/client';

type PrismaGuest = PrismaGuestPrev & {
  invites?: PrismaInvite[];
};

export class Guest {
  id: number;
  name: string;
  type: GuestType;
  phone: string | null;
  email: string | null;

  invites?: Invite[];

  constructor(payload: PrismaGuest) {
    this.id = payload.id;
    this.name = payload.name;
    this.type = payload.type;
    this.phone = payload.phone;
    this.email = payload.email;

    if (payload.invites) {
      this.invites = payload.invites.map((invite) => new Invite(invite));
    }
  }
}
