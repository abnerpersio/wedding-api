import { WhatsappClient } from '~/services/whatsapp/types';

export class BaileysClientAdapter implements WhatsappClient {
  async build() {
    return this;
  }

  async sendMessage(message: string, phone: string) {}
}
