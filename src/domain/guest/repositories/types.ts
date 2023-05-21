import { GuestType } from '@prisma/client';

export type GuestFilters = {
  type?: GuestType;
};

export type CreateGuestInput = {
  name: string;
  email?: string | null;
  phone?: string | null;
  type?: GuestType;
};

export type UpdateGuestInput = {
  name?: string;
  type?: GuestType;
  email?: string;
  phone?: string;
};
