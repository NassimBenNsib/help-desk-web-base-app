import { PrismaClient } from "../../lib/external.lib";
import { ConsoleUtils, DATABASE_CONFIG } from "../../lib/internal.lib";

class DatabaseCore {
  private static local_instance: PrismaClient | null = null;
  private static local_port: number = 0;
  private static local_is_set: boolean = false;
  private static local_protocol: string = "";
  private static local_host: string = "";
  private static local_user: string = "";
  private static local_password: string = "";
  private static local_database_name: string = "";
  private static local_is_connected: boolean = false;

  /* #########################################################################
  /* ################################ MAIN ###################################
  / #########################################################################*/
  public static init(
    instance: PrismaClient | null = null,
    protocol: string | undefined = DATABASE_CONFIG.PROTOCOL,
    host: string | undefined = DATABASE_CONFIG.HOST,
    port: number | undefined = Number(DATABASE_CONFIG.PORT),
    user: string | undefined = DATABASE_CONFIG.USER,
    password: string | undefined = DATABASE_CONFIG.PASSWORD,
    database_name: string | undefined = DATABASE_CONFIG.DATABASE
  ): void {
    if (this.isInitialized) {
      ConsoleUtils.error("Cannot initialize the database.");
      ConsoleUtils.warn("Database is already initialized.");
      ConsoleUtils.warn("Database can only be initialized once.");
      return;
    }
    ConsoleUtils.info("Initializing the database...");
    console.group();
    this.protocol = protocol;
    this.host = host;
    this.port = port;
    this.user = user;
    this.password = password;
    this.database_name = database_name;
    if (instance === null || instance === undefined) {
      this.instance = new PrismaClient({
        datasources: {
          db: {
            url: `${this.protocol}://${this.user}:${this.password}@${this.host}:${this.port}/${this.database_name}`,
          },
        },
      });
    } else {
      this.instance = instance;
    }
    console.groupEnd();
    ConsoleUtils.success("Database initialized successfully.");
  }

  public static async setup(toConnect: Boolean = true): Promise<void> {
    if (!this.isInitialized) {
      ConsoleUtils.error("Cannot set up the database.");
      ConsoleUtils.warn("Database is not initialized.");
      process.exit(1);
    }

    if (this.isSet) {
      ConsoleUtils.error("Cannot set up the database.");
      ConsoleUtils.warn("Database is already set up.");
      ConsoleUtils.warn("Database can only be set up once.");
      return;
    }
    ConsoleUtils.info("Setting up the database...");
    try {
      this.isSet = true;
      if (toConnect) {
        console.group();
        ConsoleUtils.info("Connecting to the database...");
        await this.instance?.$connect();
        await this.instance?.$disconnect();
        await this.instance?.$connect();
        this.isConnected = true;
        ConsoleUtils.success("Connected to the database.");
        console.groupEnd();
      }
      ConsoleUtils.success("Database set up successfully.");
    } catch (err) {
      ConsoleUtils.error("Cannot set up the database.");
      ConsoleUtils.warn("Database is not connected.");
      console.table(err);
      console.log(err);
      process.exit(1);
    }
  }

  public static async connect(): Promise<void> {
    if (!this.isInitialized) {
      ConsoleUtils.error("Cannot connect to the database.");
      ConsoleUtils.warn("Database is not initialized.");
      process.exit(1);
    }
    if (!this.isSet) {
      ConsoleUtils.error("Cannot connect to the database.");
      ConsoleUtils.warn("Database is not set up.");
      process.exit(1);
    }
    if (this.isConnected) {
      ConsoleUtils.error("Cannot connect to the database.");
      ConsoleUtils.warn("Database is already connected.");
      ConsoleUtils.warn("Database can only be connected once.");
      return;
    }
    ConsoleUtils.info("Connecting to the database...");
    try {
      await this.instance?.$connect();
      this.isConnected = true;
    } catch (err) {
      ConsoleUtils.error("Cannot connect to the database.");
      ConsoleUtils.warn("Database is not connected.");
      process.exit(1);
    }
    ConsoleUtils.success("Connected to the database.");
  }

  public static async disconnect(): Promise<void> {
    if (!this.isInitialized) {
      ConsoleUtils.error("Cannot disconnect from the database.");
      ConsoleUtils.warn("Database is not initialized.");
      process.exit(1);
    }
    if (!this.isSet) {
      ConsoleUtils.error("Cannot disconnect from the database.");
      ConsoleUtils.warn("Database is not set up.");
      process.exit(1);
    }
    if (!this.isConnected) {
      ConsoleUtils.error("Cannot disconnect from the database.");
      ConsoleUtils.warn("Database is not connected.");
    }
    ConsoleUtils.info("Disconnecting from the database...");
    try {
      await this.instance?.$disconnect();
      this.isConnected = false;
    } catch (err) {
      ConsoleUtils.error("Cannot disconnect from the database.");
      ConsoleUtils.warn("Database is not connected.");
      process.exit(1);
    }
    ConsoleUtils.success("Disconnected from the database.");
  }

