export type PlatformType = 'twilio' | 'baileys' | 'venom';

export interface WhatsappClient {
  build: () => Promise<this> | this;

  sendMessage: (message: string, phone: string) => Promise<void>;
}
