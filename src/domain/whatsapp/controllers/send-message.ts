import { GuestRepository } from '~/domain/guest/repositories/guest-repository';
import { NotificationRepository } from '~/domain/notification/repositories/notification-repository';
import { SendMessageUseCase } from '~/domain/whatsapp/use-cases/send-message';
import { prisma } from '~/infra/config/database';

export class SendMessageController {
  static create() {
    const guestRepo = new GuestRepository(prisma);
    const notificationRepo = new NotificationRepository(prisma);
    return new SendMessageUseCase(guestRepo, notificationRepo);
  }
}
