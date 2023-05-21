export const Env = {
  PORT: process.env.PORT || 8080,
  WHATSAPP_PROVIDER: (process.env.WHATSAPP_PROVIDER as string) || 'twilio',
};
