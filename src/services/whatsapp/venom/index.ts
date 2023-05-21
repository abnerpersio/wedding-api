import { WhatsappClient } from '~/services/whatsapp/types';

export class VenomClientAdapter implements WhatsappClient {
  async build() {
    return this;
  }

  async sendMessage(message: string, phone: string) {
    throw new Error('Provider not implemented.');
  }
}
