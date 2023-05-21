import { GuestRepository } from '~/domain/guest/repositories/guest-repository';
import { NotificationRepository } from '~/domain/notification/repositories/notification-repository';
import { Env } from '~/infra/config/env';
import { RequestError } from '~/infra/errors/request-error';
import { HttpResponse, UseCase } from '~/infra/http/types';
import { WhatsappClientBuilder } from '~/services/whatsapp/client';
import { PlatformType } from '~/services/whatsapp/types';
import { CreateResponse } from '~/shared/utils/create-reponse';
import { Formatters } from '~/shared/utils/formatters';

type Input = {
  message: string;
  messageType?: string;
  guestId: string;
};

export class SendMessageUseCase implements UseCase {
  constructor(
    private readonly guestRepo: GuestRepository,
    private readonly notificationRepo: NotificationRepository,
  ) {}

  async execute(input: Input): Promise<HttpResponse> {
    const { message } = input;
    const guestId = parseInt(input.guestId);

    const adapter = await WhatsappClientBuilder.build(Env.WHATSAPP_PROVIDER as PlatformType);

    const guest = await this.guestRepo.findOne(guestId);
    if (!guest) {
      throw new RequestError(404, 'Guest not found.');
    }

    const phone = Formatters.phone(guest.phone);
    if (!phone) {
      throw new RequestError(400, 'Invalid phone number.');
    }

    await adapter.sendMessage(message, phone);

    await this.notificationRepo.create({
      channel: 'whatsapp',
      guestId,
      message,
      recipient: phone,
      type: input.messageType || 'default',
      status: 'delivered',
    });

    return CreateResponse.noContent();
  }
}
