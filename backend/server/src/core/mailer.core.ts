import {
  nodemailer,
  NodeMailerTransporter,
  NodeMailerTransportOptions,
} from "../../lib/external.lib";
import { ConsoleUtils, MAIL_CONFIG } from "../../lib/internal.lib";

class MailerCore {
  private static local_instance: NodeMailerTransporter | null = null;
  private static local_host: string = "";
  private static local_port: number = 0;
  private static local_is_secure: boolean | undefined = undefined;
  private static local_user: string = "";
  private static local_password: string = "";
  private static local_is_set: boolean = false;
  private static local_is_connected: boolean = false;

  /* #########################################################################
  /* ################################ MAIN ###################################
  / #########################################################################*/
  public static init(
    instance: NodeMailerTransporter | null = null,
    host: string | undefined = MAIL_CONFIG.HOST,
    port: number | undefined = Number(MAIL_CONFIG.PORT),
    secure: boolean | string | undefined = MAIL_CONFIG.SECURE,
    user: string | undefined = MAIL_CONFIG.USER,
    password: string | undefined = MAIL_CONFIG.PASSWORD
  ): void {
    if (this.isInitialized) {
      ConsoleUtils.error("Cannot initialize the mailer.");
      ConsoleUtils.warn("Mailer is already initialized.");
      ConsoleUtils.warn("Mailer can only be initialized once.");
      return;
    }
    ConsoleUtils.info("Initializing the mailer...");
    console.group();
    if (instance === null || instance === undefined) {
      this.host = host;
      this.port = port;
      this.user = user;
      this.password = password;
      this.isSecure = secure;
      this.instance = this.createInstance();
    } else {
      this.instance = instance;
    }
    console.groupEnd();
    ConsoleUtils.success("Mailer initialized successfully.");
  }

  public static async setup(): Promise<void> {
    if (!this.isInitialized) {
      ConsoleUtils.error("Cannot set up the mailer.");
      ConsoleUtils.warn("Mailer is not initialized.");
      ConsoleUtils.warn("Mailer must be initialized before set up.");
      process.exit(1);
    }
    if (this.isSet) {
      ConsoleUtils.error("Cannot set up the mailer.");
      ConsoleUtils.warn("Mailer is already set up.");
      ConsoleUtils.warn("Mailer can only be set up once.");
      return;
    }

    try {
      ConsoleUtils.info("Setting up the mailer...");
      this.isSet = await this.instance?.verify();
      if (!this.isSet) {
        ConsoleUtils.error("Cannot set up the mailer.");
        ConsoleUtils.warn("Mailer connection not verified");
      }
      ConsoleUtils.success("Mailer set up successfully.");
    } catch (err) {
      ConsoleUtils.error("Cannot set up the mailer.");
      ConsoleUtils.warn(err);
      ConsoleUtils.warn("Mailer is not connected.");
      process.exit(1);
    }
  }

  /* #########################################################################
  /* ################################# GETTERS ###############################
  / #########################################################################*/
  public static get instance(): any | undefined {
    return this.local_instance;
  }

  public static get isConnected(): boolean {
    return this.local_is_connected;
  }

  public static get port(): number {
    return this.local_port;
  }

  public static get host(): string {
    return this.local_host;
  }

  public static get user(): string {
    return this.local_user;
  }

  public static get password(): string {
    return this.local_password;
  }

  public static get isSecure(): boolean | undefined {
    return this.local_is_secure;
  }
  public static get isSet(): boolean {
    return this.local_is_set;
  }

  public static get isInitialized(): boolean {
    return (
      this.isPortInitialized &&
      !this.isNotInstanceInitialized &&
      this.isHostInitialized &&
      this.isUserInitialized &&
      this.isPasswordInitialized &&
      this.isSecureInitialized
    );
  }

  private static get isPortInitialized(): boolean {
    return this.port !== 0;
  }

  private static get isHostInitialized(): boolean {
    return this.host !== "";
  }

  private static get isUserInitialized(): boolean {
    return this.user !== "";
  }

  private static get isPasswordInitialized(): boolean {
    return this.password !== "";
  }

  private static get isSecureInitialized(): boolean {
    return this.isSecure == true || this.isSecure == false;
  }

  private static get isNotInstanceInitialized(): boolean {
    return this.local_instance === null;
  }

