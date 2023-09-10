const USERS_APIS_SETTINGS_CONFIG = {
  changeGeneralInformation: "/change-general-information",
  revokeSessions: "/revoke-sessions",
  changeEmailPreference: "/change-email-preference",
  changeNotificationPreference: "/change-notification-preference",
  changePassword: "/change-password",
  changeGeneralPreference: "/change-general-preference",
  changeProfilePicture: "/change-profile-picture",
  getProfile: "/get-profile",
};

const USERS_APIS_CONFIG = {
  changeGeneralInformation: "/change-general-information/:id",
  revokeSessions: "/revoke-sessions/:id",
  changeEmailPreference: "/change-email-preferences/:id",
  changeNotificationPreference: "/change-notification-preference/:id",
  changePassword: "/change-password/:id",
  changeGeneralPreference: "/change-general-preference/:id",
  changeProfilePicture: "/change-profile-picture/:id",
  // profilePicture: "/profile-picture/:id",
  // changePassword: "/change-password/:id",
  // generalPreferences: "/general-preferences/:id",
  // generalInformation: "/general-information/:id",
  // notificationPreferences: "/notification-preferences/:id",
  // emailPreferences: "/email-preferences/:id",
  // profile: "/profile/:id",
};

export { USERS_APIS_SETTINGS_CONFIG, USERS_APIS_CONFIG };
