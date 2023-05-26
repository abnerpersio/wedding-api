export const Env = {
  PORT: process.env.PORT || 8080,
  WHATSAPP_PROVIDER: (process.env.WHATSAPP_PROVIDER as string) || 'twilio',
  JWT: {
    SECRET: process.env.JWT_SECRET as string,
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1w',
  },
};
