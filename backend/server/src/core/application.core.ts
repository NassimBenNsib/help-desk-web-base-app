import {
  Application,
  express,
  morgan,
  hpp,
  helmet,
  rateLimiter,
  useragent,
  requestIP,
  cors,
} from "../../lib/external.lib";
import {
  ConsoleUtils,
  APP_CONFIG,
  AuthRoutes,
  API_CONFIG,
  CORS_CONFIG,
  Middleware,
  CorsUtils,
  UsersSettingsRoutes,
  TicketsRoutes,
} from "./../../lib/internal.lib";

class ApplicationCore {
  private static local_instance: Application | null = null;
  private static local_api_prefix: string = "";
  private static local_port: number = 0;
  private static local_is_set: boolean = false;
  private static local_is_started: boolean = false;
  private static local_can_start: boolean = false;

  /* #########################################################################
  /* ################################ MAIN ###################################
  / #########################################################################*/
  public static init(
    instance: Application = express(),
    port: any = APP_CONFIG.PORT,
    api_prefix: string = API_CONFIG.COMPLETE_PREFIX,
    canStart: boolean = true
  ): void {
    if (this.isInitialized) {
      ConsoleUtils.error("Cannot initialize the application.");
      ConsoleUtils.warn("Application is already initialized.");
      ConsoleUtils.warn("The application can only be initialized once.");
      return;
    }
    ConsoleUtils.info("Initializing the application...");
    console.group();
    this.port = port;
    this.apiPrefix = api_prefix;
    this.canStart = canStart;
    this.instance = instance;
    console.groupEnd();
    ConsoleUtils.success("Application initialized successfully.");
  }

  public static setup(): void {
    if (!this.isInitialized) {
      ConsoleUtils.error("Cannot set up the application.");
      ConsoleUtils.warn("Application must be initialized before setup.");
      process.exit(1);
    }

    if (this.isSet) {
      ConsoleUtils.error("Cannot set up the application.");
      ConsoleUtils.warn("Application is already set up.");
      ConsoleUtils.warn("The application can only be set up once.");
      return;
    }

    ConsoleUtils.info("Setting up the application...");
    console.group();
    this.setupMiddleware();

    switch (APP_CONFIG.MODE) {
      case "development":
        this.setupDevelopment();
        break;
      case "production":
        this.setupProduction();
        break;
      default:
        ConsoleUtils.error("Cannot set up the application.");
        ConsoleUtils.warn("Invalid application mode.");
        ConsoleUtils.warn(
          "Application mode must be either development or production."
        );
        process.exit(1);
    }
    this.setupErrorsHandler();
    this.setupRoutes();
    this.isSet = true;
    console.groupEnd();
    ConsoleUtils.success("Application set up successfully.");
  }

  public static start(): any {
    if (!this.isInitialized) {
      ConsoleUtils.error("Cannot start the application.");
      ConsoleUtils.warn("Application must be initialized before start.");
      process.exit(1);
    }
    if (!this.canStart) {
      ConsoleUtils.error("Cannot start the application.");
      ConsoleUtils.warn("The application is not configure to be startable.");
      process.exit(1);
    }
    if (!this.isSet) {
      ConsoleUtils.error("Cannot start the application.");
      ConsoleUtils.warn("Application must be set up before start.");
      process.exit(1);
    }
    if (this.isStarted) {
      ConsoleUtils.error("Cannot start the application.");
      ConsoleUtils.warn("Application is already started.");
      ConsoleUtils.warn("The application can only be started once.");
      return;
    }
    ConsoleUtils.info("Starting the application...");
    return this.instance?.listen(this.port, () => {
      ConsoleUtils.success(
        `Application started successfully on port ${this.port}.`
      );
      this.isStarted = true;
    });
  }

  /* #########################################################################
  /* ############################## DEVELOPMENT ###############################
  / #########################################################################*/
  private static setupDevelopment(): void {
    ConsoleUtils.info("Setting up the development tools...");
    console.group();
    this.setupLogger();
    //
    console.groupEnd();
    ConsoleUtils.success("Development tools set up successfully.");
  }

  /* #########################################################################
  /* ############################## PRODUCTION ################################
  / #########################################################################*/
  private static setupProduction(): void {
    ConsoleUtils.info("Setting up the production tools...");
    console.group();
    //
    console.groupEnd();
    ConsoleUtils.success("Production tools set up successfully.");
  }

