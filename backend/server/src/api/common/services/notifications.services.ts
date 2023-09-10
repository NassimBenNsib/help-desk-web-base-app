import { ConsoleUtils, MailerCore } from "../../../../lib/internal.lib";

class NotificationsServices {
  public static async sendSMS(
    data: {
      company?: any;
      admin?: any;
      profile?: any;
      session?: any;
      ticket?: any;
      generalPreference?: any;
      emailPreference: any;
      notificationPreference: any;
      forgetPassword?: any;
    },
    sms: {},
    requestInfo: {
      ip: string;
      geo: {
        country: string;
        region: string;
        city: string;
        timezone: string;
        ll: [number, number];
      };
      useragent: {
        device: string;
        platform: string;
        os: string;
        browser: string;
        version: string;
      };
    }
  ): Promise<any> {
    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve("Send SMS");
        }, 1000);
      });
    } catch (error) {
      ConsoleUtils.error("NotificationsServices", "sendSMS", "BEGIN ERROR");
      console.table(error);
      console.log(error);
      ConsoleUtils.warn("NotificationsServices", "sendSMS", "END ERROR");
    }
  }
  public static async sendNotification(
    data: {
      company?: any;
      admin?: any;
      profile?: any;
      session?: any;
      ticket?: any;
      generalPreference?: any;
      emailPreference: any;
      notificationPreference: any;
      forgetPassword?: any;
    },
    notification: {},
    requestInfo: {
      ip: string;
      geo: {
        country: string;
        region: string;
        city: string;
        timezone: string;
        ll: [number, number];
      };
      useragent: {
        device: string;
        platform: string;
        os: string;
        browser: string;
        version: string;
      };
    }
  ): Promise<any> {
    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve("Send SMS");
        }, 1000);
      });
    } catch (error) {
      ConsoleUtils.error(
        "NotificationsServices",
        "sendNotification",
        "BEGIN ERROR"
      );
      console.table(error);
      console.log(error);
      ConsoleUtils.warn(
        "NotificationsServices",
        "sendNotification",
        "END ERROR"
      );
    }
  }
  public static async sendMail(
    data: {
      company?: any;
      admin?: any;
      user?: any;
      session?: any;
      ticket?: any;
      generalPreference?: any;
      emailPreference: any;
      notificationPreference: any;
      forgetPassword?: any;
    },
    mail: {
      subject: string;
      html: Function;
      to: string;
      from: string;
    },
    requestInfo: {
      ip: string;
      geo: {
        country: string;
        region: string;
        city: string;
        timezone: string;
        ll: [number, number];
      };
      useragent: {
        device: string;
        platform: string;
        os: string;
        browser: string;
        version: string;
      };
    }
  ): Promise<any> {
    try {
      console.table(requestInfo);
      if (mail.html instanceof Function)
        mail.html = mail.html(data, mail, requestInfo);
      console.table(mail);
      await MailerCore.instance?.sendMail(mail);
    } catch (error: any) {
      ConsoleUtils.error("NotificationsServices", "sendMail", "BEGIN ERROR");
      // console.table(error);
      console.log(error);
      ConsoleUtils.warn("NotificationsServices", "sendMail", "END ERROR");
    }
  }

  public static async pushNotification(
    data: {
      company?: any;
      admin?: any;
      profile?: any;
      session?: any;
      ticket?: any;
      generalPreference?: any;
      emailPreference: any;
      notificationPreference: any;
      forgetPassword?: any;
    },
    mail: {
      subject: string;
      html: Function;
      to: string;
      from: string;
    } | null,
    notification: {} | null,
    sms: {} | null,
    requestInfo: {
      ip: string;
      geo: {
        country: string;
        region: string;
        city: string;
        timezone: string;
        ll: [number, number];
      };
      useragent: {
        device: string;
        platform: string;
        os: string;
        browser: string;
        version: string;
      };
    },
    isSendable:
      | {
          mail?: boolean;
          sms?: boolean;
          notification?: boolean;
        }
      | boolean
      | null = true,
    type:
      | "newsletter"
      | "ticket"
      | "messages"
      | "virtualAssistant"
      | "accountActivity"
      | "usersActivity" = "newsletter"
  ): Promise<any> {
    try {
      if (isSendable === false) return;
      const toSendMail =
        mail &&
        (isSendable === true ||
          (isSendable?.mail === true && data.emailPreference?.[type]));
      const toSendSMS =
        sms &&
        (isSendable === true ||
          (isSendable?.sms === true && data.notificationPreference?.[type]));
      const toSendNotification =
        notification &&
        (isSendable === true ||
          (isSendable?.notification === true &&
            data.notificationPreference?.[type]));
      if (toSendSMS && sms) this.sendSMS(data, sms, requestInfo);
      if (toSendMail && mail) this.sendMail(data, mail, requestInfo);
      if (toSendNotification && notification)
        this.sendNotification(data, notification, requestInfo);
    } catch (error) {
      ConsoleUtils.error([
        "NotificationsServices",
        "pushNotification",
        "BEGIN ERROR",
      ]);
      console.table(error);
      console.log(error);
      ConsoleUtils.warn([
        "NotificationsServices",
        "pushNotification",
        "END ERROR",
      ]);
    }
  }
}

export { NotificationsServices };
