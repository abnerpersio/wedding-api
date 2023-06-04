// import * as venom from 'venom-bot';
import { WhatsappClient } from '~/services/whatsapp/types';
import { Formatters } from '~/shared/utils/formatters';

export class VenomClientAdapter implements WhatsappClient {
  // private client?: venom.Whatsapp;

  async build() {
    // const options = {
    //   logQR: true,
    // } satisfies venom.CreateConfig;
    // this.client = await venom.create('wedding-api-session', undefined, undefined, options);
    return this;
  }

  async sendMessage(message: string, phone: string) {
    // if (!this.client) {
    //   throw new Error('Client not configured');
    // }
    // const whatsappId = Formatters.whatsappId(phone);
    // if (!whatsappId) {
    //   throw new Error('Invalid whatsapp ID');
    // }
    // await this.client.sendText(whatsappId, message);
  }
}
