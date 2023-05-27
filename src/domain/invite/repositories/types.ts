import { InviteStatus } from '@prisma/client';

export type InviteFilters = {
  guestId?: string;
  status?: InviteStatus;
};

export type CreateInviteInput = {
  guestId: string;
  companions?: number;
  comments?: string;
  status?: InviteStatus;
};

export type UpdateInviteInput = {
  companions?: number;
  comments?: string;
  status?: InviteStatus;
};
