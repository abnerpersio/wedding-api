import { MessageChannel, NotificationStatus } from '@prisma/client';

export type NotificationFilters = {
  guestId?: number;
  status?: NotificationStatus;
};

export type CreateNotificationInput = {
  guestId: number;
  recipient: string;
  message: string;
  channel: MessageChannel;
  status?: NotificationStatus;
  type: string;
  failedReason?: string | null;
};

export type UpdateNotificationInput = {
  status?: NotificationStatus;
  failedReason?: string | null;
};
