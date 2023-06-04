import { resolve } from 'path';
import { WhatsappClient } from '~/services/whatsapp/types';

export class WebAdapter implements WhatsappClient {
  private client?: any;

  async build() {
    return this;
  }

  async sendMessage(message: string, phone: string) {
    if (!this.client) {
      throw new Error('Client not configured');
    }
  }
}
