import { cloudinary } from "../../lib/external.lib";
import { ConsoleUtils, FILE_UPLOAD_CONFIG } from "../../lib/internal.lib";

class FileUploaderCore {
  private static local_instance: any | null = null;
  private static local_api_key: string = "";
  private static local_cloud_name: string = "";
  private static local_api_secret: string = "";
  private static local_is_set: boolean = false;
  private static local_is_connected: boolean = false;

  /* #########################################################################
    /* ################################ MAIN ###################################
    / #########################################################################*/
  public static init(
    instance: any | null = null,
    cloud_name: string | undefined = FILE_UPLOAD_CONFIG.CLOUD_NAME,
    api_key: string | undefined = FILE_UPLOAD_CONFIG.API_KEY,
    api_secret: string | undefined = FILE_UPLOAD_CONFIG.API_SECRET
  ): void {
    if (this.isInitialized) {
      ConsoleUtils.error("Cannot initialize the file uploader.");
      ConsoleUtils.warn("File uploader is already initialized.");
      ConsoleUtils.warn("File uploader can only be initialized once.");
      return;
    }
    ConsoleUtils.info("Initializing the file uploader...");
    console.group();
    if (instance === null || instance === undefined) {
      this.cloudName = cloud_name || FILE_UPLOAD_CONFIG.CLOUD_NAME;
      this.apiKey = api_key || FILE_UPLOAD_CONFIG.API_KEY;
      this.apiSecret = api_secret || FILE_UPLOAD_CONFIG.API_SECRET;
      this.instance = this.createInstance();
    } else {
      this.instance = instance;
    }
    console.groupEnd();
    ConsoleUtils.success("File uploader initialized successfully.");
  }

  public static async setup(): Promise<void> {
    if (!this.isInitialized) {
      ConsoleUtils.error("Cannot set up the file uploader.");
      ConsoleUtils.warn("File uploader is not initialized.");
      ConsoleUtils.warn("File uploader must be initialized first.");
      process.exit(1);
    }
    if (this.isSet) {
      ConsoleUtils.error("Cannot set up the file uploader.");
      ConsoleUtils.warn("File uploader is already set.");
      ConsoleUtils.warn("File uploader can only be set once.");
      return;
    }

    try {
      ConsoleUtils.info("Setting up the file uploader...");
      await cloudinary.search
        .expression("cat AND -tags:kitten")
        .max_results(1)
        .execute();
      this.isSet = true;
      if (!this.isSet) {
        ConsoleUtils.error("Cannot set up the file uploader.");
        ConsoleUtils.warn("File uploader connection not verified");
        process.exit(1);
      }
      ConsoleUtils.success("File uploader set up successfully.");
    } catch (err) {
      ConsoleUtils.error("Cannot set up the file uploader.");
      console.table(err);
      console.log(err);
      ConsoleUtils.warn("File uploader is not connected.");
      process.exit(1);
    }
  }

  /* #########################################################################
    /* ################################# GETTERS ###############################
    / #########################################################################*/
  public static get instance(): any | undefined {
    return this.local_instance;
  }

  public static get cloudName(): string {
    return this.local_cloud_name;
  }

  public static get apiKey(): string {
    return this.local_api_key;
  }

  public static get apiSecret(): string {
    return this.local_api_secret;
  }

  public static get isSet(): boolean {
    return this.local_is_set;
  }

  public static get isInitialized(): boolean {
    return (
      !this.isNotInstanceInitialized &&
      this.isCloudNameInitialized &&
      this.isApiKeyInitialized &&
      this.isApiSecretInitialized
    );
  }

  private static get isApiSecretInitialized(): boolean {
    return this.apiSecret !== "";
  }

  private static get isApiKeyInitialized(): boolean {
    return this.apiKey !== "";
  }

  private static get isCloudNameInitialized(): boolean {
    return this.cloudName !== "";
  }

  private static get isNotInstanceInitialized(): boolean {
    return this.local_instance === null;
  }

  /* #########################################################################
    /* ################################# SETTERS ###############################
    / #########################################################################*/

  private static set apiKey(apiKey: string | undefined) {
    if (this.isApiKeyInitialized) {
      ConsoleUtils.error("Cannot initialize the api key.");
      ConsoleUtils.warn("Api key is already initialized.");
      ConsoleUtils.warn("Api key can only be set once.");
      return;
    }
    if (apiKey === undefined || apiKey === null || apiKey === "") {
      ConsoleUtils.error("Cannot initialize the api key.");
      ConsoleUtils.warn("Invalid api key configuration.");
      ConsoleUtils.warn("Api key must be valid.");
      process.exit(1);
    }
    this.local_api_key = apiKey;
    ConsoleUtils.success(`Api Key set to ${apiKey}.`);
  }

  private static set cloudName(cloudName: string | undefined) {
    if (this.isCloudNameInitialized) {
      ConsoleUtils.error("Cannot initialize the cloud name.");
      ConsoleUtils.warn("Cloud name key is already initialized.");
      ConsoleUtils.warn("Cloud name can only be set once.");
      return;
    }
    if (cloudName === undefined || cloudName === null || cloudName === "") {
      ConsoleUtils.error("Cannot initialize the host.");
      ConsoleUtils.warn("Invalid cloud name configuration.");
      ConsoleUtils.warn("Cloud name must be valid.");
      process.exit(1);
    }
    this.local_cloud_name = cloudName;
    ConsoleUtils.success(`Cloud name Key set to ${cloudName}.`);
  }

  private static set apiSecret(apiSecret: string | undefined) {
    if (this.isApiSecretInitialized) {
      ConsoleUtils.error("Cannot initialize the api secret.");
      ConsoleUtils.warn("Api secret is already initialized.");
      ConsoleUtils.warn("Api secret can only be set once.");
      return;
    }
    if (apiSecret === undefined || apiSecret === null || apiSecret === "") {
      ConsoleUtils.error("Cannot initialize the api secret.");
      ConsoleUtils.warn("Invalid api secret configuration.");
      ConsoleUtils.warn("Api secret must be valid.");
      process.exit(1);
    }
    this.local_api_secret = apiSecret;
    ConsoleUtils.success(`Api secret set to ${apiSecret}.`);
  }

  private static set instance(instance: any | undefined) {
    if (!this.isNotInstanceInitialized) {
      ConsoleUtils.error("Cannot initialize the instance.");
      ConsoleUtils.warn("Instance is already initialized.");
      ConsoleUtils.warn("Instance can only be set once.");
      return;
    }
    if (instance === undefined || instance === null) {
      ConsoleUtils.error("Cannot initialize the instance.");
      ConsoleUtils.warn("Invalid instance configuration.");
      ConsoleUtils.warn("Instance must be valid.");
      process.exit(1);
    }
    this.local_instance = instance;
  }

  private static createInstance(): any {
    return cloudinary.config({
      cloud_name: this.cloudName,
      api_key: this.apiKey,
      api_secret: this.apiSecret,
    });
  }

  private static set isSet(is_set: boolean) {
    this.local_is_set = is_set;
  }
}

export { FileUploaderCore };
