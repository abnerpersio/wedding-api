import { WhatsappClient } from '~/services/whatsapp/types';

// TODO: implement this class
export class TwilioClientAdapter implements WhatsappClient {
  async build() {
    return this;
  }

  async sendMessage(message: string, phone: string) {}
}
