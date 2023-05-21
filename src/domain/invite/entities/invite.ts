import { Guest } from '~/domain/guest/entities/guest';

import { InviteStatus, Guest as PrismaGuest, Invite as PrismaInvitePrev } from '@prisma/client';

type PrismaInvite = PrismaInvitePrev & {
  guest?: PrismaGuest;
};

export class Invite {
  id: number;
  status: InviteStatus;
  companions: number;
  commments: string | null;
  guestId: number;

  guest?: Guest;

  constructor(payload: PrismaInvite) {
    this.id = payload.id;
    this.status = payload.status;
    this.companions = payload.companions;
    this.commments = payload.commments;
    this.guestId = payload.guestId;

    if (payload.guest) {
      this.guest = new Guest(payload.guest);
    }
  }
}
