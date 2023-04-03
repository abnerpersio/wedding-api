import { BaileysClientAdapter } from './baileys';
import { TwilioClientAdapter } from './twilio';
import { PlatformType, WhatsappClient } from './types';

export class WhatsappClientBuilder {
  static async build(platform: PlatformType): Promise<WhatsappClient> {
    const Adapter = this.getAdapter(platform);
    if (!Adapter) throw new Error(`Whatsapp platform ${platform} not found.`);
    return await new Adapter().build();
  }

  private static getAdapter(platform: PlatformType) {
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
