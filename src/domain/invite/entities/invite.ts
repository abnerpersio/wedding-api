import { Guest } from '~/domain/guest/entities/guest';

import { InviteStatus, Guest as PrismaGuest, Invite as PrismaInvitePrev } from '@prisma/client';

type PrismaInvite = PrismaInvitePrev & {
  guest?: PrismaGuest;
};

export class Invite {
  id: string;
  status: InviteStatus;
  companions: number;
  comments: string | null;
  guestId: string;

  guest?: Guest;

  constructor(payload: PrismaInvite) {
    this.id = payload.id;
    this.status = payload.status;
    this.companions = payload.companions;
    this.comments = payload.comments;
    this.guestId = payload.guestId;

    if (payload.guest) {
      this.guest = new Guest(payload.guest);
    }
  }
}