  /* #########################################################################
  /* ############################## Logger ###################################
  / #########################################################################*/
  private static setupLogger(): void {
    ConsoleUtils.info("Setting up the logger...");
    this.instance?.use(morgan("dev"));
    ConsoleUtils.success("Logger set up successfully.");
  }

  /* ############################## MIDDLEWARES ##############################*/
  private static setupMiddleware(): void {
    ConsoleUtils.info("Setting up the middlewares...");
    console.group();
    this.setupBodyParser();
    this.setupUrlEncodedParser();
    this.setupCors();
    this.setupRequestIP();
    this.setupHelmet();
    this.setupHpp();
    this.setupRateLimiter();
    this.setupUserAgent();
    this.setupErrorHandler();
    console.groupEnd();
    ConsoleUtils.success("Middleware set up successfully.");
  }

  private static setupHpp(): void {
    ConsoleUtils.info("Setting up the hpp...");
    this.instance?.use(
      hpp({
        checkBody: true,
        checkQuery: true,
      })
    );
    ConsoleUtils.success("Hpp set up successfully.");
  }

  private static setupHelmet(): void {
    ConsoleUtils.info("Setting up the helmet...");
    this.instance?.use(helmet());
    this.instance?.use(helmet.noSniff());
    this.instance?.use(helmet.frameguard());
    this.instance?.use(helmet.xssFilter());
    this.instance?.use(helmet.hidePoweredBy());
    this.instance?.use(helmet.ieNoOpen());
    this.instance?.use(helmet.dnsPrefetchControl());
    this.instance?.use(helmet.referrerPolicy());
    this.instance?.use(helmet.hsts());
    this.instance?.use(helmet.permittedCrossDomainPolicies());
    ConsoleUtils.success("Helmet set up successfully.");
  }

  private static setupCors(): void {
    ConsoleUtils.info("Setting up the cors...");
    const origins = CorsUtils.serializeOrigins(CORS_CONFIG.ORIGINS);
    const methods = CorsUtils.serializeMethods(CORS_CONFIG.METHODS);
    const headers = CorsUtils.serializeHeaders(CORS_CONFIG.ALLOWED_HEADERS);
    if (!origins || !methods || !headers) {
      ConsoleUtils.error("Cannot set up the cors.");
      ConsoleUtils.warn("Invalid cors configuration.");
      ConsoleUtils.warn("Cors configuration must be valid.");
      process.exit(1);
    }
    // this.instance?.use(Middleware.cors(origins, headers, methods));
    this.instance?.use(cors());
    ConsoleUtils.success("Cors set up successfully.");
  }

