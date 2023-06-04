const validPhoneRegex = /^((\+)?55)?\d{2}\d{9}$/;

export class Formatters {
  static phone(input?: string | null): string | null {
    if (!input) return null;
    const phone = input.replace(/\D/g, '').trim();
    const prefix = '55';

    if (phone.match(validPhoneRegex)) {
      const replaced = phone.replace(/^(\+)?55/g, '');
      return `${prefix}${replaced}`;
    }

    return null;
  }

  static whatsappId(phoneNumber: string) {
    const phone = this.phone(phoneNumber);
    if (!phone) return null;
    return `${phone}@c.us`;
  }
}