  /* #########################################################################
  /* ################################# GETTERS ###############################
  / #########################################################################*/
  public static get instance(): PrismaClient | null {
    return this.local_instance;
  }

  public static get isConnected(): boolean {
    return this.local_is_connected;
  }

  public static get port(): number {
    return this.local_port;
  }

  public static get protocol(): string {
    return this.local_protocol;
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

  public static get database_name(): string {
    return this.local_database_name;
  }

  public static get isSet(): boolean {
    return this.local_is_set;
  }

  public static get isInitialized(): boolean {
    return (
      this.isPortInitialized &&
      !this.isNotPrismaInstanceInitialized &&
      this.isProtocolInitialized &&
      this.isHostInitialized &&
      this.isUserInitialized &&
      this.isPasswordInitialized &&
      this.isDatabaseNameInitialized
    );
  }

  private static get isPortInitialized(): boolean {
    return this.port !== 0;
  }

  private static get isHostInitialized(): boolean {
    return this.host !== "";
  }

  private static get isProtocolInitialized(): boolean {
    return this.protocol !== "";
  }

  private static get isUserInitialized(): boolean {
    return this.user !== "";
  }

  private static get isPasswordInitialized(): boolean {
    return this.password !== "";
  }

  private static get isDatabaseNameInitialized(): boolean {
    return this.database_name !== "";
  }

  private static get isNotPrismaInstanceInitialized(): boolean {
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

  private static set protocol(protocol: string | undefined) {
    if (this.isProtocolInitialized) {
      ConsoleUtils.error("Cannot initialize the protocol.");
      ConsoleUtils.warn("Protocol is already initialized.");
      ConsoleUtils.warn("Protocol can only be set once.");
      return;
    }
    if (
      protocol === undefined ||
      protocol === null ||
      protocol === "" ||
      ["mysql", "postgresql", "sqlite", "sqlserver", "postgres"].indexOf(
        protocol
      ) === -1
    ) {
      ConsoleUtils.error("Cannot initialize the protocol.");
      ConsoleUtils.warn("Invalid protocol configuration.");
      ConsoleUtils.warn("Protocol must be a valid protocol.");
      process.exit(1);
    }
    this.local_protocol = protocol;
    ConsoleUtils.success(`Protocol set to ${protocol}.`);
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
      ConsoleUtils.warn("user is already initialized.");
      ConsoleUtils.warn("user can only be set once.");
      return;
    }
    if (user === undefined || user === null || user === "") {
      ConsoleUtils.error("Cannot initialize the user.");
      ConsoleUtils.warn("Invalid user configuration.");
      ConsoleUtils.warn("user must be a valid user.");
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

  private static set database_name(database_name: string | undefined) {
    if (this.isDatabaseNameInitialized) {
      ConsoleUtils.error("Cannot initialize the database name.");
      ConsoleUtils.warn("Database name is already initialized.");
      ConsoleUtils.warn("Database name can only be set once.");
      return;
    }
    if (
      database_name === undefined ||
      database_name === null ||
      database_name === ""
    ) {
      ConsoleUtils.error("Cannot initialize the database name.");
      ConsoleUtils.warn("Invalid database name configuration.");
      ConsoleUtils.warn("Database name must be a valid database name.");
      process.exit(1);
    }
    this.local_database_name = database_name;
    ConsoleUtils.success(`Database name set to ${database_name}.`);
  }

  private static set instance(instance: PrismaClient | null) {
    if (!this.isNotPrismaInstanceInitialized) {
      ConsoleUtils.error("Cannot initialize the prisma instance.");
      ConsoleUtils.warn("Prisma instance is already initialized.");
      ConsoleUtils.warn("Prisma instance can only be set once.");
      return;
    }
    if (instance === null || instance === undefined) {
      ConsoleUtils.error("Cannot initialize the prisma instance.");
      ConsoleUtils.warn("Invalid prisma instance configuration.");
      ConsoleUtils.warn("Prisma instance must be a valid prisma instance.");
      process.exit(1);
    }
    this.local_instance = instance;
    ConsoleUtils.success("Prisma instance is set.");
  }

  private static set isSet(is_set: boolean) {
    this.local_is_set = is_set;
  }

  private static set isConnected(is_connected: boolean) {
    this.local_is_connected = is_connected;
  }
}

export { DatabaseCore };
