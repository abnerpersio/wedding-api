export type PlatformType = 'twilio' | 'baileys';

export interface WhatsappClient {
  build: () => Promise<this> | this;

  sendMessage: (message: string) => Promise<void>;
}
