const API_CONFIG = {
  protocol: process?.env?.NEXT_PUBLIC_BACKEND_API_PROTOCOL || "http",
  baseUrl: process?.env?.NEXT_PUBLIC_BACKEND_API_BASE_URL || "localhost",
  port: process?.env?.NEXT_PUBLIC_BACKEND_API_PORT || "5000",
  prefix: process?.env?.NEXT_PUBLIC_BACKEND_API_PREFIX || "/api",
  version: process?.env?.NEXT_PUBLIC_BACKEND_API_VERSION || "/v1",
  endpoints: {
    auth: {
      login: "/auth/login",
      register: "/auth/register",
      logout: "/auth/logout",
      forgetPassword: "/auth/forgot-password",
      resetPassword: "/auth/reset-password",
    },
    settings: {
      changeGeneralInformation: "/user-settings/change-general-information",
      getProfile: "/user-settings/get-profile",
      changeEmailPreference: "/user-settings/change-email-preference",
      changeNotificationPreference:
        "/user-settings/change-notification-preference",
      changePassword: "/user-settings/change-password",
      revokeSessions: "/user-settings/revoke-sessions",
    },
    ticket: {
      create: "/ticket/create",
      update: "/ticket/update",
      delete: "/ticket/delete",
      get: "/ticket/get",
      getAll: "/ticket/get-all",
      getAllByUser: "/ticket/get-all-by-user",
      getByUserFiltered: "/ticket/get-by-user-filtered",
      getFiltered: "/ticket/get-filtered",
      getMany: "/ticket/get-many",
    },
  },
};

const API_URL = `${API_CONFIG.protocol}://${API_CONFIG.baseUrl}:${API_CONFIG.port}${API_CONFIG.prefix}${API_CONFIG.version}`;

export { API_CONFIG, API_URL };
