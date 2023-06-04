import { WhatsappClient } from '~/services/whatsapp/types';
import { Formatters } from '~/shared/utils/formatters';

export class BaileysClientAdapter implements WhatsappClient {
  async build() {
    return this;
  }

  async sendMessage(message: string, phone: string) {
    const whatsappId = Formatters.whatsappId(phone);
    if (!whatsappId) {
      throw new Error('Invalid whatsapp ID');
    }
  }
}
