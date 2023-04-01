// TODO: implement this class
import { WhatsappClient } from '~/services/whatsapp/types';

export class BaileysClientAdapter implements WhatsappClient {
  build() {
    return this;
  }

  async sendMessage(message: string) {}
}
