import { SendMessageUseCase } from '~/domain/whatsapp/use-cases/send-message';

export class SendMessageController {
  static create() {
    return new SendMessageUseCase();
  }
}
