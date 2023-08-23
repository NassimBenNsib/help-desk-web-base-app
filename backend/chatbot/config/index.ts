import dotenv from "dotenv-safe";

dotenv.config();

const APP_CONFIG = {
  NAME: process.env.APP_NAME,
  VERSION: process.env.APP_VERSION,
  PROTOCOL: process.env.APP_PROTOCOL,
  HOST: process.env.APP_HOST,
  PORT: process.env.APP_PORT,
  MODE: process.env.APP_MODE,
  DEBUG: process.env.APP_DEBUG,
  BASE_URL: process.env.APP_BASE_URL,
};

const API_CONFIG = {
  PREFIX: process.env.API_PREFIX,
  VERSION: process.env.API_VERSION,
  COMPLETE_PREFIX: `${process.env.API_PREFIX}${process.env.API_VERSION}`,
  BASE_URL: process.env.API_BASE_URL,
  ENDPOINTS: {
    CHATBOT: "/chatbot",
  },
};

const CORS_CONFIG = {
  ORIGINS: process.env.CORS_ORIGINS,
  METHODS: process.env.CORS_METHODS,
  ALLOWED_HEADERS: process.env.CORS_ALLOWED_HEADERS,
  ALLOWED_METHODS: process.env.CORS_ALLOWED_METHODS,
};

const COMPANY_CONFIG = {
  LOGO: process.env.COMPANY_LOGO,
  NAME: process.env.COMPANY_NAME,
  ADDRESS: process.env.COMPANY_ADDRESS,
  PHONE: process.env.COMPANY_PHONE,
  EMAIL: process.env.COMPANY_EMAIL,
  WEBSITE: process.env.COMPANY_WEBSITE,
  SUPPORT_EMAIL:
    process.env.COMPANY_SUPPORT_EMAIL?.toString() ||
    process.env.COMPANY_EMAIL?.toString() ||
    "Shifti Help Desk",
  SUPPORT_PHONE: process.env.COMPANY_SUPPORT_PHONE,
  FACEBOOK: process.env.COMPANY_FACEBOOK,
  LINKEDIN: process.env.COMPANY_LINKEDIN,
};

const CHATBOT_CONFIG = {
  API_KEY: process.env.OPENAI_API_KEY,
};

export { CHATBOT_CONFIG, API_CONFIG, APP_CONFIG, CORS_CONFIG, COMPANY_CONFIG };
