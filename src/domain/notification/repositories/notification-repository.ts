import { Notification } from '~/domain/notification/entities/notification';

import { PrismaClient } from '@prisma/client';

import { CreateNotificationInput, NotificationFilters, UpdateNotificationInput } from './types';

export class NotificationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(filters?: NotificationFilters): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { guestId: filters?.guestId, status: filters?.status },
    });
    return notifications.map((notification) => new Notification(notification));
  }

  async create(input: CreateNotificationInput): Promise<Notification> {
    const created = await this.prisma.notification.create({
      data: {
        status: input.status,
        channel: input.channel,
        message: input.message,
        recipient: input.recipient,
        type: input.type,
        failedReason: input.failedReason,
        guest: {
          connect: {
            id: input.guestId,
          },
        },
      },
    });
    return new Notification(created);
  }

  async update(id: string, input: UpdateNotificationInput): Promise<Notification> {
    const updated = await this.prisma.notification.update({
      where: { id },
      data: {
        status: input.status,
        failedReason: input.failedReason,
      },
    });
    return new Notification(updated);
  }
}
