export type PlatformType = 'twilio' | 'baileys' | 'web';

export interface WhatsappClient {
  build: () => Promise<this> | this;

  sendMessage: (message: string, phone: string) => Promise<void>;
}
