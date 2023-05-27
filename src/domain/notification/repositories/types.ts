import { MessageChannel, NotificationStatus } from '@prisma/client';

export type NotificationFilters = {
  guestId?: string;
  status?: NotificationStatus;
};

export type CreateNotificationInput = {
  guestId: string;
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
