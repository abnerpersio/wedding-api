import { BaileysClientAdapter } from './baileys';
import { TwilioClientAdapter } from './twilio';
import { PlatformType, WhatsappClient } from './types';

export class WhatsappClientBuilder {
  constructor() {}

  build(platform: PlatformType): WhatsappClient {
    const Adapter = this.getAdapter(platform);
    if (!Adapter) throw new Error(`Whatsapp platform ${platform} not found.`);
    return new Adapter().build();
  }

  private getAdapter(platform: PlatformType) {
    switch (platform) {
      case 'baileys':
        return BaileysClientAdapter;

      case 'twilio':
        return TwilioClientAdapter;

      default:
        break;
    }
  }
}
