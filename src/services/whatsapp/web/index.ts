import { resolve } from 'path';
import qrcode from 'qrcode-terminal';
import { Client, LocalAuth } from 'whatsapp-web.js';
import { WhatsappClient } from '~/services/whatsapp/types';
import { Formatters } from '~/shared/utils/formatters';

const SESSION_FILE_PATH = resolve(__dirname, '..', '..', '..', '..', 'tmp/whatsapp/session.json');

export class WebAdapter implements WhatsappClient {
  private client?: Client;

  async build() {
    await new Promise<void>((resolve) => {
      const authStrategy = new LocalAuth({ dataPath: SESSION_FILE_PATH, clientId: 'wedding-api' });
      this.client = new Client({ authStrategy });
      this.client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
      });
      this.client.on('ready', resolve);
      this.client.initialize();
    });

    return this;
  }

  async sendMessage(message: string, phone: string) {
    if (!this.client) {
      throw new Error('Client not configured');
    }

    const whatsappId = Formatters.whatsappId(phone);
    if (!whatsappId) {
      throw new Error('Invalid whatsapp ID');
    }

    await this.client.sendMessage(whatsappId, message);
  }
}