  /* #########################################################################
  /* ################################# SETTERS ###############################
  / #########################################################################*/
  private static set port(port_params: any) {
    if (this.isPortInitialized) {
      ConsoleUtils.error("Cannot initialize the port.");
      ConsoleUtils.warn("Port is already initialized.");
      ConsoleUtils.warn("Port can only be set once.");
      return;
    }
    const port = Number(port_params);
    if (isNaN(port) || !Number.isInteger(port) || port < 0 || port > 65535) {
      ConsoleUtils.error("Cannot initialize the port.");
      ConsoleUtils.warn("Invalid port configuration.");
      ConsoleUtils.warn("Port must be an integer between 0 and 65535.");
      process.exit(1);
    }
    this.local_port = port;
    ConsoleUtils.success(`Port set to ${port}.`);
  }

  private static set host(host: string | undefined) {
    if (this.isHostInitialized) {
      ConsoleUtils.error("Cannot initialize the host.");
      ConsoleUtils.warn("Host is already initialized.");
      ConsoleUtils.warn("Host can only be set once.");
      return;
    }
    if (host === undefined || host === null || host === "") {
      ConsoleUtils.error("Cannot initialize the host.");
      ConsoleUtils.warn("Invalid host configuration.");
      ConsoleUtils.warn("Host must be a valid host.");
      process.exit(1);
    }
    this.local_host = host;
    ConsoleUtils.success(`Host set to ${host}.`);
  }

  private static set user(user: string | undefined) {
    if (this.isUserInitialized) {
      ConsoleUtils.error("Cannot initialize the user.");
      ConsoleUtils.warn("User is already initialized.");
      ConsoleUtils.warn("User can only be set once.");
      return;
    }
    if (user === undefined || user === null || user === "") {
      ConsoleUtils.error("Cannot initialize the user.");
      ConsoleUtils.warn("Invalid user configuration.");
      ConsoleUtils.warn("User must be a valid user.");
      process.exit(1);
    }
    this.local_user = user;
    ConsoleUtils.success(`user set to ${user}.`);
  }

  private static set password(password: string | undefined) {
    if (this.isPasswordInitialized) {
      ConsoleUtils.error("Cannot initialize the password.");
      ConsoleUtils.warn("Password is already initialized.");
      ConsoleUtils.warn("Password can only be set once.");
      return;
    }
    if (password === undefined || password === null || password === "") {
      ConsoleUtils.error("Cannot initialize the password.");
      ConsoleUtils.warn("Invalid password configuration.");
      ConsoleUtils.warn("Password must be a valid password.");
      process.exit(1);
    }
    this.local_password = password;
    ConsoleUtils.success(`Password set to ${password}.`);
  }

  private static set isSecure(is_secure_params: boolean | undefined | string) {
    if (this.isSecureInitialized) {
      ConsoleUtils.error("Cannot initialize the secure.");
      ConsoleUtils.warn("Secure is already initialized.");
      ConsoleUtils.warn("Secure can only be set once.");
      return;
    }
    const value =
      is_secure_params?.toString() === "true"
        ? true
        : is_secure_params?.toString() === "false"
        ? false
        : undefined;
    if (value === undefined || value === null) {
      ConsoleUtils.error("Cannot initialize the secure.");
      ConsoleUtils.warn("Invalid secure configuration.");
      ConsoleUtils.warn("Secure must be a boolean.");
      process.exit(1);
    }
    this.local_is_secure = value;
    ConsoleUtils.success(`Secure set to ${value}.`);
  }

  private static set instance(instance: NodeMailerTransporter | undefined) {
    if (!this.isNotInstanceInitialized) {
      ConsoleUtils.error("Cannot initialize the mailer instance.");
      ConsoleUtils.warn("Mailer instance is already initialized.");
      ConsoleUtils.warn("Mailer instance can only be set once.");
      return;
    }
    if (instance === null || instance === undefined) {
      ConsoleUtils.error("Cannot initialize the mailer instance.");
      ConsoleUtils.warn("Invalid mailer instance configuration.");
      ConsoleUtils.warn("Mailer instance must be a valid mailer instance.");
      process.exit(1);
    }
    this.local_instance = instance;
    ConsoleUtils.success("Mailer instance is set.");
  }

  private static createInstance(): NodeMailerTransporter {
    const options = {
      host: this.host,
      port: this.port,
      secure: this.isSecure,
      auth: {
        user: this.user, // your email address
        pass: this.password,
      },
    };
    return nodemailer.createTransport(options);
  }

  private static set isSet(is_set: boolean) {
    this.local_is_set = is_set;
  }

  private static set isConnected(is_connected: boolean) {
    this.local_is_connected = is_connected;
  }
}

export { MailerCore };
