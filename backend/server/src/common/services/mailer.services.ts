import {
  ConsoleUtils,
  MailerCore,
  APP_CONFIG,
} from "../../../lib/internal.lib";

class MailerServices {
  public static async sendTextMail(message_info: {
    from: string;
    to: string;
    subject: string;
    text: string;
  }): Promise<void> {
    try {
      if (APP_CONFIG.MODE !== "production") return;
      await MailerCore.instance?.sendMail(message_info);
    } catch (error) {
      ConsoleUtils.error([
        "MailersService",
        "sendTextMail",
        "Send mail failed",
        "ERROR BEGIN",
      ]);
      console.table(error);
      console.log(error);
      ConsoleUtils.warn([
        "MailersServices",
        "sendTextMail",
        "Send mail failed",
        "ERROR END",
      ]);
    }
  }
  public static async sendHTMLMail(message: {
    from: string;
    to: string;
    subject: string;
    html: string;
  }): Promise<void> {
    try {
      // if (APP_CONFIG.MODE !== "production") return;
      console.log(message);
      console.table(message);
      await MailerCore.instance?.sendMail(message);
    } catch (error) {
      ConsoleUtils.error([
        "MailersServices",
        "sendHTMLMail",
        "Send mail failed",
        "ERROR BEGIN",
      ]);
      console.table(error);
      console.log(error);
      ConsoleUtils.warn([
        "MailersServices",
        "sendHTMLMail",
        "Send mail failed",
        "ERROR END",
      ]);
    }
  }
}

export { MailerServices };
