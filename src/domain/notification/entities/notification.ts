import { Guest } from '~/domain/guest/entities/guest';

import {
  MessageChannel,
  NotificationStatus,
  Guest as PrismaGuest,
  Notification as PrismaNotificationPrev,
} from '@prisma/client';

type PrismaNotification = PrismaNotificationPrev & {
  guest?: PrismaGuest;
};

export class Notification {
  id: number;
  recipient: string;
  message: string;
  channel: MessageChannel;
  status: NotificationStatus;
  type: string;
  failedReason: string | null;
  guestId: number;

  guest?: Guest;

  constructor(payload: PrismaNotification) {
    this.id = payload.id;
    this.status = payload.status;
    this.recipient = payload.recipient;
    this.message = payload.message;
    this.channel = payload.channel;
    this.type = payload.type;
    this.failedReason = payload.failedReason;
    this.guestId = payload.guestId;

    if (payload.guest) {
      this.guest = new Guest(payload.guest);
    }
  }
}
