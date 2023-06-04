import { BaileysClientAdapter } from '~/services/whatsapp/baileys';
import { TwilioClientAdapter } from '~/services/whatsapp/twilio';
import { WebAdapter } from '~/services/whatsapp/web';

import { PlatformType, WhatsappClient } from './types';

const ADAPTERS = {
  baileys: BaileysClientAdapter,
  twilio: TwilioClientAdapter,
  web: WebAdapter,
};

export class WhatsappClientBuilder {
  static build(platform: PlatformType): Promise<WhatsappClient> {
    const Adapter = ADAPTERS[platform];
    if (!Adapter) throw new Error(`Whatsapp platform ${platform} not found.`);
    return new Adapter().build();
  }
}
