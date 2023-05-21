export class Formatters {
  static phone(phoneNumber?: string | null): string | null {
    if (!phoneNumber) return null;
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    if (cleanedNumber.length !== 11) return null;
    return `+55${cleanedNumber}`;
  }
}
