import { InviteStatus } from '@prisma/client';

export type InviteFilters = {
  guestId?: number;
  status?: InviteStatus;
};

export type CreateInviteInput = {
  guestId: number;
  companions?: number;
  comments?: string;
  status?: InviteStatus;
};

export type UpdateInviteInput = {
  companions?: number;
  comments?: string;
  status?: InviteStatus;
};
