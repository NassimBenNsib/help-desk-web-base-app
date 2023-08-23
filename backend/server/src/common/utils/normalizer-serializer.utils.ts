import { normalizeEmail, ip, formatDateFNS } from "../../../lib/external.lib";
class NormalizerSerializerUtils {
  public static normalizeEmail(email: string): string {
    return normalizeEmail(email);
  }
  public static normalizeIPAddress(ip_address: string): string {
    return ip.toBuffer(ip_address).join(".");
  }

  public static formatDate(date: Date, format: string = "dd/MM/yyyy"): string {
    return formatDateFNS(date, format);
  }
}

export { NormalizerSerializerUtils };