  private static setupRateLimiter(): void {
    ConsoleUtils.info("Setting up the rate limiter...");
    this.instance?.use(
      rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 100,
      })
    );
    ConsoleUtils.success("Rate limiter set up successfully.");
  }

  private static setupErrorHandler(): void {
    ConsoleUtils.info("Setting up the error handler...");
    this.instance?.use(Middleware.errorHandler);
    ConsoleUtils.success("Error handler set up successfully.");
  }

  private static setupRequestIP(): void {
    ConsoleUtils.info("Setting up the request ip...");
    this.instance?.use(requestIP.mw());
    ConsoleUtils.success("Request ip set up successfully.");
  }

  private static setupBodyParser(): void {
    ConsoleUtils.info("Setting up the body parser...");
    this.instance?.use(
      express.json({
        limit: "10kb",
      })
    );
    ConsoleUtils.success("Body parser set up successfully.");
  }

  private static setupUrlEncodedParser(): void {
    ConsoleUtils.info("Setting up the url encoded parser...");
    this.instance?.use(express.urlencoded({ extended: true }));
    ConsoleUtils.success("Url encoded parser set up successfully.");
  }

  private static setupUserAgent(): void {
    ConsoleUtils.info("Setting up the user agent...");
    this.instance?.use(useragent.express());
    ConsoleUtils.success("User agent set up successfully.");
  }

  /* #########################################################################
  /* ################################ Routes #################################
  / #########################################################################*/
  private static setupRoutes(): void {
    ConsoleUtils.info("Setting up the routes...");
    this.instance?.use(
      API_CONFIG.COMPLETE_PREFIX + API_CONFIG.ENDPOINTS.AUTH,
      AuthRoutes
    );
    this.instance?.use(
      API_CONFIG.COMPLETE_PREFIX + API_CONFIG.ENDPOINTS.USER_SETTINGS,
      UsersSettingsRoutes
    );
    this.instance?.use(
      API_CONFIG.COMPLETE_PREFIX + API_CONFIG.ENDPOINTS.TICKETS,
      TicketsRoutes
    );
    ConsoleUtils.success("Routes set up successfully.");
  }

  /* #########################################################################
  /* ################################# ERRORS ################################
  / #########################################################################*/
  private static setupErrorsHandler(): void {
    ConsoleUtils.info("Setting up the errors handler...");
    this.instance?.on("error", (error: any) => {
      ConsoleUtils.error([
        "Shutting down the server...",
        "Please check the error",
        "BEGIN ERROR",
      ]);
      ConsoleUtils.table(error);
      ConsoleUtils.warn([
        "Shutting down the server...",
        "Please check the error",
        "END ERROR",
      ]);
      process.exit(1);
    });
    ConsoleUtils.success("Errors handler set up successfully.");
  }

  /* #########################################################################
  /* ################################# GETTERS ###############################
  / #########################################################################*/
  public static get instance(): Application | null {
    return this.local_instance;
  }

  public static get port(): number {
    this.instance?.set("port", this.local_port);
    return this.local_port;
  }

  public static get apiPrefix(): string {
    return this.local_api_prefix;
  }

  public static get isSet(): boolean {
    return this.local_is_set;
  }

  public static get isStarted(): boolean {
    return this.local_is_started;
  }

  public static get isInitialized(): boolean {
    return (
      this.isPortInitialized &&
      !this.isNotExpressApplicationInitialized &&
      this.isApiPrefixInitialized
    );
  }

  private static get isPortInitialized(): boolean {
    return this.port !== 0;
  }

  private static get isApiPrefixInitialized(): boolean {
    return Boolean(this.apiPrefix);
  }

  private static get isNotExpressApplicationInitialized(): boolean {
    return this.local_instance === null;
  }

  private static get canStart(): boolean {
    return this.local_can_start;
  }

  /* #########################################################################
  /* ################################# SETTERS ###############################
  / #########################################################################*/
  private static set instance(instance: Application | null) {
    if (!this.isNotExpressApplicationInitialized) {
      ConsoleUtils.error("Cannot initialize the express instance.");
      ConsoleUtils.warn("Express instance is already initialized.");
      ConsoleUtils.warn("Express instance must be set only once.");
      return;
    }
    if (instance === null || instance === undefined) {
      ConsoleUtils.error("Cannot initialize the express instance.");
      ConsoleUtils.warn("Invalid application instance configuration.");
      ConsoleUtils.warn("Express instance must be a valid express instance.");
      process.exit(1);
    }
    this.local_instance = instance;
    ConsoleUtils.success("Express instance is set.");
  }

  private static set canStart(can_start: boolean) {
    this.local_can_start = can_start;
    if (!can_start) {
      ConsoleUtils.warn("The application is not configure to be startable.");
    } else {
      ConsoleUtils.info("The application is configure to be startable.");
    }
  }

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

  private static set apiPrefix(api_prefix: string) {
    if (this.isApiPrefixInitialized) {
      ConsoleUtils.error("Cannot initialize the API prefix.");
      ConsoleUtils.warn("API prefix is already initialized.");
      ConsoleUtils.warn("API prefix can only be set once.");
      return;
    }

    const apiPrefixRegex = /^\/\w{3,}\/v\d+$/;
    if (!apiPrefixRegex.test(api_prefix)) {
      ConsoleUtils.error("Cannot initialize the API prefix.");
      ConsoleUtils.warn("Invalid API prefix configuration.");
      ConsoleUtils.warn("API prefix must follow the format '/anystring/v1'.");
      process.exit(1);
    }

    this.local_api_prefix = api_prefix;
    ConsoleUtils.success(`API prefix set to ${api_prefix}.`);
  }

  private static set isSet(is_set: boolean) {
    this.local_is_set = is_set;
  }

  private static set isStarted(is_started: boolean) {
    this.local_is_started = is_started;
  }
}

export { ApplicationCore };
