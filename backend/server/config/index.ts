import { dotenv } from "../lib/external.lib";
dotenv.config();

const APP_CONFIG = {
  NAME: process.env.SERVER_APP_NAME,
  VERSION: process.env.SERVER_APP_VERSION,
  PROTOCOL: process.env.SERVER_APP_PROTOCOL,
  HOST: process.env.SERVER_APP_HOST,
  PORT: process.env.SERVER_APP_PORT,
  MODE: process.env.SERVER_APP_MODE,
  DEBUG: process.env.SERVER_APP_DEBUG,
  BASE_URL: process.env.SERVER_APP_BASE_URL,
};

const API_CONFIG = {
  PREFIX: process.env.SERVER_API_PREFIX,
  VERSION: process.env.SERVER_API_VERSION,
  COMPLETE_PREFIX: `${process.env.SERVER_API_PREFIX}${process.env.SERVER_API_VERSION}`,
  BASE_URL: process.env.SERVER_API_BASE_URL,
  ENDPOINTS: {
    AUTH: "/auth",
    USER_SETTINGS: "/user-settings",
    TICKETS: "/tickets",
  },
};

const DATABASE_CONFIG = {
  PROTOCOL: process.env.SERVER_DATABASE_PROTOCOL,
  HOST: process.env.SERVER_DATABASE_HOST,
  PORT: process.env.SERVER_DATABASE_PORT,
  USER: process.env.SERVER_DATABASE_USER,
  PASSWORD: process.env.SERVER_DATABASE_PASSWORD,
  DATABASE: process.env.SERVER_DATABASE_DATABASE,
  BASE_URL: process.env.SERVER_DATABASE_BASE_URL,
};

const DOCS_CONFIG = {
  PREFIX: process.env.SERVER_DOCS_PREFIX,
  VERSION: process.env.SERVER_DOCS_VERSION,
  BASE_URL: process.env.SERVER_DOCS_BASE_URL,
};

const CORS_CONFIG = {
  ORIGINS: process.env.SERVER_CORS_ORIGINS,
  METHODS: process.env.SERVER_CORS_METHODS,
  ALLOWED_HEADERS: process.env.SERVER_CORS_ALLOWED_HEADERS,
};

const MAIL_CONFIG = {
  PROTOCOL: process.env.SERVER_EMAIL_PROTOCOL,
  HOST: process.env.SERVER_EMAIL_HOST,
  PORT: process.env.SERVER_EMAIL_PORT,
  SECURE: process.env.SERVER_EMAIL_SECURE?.toLocaleLowerCase(),
  USER: process.env.SERVER_EMAIL_USER,
  PASSWORD: process.env.SERVER_EMAIL_PASSWORD,
};

const COMPANY_CONFIG = {
  LOGO: process.env.SERVER_COMPANY_LOGO,
  NAME: process.env.SERVER_COMPANY_NAME,
  ADDRESS: process.env.SERVER_COMPANY_ADDRESS,
  PHONE: process.env.SERVER_COMPANY_PHONE,
  EMAIL: process.env.SERVER_COMPANY_EMAIL,
  WEBSITE: process.env.SERVER_COMPANY_WEBSITE,
  SUPPORT_EMAIL:
    process.env.SERVER_COMPANY_SUPPORT_EMAIL?.toString() ||
    process.env.SERVER_COMPANY_EMAIL?.toString() ||
    "Shifti Help Desk",
  SUPPORT_PHONE: process.env.SERVER_COMPANY_SUPPORT_PHONE,
  FACEBOOK: process.env.SERVER_COMPANY_FACEBOOK,
  LINKEDIN: process.env.SERVER_COMPANY_LINKEDIN,
};

const JWT_CONFIG = {
  SECRET: process.env.SERVER_JWT_SECRET_KEY,
  EXPIRES_IN: parseInt(process.env.SERVER_JWT_EXPIRES_IN as string),
  ALGORITHM: parseInt(process.env.SERVER_JWT_ALGORITHM as string),
  NUMBER_OF_CYCLES: process.env.SERVER_JWT_NUMBER_OF_CYCLES,
};

const SESSIONS_CONFIG = {
  SECRET: process.env.SERVER_SESSION_SECRET_KEY,
  EXPIRES_IN: parseInt(process.env.SERVER_SESSION_EXPIRES_IN as string),
  ALGORITHM: parseInt(process.env.SERVER_SESSION_ALGORITHM as string),
};

const FORGOT_PASSWORD_CONFIG = {
  EXPIRES_IN: parseInt(process.env.SERVER_FORGOT_PASSWORD_EXPIRES_IN as string),
};

const FILE_UPLOAD_CONFIG = {
  CLOUD_NAME: process.env.SERVER_FILE_UPLOAD_FILES_CLOUD_NAME,
  API_KEY: process.env.SERVER_FILE_UPLOAD_API_KEY,
  API_SECRET: process.env.SERVER_FILE_UPLOAD_API_SECRET,
  DOCUMENTS: {
    FOLDER: process.env.SERVER_FILE_UPLOAD_DOCUMENTS_FOLDER,
    MAX_SIZE: eval(process.env.SERVER_FILE_UPLOAD_DOCUMENTS_MAX_SIZE as string),
    ALLOWED_EXTENSIONS: JSON.parse(
      (
        process.env.SERVER_FILE_UPLOAD_DOCUMENTS_ALLOWED_EXTENSIONS as string
      ).replace(/'/g, '"')
    ),
  },
  IMAGES: {
    FOLDER: process.env.SERVER_FILE_UPLOAD_IMAGES_FOLDER,
    MAX_SIZE: eval(process.env.SERVER_FILE_UPLOAD_IMAGES_MAX_SIZE as string),
    ALLOWED_EXTENSIONS: JSON.parse(
      (
        process.env.SERVER_FILE_UPLOAD_IMAGES_ALLOWED_EXTENSIONS as string
      ).replace(/'/g, '"')
    ),
  },
  AUDIOS: {
    FOLDER: process.env.SERVER_FILE_UPLOAD_AUDIOS_FOLDER,
    MAX_SIZE: eval(process.env.SERVER_FILE_UPLOAD_AUDIOS_MAX_SIZE as string),
    ALLOWED_EXTENSIONS: JSON.parse(
      (
        process.env.SERVER_FILE_UPLOAD_AUDIOS_ALLOWED_EXTENSIONS as string
      ).replace(/'/g, '"')
    ),
  },
  VIDEOS: {
    FOLDER: process.env.SERVER_FILE_UPLOAD_VIDEOS_FOLDER,
    MAX_SIZE: eval(process.env.SERVER_FILE_UPLOAD_VIDEOS_MAX_SIZE as string),
    ALLOWED_EXTENSIONS: JSON.parse(
      (
        process.env.SERVER_FILE_UPLOAD_VIDEOS_ALLOWED_EXTENSIONS as string
      ).replace(/'/g, '"')
    ),
  },
};

export {
  MAIL_CONFIG,
  API_CONFIG,
  APP_CONFIG,
  DATABASE_CONFIG,
  DOCS_CONFIG,
  CORS_CONFIG,
  COMPANY_CONFIG,
  JWT_CONFIG,
  SESSIONS_CONFIG,
  FORGOT_PASSWORD_CONFIG,
  FILE_UPLOAD_CONFIG,
};
